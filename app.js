const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const puppeteer = require('puppeteer')
const mustacheExpress = require('mustache-express')

let app = express()
app.use(cors())
app.use(bodyParser.json())
app.engine('html', mustacheExpress())
app.set('view engine', 'html')

// public route that anyone can access
app.get('/hello', (req, res) => {
  return res.json({
    message: 'Hello world!'
  })
})

app.get('/html', (req, res) => {
  const templateData = {  }
  res.render('template.html', templateData)
})


app.get('/pdf', (req, res) => {
  (async () => {

      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      // await page.goto('https://i2wd7xn5sc.execute-api.us-east-1.amazonaws.com/dev/html')
      await page.goto('http://localhost:8081/html')
      const buffer = await page.pdf({format: 'A4', })
      res.type('application/pdf')
      res.send(buffer)
      await browser.close();
  })()
})


module.exports = app