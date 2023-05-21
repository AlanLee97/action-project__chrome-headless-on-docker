const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('/image', async (req, res) => {
  // puppeteer.launch() => Chrome running locally (on the same hardware)
  let browser = null;

  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: 'new',
      executablePath: '/usr/bin/chromium-browser'
    });
    const page = await browser.newPage();

    await page.goto('http://alanlee.top/app/illustration-calendar/');
    const screenshot = await page.screenshot();

    res.end(screenshot, 'binary');
  } catch (error) {
    if (!res.headersSent) {
      res.status(400).send(error.message);
    }
  } finally {
    if (browser) {
      browser.close();
    }
  }
});

app.listen(8081, () => console.log('Listening on PORT: 8081'));



// console.log('hello, this is test')

// const http = require('http')

// const server = http.createServer((req, res) => {
//     res.end('hahaha')
// })

// server.listen(8081, () => {
//     console.log('started!');
// })