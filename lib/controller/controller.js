"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const puppeteer_1 = __importDefault(require("puppeteer"));
const node_html_parser_1 = require("node-html-parser");
const url_1 = __importDefault(require("url"));
async function processUrl(req, res) {
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    //get url from the params
    const urlObj = new url_1.default.URL(req.url, `http://${req.headers.host}`);
    const passedUrl = urlObj.searchParams.get("url");
    console.log(passedUrl);
    try {
        if (passedUrl) {
            const browser = await puppeteer_1.default.launch();
            const page = await browser.newPage();
            await page.goto(passedUrl);
            const data = await page.content();
            const dom = node_html_parser_1.parse(data);
            const title = dom.querySelector("title").innerText;
            const description = dom
                .querySelector('meta[name="description"]')
                .getAttribute("content");
            const imgUrls = Array.from(dom.querySelectorAll("img"))
                .map((img) => img.getAttribute("src") || "")
                .filter((url) => String(url).length > 0);
            await browser.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                title,
                description,
                imgUrls,
            }, null, " "));
        }
        else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ response: "No url was passed." }, null, " "));
        }
    }
    catch {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ response: "Invalid Url." }, null, " "));
    }
}
module.exports = {
    processUrl,
};
