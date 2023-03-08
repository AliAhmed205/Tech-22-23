const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const app = express()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

// Set up middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.use('/public/', express.static('./public'));
app.use(express.static(__dirname + '/public'));

// In-memory store for themes
let themes = []

// Render the theme builder form
app.get('/', (req, res) => {
  res.render('theme-builder', { themes: themes })
})

// Handle the theme builder request
app.post('/api/theme-builder', upload.single('image'), (req, res) => {
  const { body, file } = req
  const theme = {
    name: body.name,
    backgroundColor: body.backgroundColor,
    fontFamily: body.fontFamily,
    image: file ? file.filename : null,
  }
  // Save the theme to your database
  themes.push(theme)
  console.log('Theme builder request received:', body)
  console.log('Uploaded image:', file)
  res.redirect('/')
})

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})