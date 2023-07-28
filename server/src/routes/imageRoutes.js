const express = require('express');
const multer = require('multer');
const router = express.Router();
const imageController = require('../controllers/imageController');

// Set up multer middleware to handle file uploads and set size limit to 5 MB
const upload = multer({
    dest: 'uploads/',
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

// Define the '/upload' route to handle file uploads and image processing
router.post('/upload', upload.single('file'), imageController.processImage);

module.exports = router;
