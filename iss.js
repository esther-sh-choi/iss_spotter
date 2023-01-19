/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require("request");
const ipAPI = "https://api.ipify.org?format=json";
const geoAPI = "http://ipwho.is/";

const fetchMyIP = function (callback) {
  request(ipAPI, (err, response, body) => {
    // error can be set if invalid domain, user is offline, etc.
    if (err) return callback(err, null);

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIp = (ip, callback) => {
  request(geoAPI + ip, (err, response, body) => {
    if (err) {
      return callback(err, null);
    }

    const data = JSON.parse(body);
    if (!data.success) {
      const msg = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
      callback(Error(msg), null);
      return;
    }

    const { latitude, longitude } = data;

    callback(null, { latitude, longitude });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIp };
