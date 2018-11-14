const https = require("https");

function async_download(url) {
  return new Promise((resolve, reject) => {
    // https://nodejs.org/api/https.html#https_https_get_url_options_callback
    https.get(url, (res) => {
      const {
        statusCode
      } = res;

      let error;
      if (statusCode !== 200) {
        error = new Error("Request Failed.\n" +
          `Status Code: ${statusCode}`);
      }

      if (error) {
        console.log(error.message);
        // comsume response data to free up memory
        res.resume(); // https://nodejs.org/api/stream.html#stream_readable_resume
        reject(error);
      }

      res.setEncoding("utf8");

      let rawData = "";
      res.on("data", (chunck) => {
        rawData += chunck;
      });

      res.on("end", () => {
        resolve(rawData);
      });
    }).on("error", (e) => {
      console.log("downloading error:" + url);
      reject(e);
    });
  });
}

module.exports = async_download;