# Image Processing API

This project is an **Image Processing API** built with **TypeScript** and **Express**. The application provides image processing functionalities such as **uploading**, **resizing**, **blurring**, and **filtering** images. The primary purpose of the project is to learn backend development practices, TypeScript, and efficient image manipulation.

## Features

- **Upload Images**: Users can upload images to be stored and processed.
- **Resize Images**: Resize images by specifying height and width.
- **Blur Images**: Apply a blur effect with a customizable intensity.
- **Other Image Filters**: Potential to add more effects and filters (e.g., crop, watermark).
- **Error Handling**: Comprehensive error handling with custom error classes.
- **Unit Tests**: Built-in tests for various functionalities using Jest.

## Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express**: Backend web framework
- **TypeScript**: Superset of JavaScript for type safety
- **Sharp**: High-performance image processing library
- **Jest**: Testing framework for unit tests

## Getting Started

### Prerequisites

- **Node.js** (>= v14)
- **npm** (or **yarn**)
- Install dependencies: Run `npm install`

#### Running the Application
To start the development server:
npm run serve

For a production build:
npm build

##### API EndpointsUpload Image

1. Upload Image
- POST /upload
- Uploads an image file.

2- Resize Image
- POST /resize/:imageName
- Resizes an image based on provided height and width in JSON body.

3- Crop Image
- POST /crop/:imageName
- Crop an image based on provided x , y , height and width  in JSON body

4- Blur Image
- POST /blur/:imageName
- Applies a blur effect based on a sigma value in JSON body.

5- Greyscale Filter
-POST /greyscale/:imageName
-Applies a grey effect on the provided image

6- watermark
-POST /watermark/:imageName
-add a watermark into the image


###### Testing 
to run the test: 
npm test