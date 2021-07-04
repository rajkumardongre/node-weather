const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=0cfa9f3db3143beeb3521ef6a1bcfdd5&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unabel to connect with weather services", undefined);
    } else if (body.error) {
      callback("Unabel to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. 
        It is currenlty ${body.current.temperature} degree out. It feels like ${body.current.feelslike} degrees out.
        The Humidity is ${body.current.humidity}%.`
      );
    }
  });
};

module.exports = forecast;
