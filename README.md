# Image Analyzer Web Application

The Image Analyzer web application allows users to upload images and retrieve analysis results, including object recognition, Landmark detection, dominant colors, and image dimensions using the Google Cloud Vision API.

## Demo Video

Check out the demo video of the Image Analyzer web application:

https://drive.google.com/file/d/1bgSU2Z6QbI9ZzlvHL8vBULfiCu7I71fk/view?usp=drive_link

### Technologies Used

The following technologies were used to develop this web application:

- Frontend:
  - React (JavaScript library for building user interfaces)
  - Axios (Promise-based HTTP client for making API requests)
  - HTML and CSS (for the user interface)

- Backend:
  - Node.js (JavaScript runtime environment for server-side development)
  - Express (Node.js framework for building web applications)
  - Multer (Node.js middleware for handling file uploads)
  - Google Cloud Vision API (for image analysis)


## Features
- User Interface:
  - Allows users to upload an image from their local system.
  - Displays a loading spinner while the image is being processed.
  - Shows the selected image and analysis results, including image dimensions, dominant colors, detected objects, and landmark description (if available).
  - Responsive design, ensuring the application works well on various devices and screen sizes, including desktops, tablets, and mobile phones.

- Backend:
  - Receives the uploaded image from the frontend and processes it using the Google Cloud Vision API.
  - Extracts information like dominant colors, detected objects, and landmark description (if available) from the image.
  - Returns the analysis results to the frontend.

## Prerequisites

Before running the Image Analyzer web application, make sure you have the following prerequisites installed and set up on your system:

1. **Node.js and npm**

2. **Google Cloud Platform (GCP) Account**

3. **Google Cloud Vision API and Credentials**






### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Sunil-nith/Image_Analyzer.git
   ```
2. Navigate to the project directory:
   ```sh
   cd Image_Analyzer
   ```
3. Install frontend and backend dependencies:

  * Navigate to the client directory (frontend)
      ```sh
      cd client
      ```
  * Then
      ```sh
      npm install
      ```
  * Navigate to the server directory (Backend)
      ```sh
      cd server
      ```
  * Then
      ```sh
      npm install
      ```
   
## Configuration
Before running the application, you need to configure the Google Cloud Vision API credentials:

1. Go to the Google Cloud Console.
2. Create a new project (if you don't have one already) and enable the Vision API and billing for the project.
3. Create a service account key and download the credentials in JSON format as key.json.
4. Replace the key.json file in the server directory of the project with your key.json file.

## Usage

* To start the application, follow these steps:
1. Open two terminal.
2. In first terminal, Start the backend server:
* Navigate to the server directory (Backend)
    ```sh
    cd server
    ```
* Then
    ```sh
    npm install
    ```

3. In second terminal, Start the frontend development server:
* Navigate to the client directory (frontend)
    ```sh
    cd client
    ```
* Then
    ```sh
    npm install
    ```
4. The application will be accessible at http://localhost:3000 in your web browser.
## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvement, please create an issue or submit a pull request

## Contact
If you have any questions or need further assistance, please feel free to contact me at skjnv2009@gmail.com.


