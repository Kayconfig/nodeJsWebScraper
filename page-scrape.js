// const $_$wf = require('$_$wf');
const pup = require('puppeteer');
const {parse} = require('node-html-parser');

const fs = require('fs');

// ( async()=>{
//     const browser = await pup.launch();
//     const page = await browser.newPage();

//     await page.goto('http://google.com');
//     const data =  await page.evaluate( (document)=> document.body.innerHTML );
//     await browser.close();
//     console.log(data)
// })();

async function start(){
    const browser = await pup.launch();
    const page= await browser.newPage();

    await page.goto("https://stackoverflow.com/questions/65415057/get-the-root-document-object-outside-page-evaluate-in-puppeteer-js");
    // await page.screenshot({path: 'amazing.png'});
    // await page.screenshot({path: 'amazing2.png', fullPage:true});
    const data = await page.content()
    const dom = parse(data);
    console.log( dom.querySelector('title').innerText);
    console.log(Array.from(dom.querySelectorAll("img")).map(img=>img.getAttribute('src')) )
    // console.log(data, 'length: ', data.length);
    await browser.close();
}

start();