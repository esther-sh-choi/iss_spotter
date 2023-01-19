const { fetchMyIP, fetchCoordsByIp } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP:", ip);
// });

fetchCoordsByIp("99.229.36.202", (error, data) => {
  if (error) {
    console.log(error.message);
    return;
  }
  console.log(data);
});
