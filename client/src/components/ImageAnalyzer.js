import React, { useState } from 'react';
import axios from 'axios';

const ImageAnalyzer= () => {
  // State variables to store data
  const [apiResponse, setApiResponse] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle image selection from file input
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type.startsWith('image/jpeg') || file.type.startsWith('image/png'))) {
      const maxSize = 5 * 1024 * 1024;
      if (file.size <= maxSize) {
        setSelectedImage(file);
        // Generate a temporary URL to display the selected image
        const temporaryURL = URL.createObjectURL(file);
        setImageURL(temporaryURL);
        setApiResponse(null);
      } else {
        alert('Please select an image that is smaller than 5 MB, For better Experience.');
      }
    } else {
      alert('Please select a valid JPG , PNG or JPEG image.');
    }
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedImage);
    setIsLoading(true);

    // Send a POST request to the server with the selected image data
    axios.post('http://localhost:3001/upload', formData)
      .then((response) => {
        // Update the state with the response data from the server
        setApiResponse(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error sending data:', error);
        setIsLoading(false);
        setApiResponse({ message: "The server is unavailable to handle this request right now." });
      });
  };
  return (
    <div>
      <h1>Image Analyzer</h1>
      <div class="card-wrapper">
        <div class="card">
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleImageChange} />
            {isLoading && (
              <div id="loading-spinner"></div>
            )}
          </form>
          {imageURL && <img src={imageURL} alt="Selected" />}
          <form onSubmit={handleSubmit}>
            {selectedImage && !isLoading && (
              <button type="submit">View Image Info</button>
            )}
          </form>
          {apiResponse && (
            <div>
              <h3>{apiResponse.message}</h3>
              <p>Landmark : {apiResponse.Landmark}</p>
              <p>Object Found : {apiResponse.Object_found && apiResponse.Object_found.length > 0 ? apiResponse.Object_found.join(', ') : 'None'}</p>
              <p>Dominance Color : {apiResponse.Dominance_Color}</p>
              {apiResponse.Image_Dimension && (
                <p>
                  Image Dimension : Width={apiResponse.Image_Dimension.width}px , Height={apiResponse.Image_Dimension.height}px
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageAnalyzer;
