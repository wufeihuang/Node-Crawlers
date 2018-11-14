const async_download = require("./modules/downloader");
const parseEntryPage = require("./modules/parser");
const async_outputReadmeToFile = require("./modules/outputer");
const fs = require("fs");

const entryUrl = "https://github.com/d3/d3/blob/master/API.md";

// https://raw.githubusercontent.com/d3/d3-array/master/README.md

async function start() {
  try{
    const entryHtml = await async_download(entryUrl);
    // console.log(result);
    const modules = parseEntryPage(entryHtml);
    // console.table(modules)

    const downloadPromises = modules.map((mod) => {
      return async_download(mod.rawUrl).then(cont => {
        return {
          content: cont,
          name: mod.alias  // mod.name
        };
      });
    });

    Promise.all(downloadPromises)
      .then(results => {
        console.log("all promises successed: " + results.length);
        // console.table(results[0])
        console.table(results.map(d => d.name))
        results.forEach(async_outputReadmeToFile);
      })
      .catch(e => {
        console.log(e);
      });

  } catch (e) {
    console.log('\nThere is an error');
    console.log(e);
  }
}


// 运行入口
start();