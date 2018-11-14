const cheerio = require("cheerio");

function parseEntryPage(html) {
  const modules = [];

  const $ = cheerio.load(html);

  const module_anchors = $("#readme").find("h2>a:last-child");
  module_anchors.each(function(i, elem){
    const a = $(this); // this === elem
    const reg = /\/(d3-\w+(-\w+)?)$/;

    const href = a.attr("href");
    const name = reg.exec(href)[1]; // 0是完整的匹配结果，1是外层括号匹配结果，2是内层括号匹配结果
    
    modules.push({
      name: name,
      alias: (/(.+?)\s?\(/).exec(a.text())[1],  // ? 在限制符后面，表示非贪婪匹配
      url: href,
      rawUrl: `https://raw.githubusercontent.com/d3/${name}/master/README.md`
    });
  });

  return modules;
}

module.exports = parseEntryPage;