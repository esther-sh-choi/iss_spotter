const request = require("request-promise-native");

const fetchMyIP = () => {
  return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIp = (body) => {
  const ip = JSON.parse(body).ip;
  return request("http://ipwho.is/" + ip);
};

const fetchISSFlyOverTimes = (data) => {
  const { latitude, longitude } = JSON.parse(data);
  return request(
    `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`
  );
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIp)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const response = JSON.parse(data).response;
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };
