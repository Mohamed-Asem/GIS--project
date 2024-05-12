const express = require('express');
const NodeGeocoder = require('node-geocoder');
const axios = require('axios');
const Country = require('./models/country');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const options = {
  provider: 'google',
  apiKey: process.env.apiKey,
};

const geocoder = NodeGeocoder(options);

const googleMapsClient = require('@google/maps').createClient({
  key: process.env.apiKey,
});

const app = express(); // req.body

app.use(express.json());

// get location from the user and return it's coordinates

app.get('/getLocationData', (req, res) => {
  const { address } = req.body; // client
  googleMapsClient.geocode({ address }, function (err, response) {
    if (!err) {
      res.json(response.json.results);
    }
  });
});

app.get('/restaurants', async (req, res) => {
  try {
    const city = 'ismailia';
    const brought = 'ismailiastaduim';
    const category = 'restaurants';

    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${category}+${city}+${brought}&type=restaurant&key=${process.env.apiKey}`
    );

    res.status(200).json({
      status: 'success',
      data: {
        restaurants: data,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.get('/getCairoHospitals', async (req, res) => {
  try {
    const city = 'cairo';
    const category = 'hospitals';

    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${category}+${city}&type=hospital&key=${process.env.apiKey}`
    );
    res.status(200).json({
      status: 'success',
      data: {
        hospitals: data,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.get('/getAllPlaces', async (req, res) => {
  try {
    const { city, category, type } = req.body;

    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${category}+${city}&type=${type}&key=${process.env.apiKey}`
    );

    res.status(200).json({
      status: 'success',
      data: {
        places: data,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//////////////////////////////// routes related to country :routes related to country ////////////////////////

// 1) get all countries:
app.get('/country', async (req, res) => {
  try {
    const countries = await Country.find();

    return res.status(200).json({
      status: 'success',
      data: {
        countries,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
});

// 2) add new country :

app.post('/country', async (req, res) => {
  try {
    const { name, population, Qara, area, currency, location } = req.body;

    const country = await Country.create({
      name,
      population,
      Qara,
      area,
      currency,
      location,
    });

    return res.status(201).json({
      status: 'success',
      data: {
        country,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
});

// get all nearest locations from longitude and latitude of client location
app.get('/getAllNearestLocation', async (req, res) => {
  try {
    let maxDistance = req.query?.maxDistance || 500000000;

    const { longitude, latitude } = req.query;

    const nearestPlaces = await Country.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: maxDistance,
        },
      },
    });

    res.status(200).json({
      status: 'success',
      size: nearestPlaces.length,
      data: {
        nearestPlaces,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
});

module.exports = app;
