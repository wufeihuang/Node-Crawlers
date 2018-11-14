const fs = require("fs");

const outputDir = "readmes2";
const ext = ".md";

fs.existsSync(outputDir) || fs.mkdirSync(outputDir);

function async_outputReadmeToFile({content, name} = {}) {
  console.log("Start Writing: " + name);
  fs.writeFile(`output/${outputDir}/${name}${ext}`, content, "utf8", (e) => {
    if(e) {
      console.log("Write File Failed: " + name);
    }else{
      console.log("Write File Success.")
    }
  });
}

module.exports = async_outputReadmeToFile;