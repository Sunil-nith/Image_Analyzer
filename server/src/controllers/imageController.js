const fs = require('fs');
const sizeOf = require('image-size');
const vision = require('@google-cloud/vision');

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

// Function to process the uploaded image and return analysis results
exports.processImage = async (req, res) => {
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
            let labels;
            if (result_3 && result_3.landmarkAnnotations.length > 0) {
                labels = result_3.landmarkAnnotations[0].description;
            } else {
                labels = 'No landmark was detected in the image.';
            }

            // Extract detected objects (if available) or set a default message
            const detectObjects = [];
            const [result_1] = await client.objectLocalization(image);
            if (result_1 && result_1.localizedObjectAnnotations.length > 0) {
                const objects = result_1.localizedObjectAnnotations;
                objects.forEach(object => {
                    detectObjects.push(object.name);
                });
            } else {
                detectObjects.push("No object was detected in the image.");
            }

            // Extract dominant color (if available) or set a default message
            let dominance_Color;
            const [result_2] = await client.imageProperties(image);
            if (result_2) {
                const colors = result_2.imagePropertiesAnnotation.dominantColors.colors;
                const rgb = colors[0].color;
                const r = rgb.red;
                const b = rgb.blue;
                const g = rgb.green;
                const hexColor = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
                dominance_Color = `${hexColor.toUpperCase()}, RGB(${r},${g},${b})`;
            } else {
                dominance_Color = 'No color was detected in the image..';
            }

            // Get the dimensions (height and width) of the image
            const dimension = sizeOf(image);
            const { height, width } = dimension;
            const Image_Dimension = {
                height: height,
                width: width
            };

            // Send the processed information as a JSON response
            return res.status(200).json({
                message: 'File uploaded and processed successfully!',
                Landmark: labels,
                Object_found: detectObjects,
                Dominance_Color: dominance_Color,
                Image_Dimension: Image_Dimension,
            });
        }
    } catch (error) {
        // If an error occurs during image processing, return an error response
        console.error('Error processing the uploaded image:', error.message);
        return res.status(500).json({ message: 'Error processing the uploaded image.' });
    }
};
