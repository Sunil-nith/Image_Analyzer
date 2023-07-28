const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
app.use(express.json());
app.use(cors());
const imageRoutes = require('./src/routes/imageRoutes');

app.use(imageRoutes);

const port = process.env.PORT || 5000;
// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
