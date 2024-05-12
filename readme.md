# GIS System Simulation Project

## Overview

This project was developed as part of a GIS (Geographic Information System) course to learn and implement modern technologies for building location-based services. The project integrates various tools and APIs to demonstrate functionalities such as text search, retrieving coordinates, and finding nearby places within a specified distance. The system also enables storing location data in a MongoDB database and retrieving it based on user input.

## Technologies Used

- **Node.js:** The project is built using Node.js, a JavaScript runtime environment.
- **Express:** Express.js is used as the web application framework to handle routing and middleware.
- **MongoDB:** MongoDB is utilized as the database management system for storing location data.
- **Mongoose:** Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js, used for schema-based modeling of application data.
- **axios:** Axios is used for making HTTP requests, in this case, for connecting to external APIs.
- **NodeGeocoder:** NodeGeocoder is employed to interact with geocoding services, particularly for converting addresses into geographic coordinates.
- **Google Maps APIs:** The project leverages various Google Maps APIs, including the Places API for location search and the Geocoding API for address-to-coordinate conversion.

## Features

1. **Text Search:** Users can perform text-based searches to find locations using keywords.
2. **Coordinate Retrieval:** The system retrieves latitude and longitude coordinates based on user input (address).
3. **Nearby Places:** Users can find nearby places within a specified distance from a given location.
4. **Database Integration:** Location data is stored and managed in a MongoDB database, enabling efficient retrieval and storage.
5. **Address-to-Coordinate Conversion:** Users can input an address, and the system returns its corresponding geographic coordinates along with additional data.

## Getting Started

To run the project locally, follow these steps:

1. Clone this repository to your local machine.
2. Install Node.js if not already installed.
3. Install MongoDB and ensure it's running.
4. Install project dependencies by running `npm install` in the project directory.
5. Configure environment variables for API keys and database connection.
6. Start the server by running `npm start`.
7. Access the application through the specified port in your browser.
