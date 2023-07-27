// Import required libraries and set up the application
const express = require('express');
const app = express();
const sizeOf = require('image-size');
const multer = require('multer');
const fs = require('fs');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const vision = require('@google-cloud/vision');
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;

// Read the contents of 'key.json' file containing Google Cloud credentials
const Data = fs.readFileSync('key.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    return data;
});

// Parse the credentials from the 'key.json' file
const CREDENTIALS = JSON.parse(Data);
const CONFIG = {
    credentials: {
        private_key: CREDENTIALS.private_key,
        client_email: CREDENTIALS.client_email,
    }
};

// Create a new instance of Google Cloud Vision ImageAnnotatorClient with the provided credentials
const client = new vision.ImageAnnotatorClient(CONFIG);

// Set up multer middleware to handle file uploads and set size limit to 5 MB
const upload = multer({
    dest: 'uploads/',
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

// Define the '/upload' route to handle file uploads and image processing
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            // If no file was uploaded, return an error response
            return res.status(400).json({ message: 'No file part in the request.' });
        }

        else {
            // Get the path of the uploaded image
            const image = req.file.path;
            
            // Extract landmark description (if available) or set a default message
            const [result_3] = await client.landmarkDetection(image);
            if (result_3 && result_3.landmarkAnnotations.length > 0) {
                labels = await result_3.landmarkAnnotations[0].description;
            } else {
                labels = 'No landmark was detected in the image.';
            }
            
            // Extract detected objects (if available) or set a default message
            const detectObjects = [];
            const [result_1] = await client.objectLocalization(image);
            if (result_1 && result_1.localizedObjectAnnotations.length > 0) {
                const objects = await result_1.localizedObjectAnnotations;
                objects.forEach(object => {
                    const detectObject = object.name;
                    detectObjects.push(detectObject);
                });
            } else {
                detectObjects.push("No object was detected in the image.");
            }
            
            // Extract dominant color (if available) or set a default message
            const [result_2] = await client.imageProperties(image);
            if (result_2) {
                const colors = await result_2.imagePropertiesAnnotation.dominantColors.colors;
                const rgb = colors[0].color;
                const r = rgb.red;
                const b = rgb.blue;
                const g = rgb.green;
                const hexColor = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
                dominance_Color = `${hexColor.toUpperCase()}, RGB(${r},${g},${b})`
            } else {
                dominance_Color = 'No color was detected in the image..';
            }

            // Get the dimensions (height and width) of the image
            const dimension = await sizeOf(image);
            const { height, width } = dimension;
            const Dimension = {
                "height": height,
                "width": width
            };
            
            // Send the processed information as a JSON response
            return res.status(200).json({
                message: 'File uploaded and processed successfully!',
                Landmark: labels,
                Object_found: detectObjects,
                Dominance_Color: dominance_Color,
                Image_Dimension: Dimension,
            })
        };
    } catch (error) {
        // If an error occurs during image processing, return an error response
        console.error('Error processing the uploaded image:', error.message);
        return res.status(500).json({ message: 'Error processing the uploaded image.' });
    }
})

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



