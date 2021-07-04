const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoicmFqa3VtYXJkb25ncmUiLCJhIjoiY2txaG0xajJ4MDdxYzJ2a2NxNjBmYmo1dSJ9.6WZBjpJlxp89P-V-sbPCsg&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unabel to connect to Geocoding service.", undefined);
    } else if (body.features.length === 0) {
      callback("Unabel to find location. try with another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
