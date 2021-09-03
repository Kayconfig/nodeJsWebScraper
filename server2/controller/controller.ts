import puppeteer from "puppeteer";
import { parse } from "node-html-parser";
import url from "url";
import { IncomingMessage, ServerResponse } from "http";

async function processUrl(req: IncomingMessage, res: ServerResponse) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  //get url from the params
  const urlObj = new url.URL(req.url as string, `http://${req.headers.host}`);
  const passedUrl = urlObj.searchParams.get("url");
  // console.log(passedUrl);
  try {
    if (passedUrl) {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.goto(passedUrl);
      const data = await page.content();
      const dom = parse(data);
      const title = dom.querySelector("title").innerText;
      const description = dom
        .querySelector('meta[name="description"]')
        .getAttribute("content");
      const imgUrls: string[] = Array.from(dom.querySelectorAll("img"))
        .map((img) => img.getAttribute("src") || "")
        .filter((url) => String(url).length > 0) as string[];
      await browser.close();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify(
          {
            title,
            description,
            imgUrls,
          },
          null,
          " "
        )
      );
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ response: "No url was passed." }, null, " "));
    }
  } catch {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ response: "Invalid Url." }, null, " "));
  }
}
export = {
  processUrl,
};
