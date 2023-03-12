const express = require('express');
require('dotenv').config({path: '.env'})
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const multer = require('multer');
const { MongoClient } = require('mongodb');

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use('/public/', express.static('./public'));
app.use(express.static(__dirname + '/public'));

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    const timestamp = new Date().getTime();
    cb(null, timestamp + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// In-memory store for themes
let themes = [];

let collection;

const uri = "mongodb+srv://AliLazuli123:Lazuur123@cluster0.zugcsqg.mongodb.net/mydatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the database and set up the collection
async function connectToDatabase() {
  try {
    await client.connect();
    collection = client.db("mydatabase").collection("themes");
    console.log("Connected to database");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

// Insert a new theme into the database
async function insertTheme(theme) {
  try {
    const result = await collection.insertOne(theme);
    console.log('Theme saved to database:', theme);
    return result;
  } catch (err) {
    console.log(err);
    console.error(err); // Add this line
    throw err;
  }
}


app.post('/submit-form', upload.any(), async (req, res) => {
  console.log('Your coven theme has been uploaded, huzzah!')
  const { body, files } = req;
  const theme = {
    name: body.name,
    backgroundColor: body.color,
    fontFamily: body.font,
    textColor: body['font-color'],
    images: files.map(file => file.filename)
  };
  
  try {
    await insertTheme(theme); // insert theme into database
    res.redirect('/');
  } catch (err) {
    res.status(500).send({ error: 'Failed to save theme' });
  }
});

app.get('/', async (req, res) => {
  if (!collection) {
    return res.status(500).send('Unable to connect to database');
  }
  
  try {
    const renderData = await collection.find({}).toArray();
    res.render('theme-builder', { themes: renderData });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to retrieve themes');
  }
});

connectToDatabase();

app.get('/form', (req, res) => {
  res.render('form.ejs');
});

app.post('/submit', (req, res) => {
  const name = req.body.test;
  res.send(`Name: ${name}`);
});

// Start the server
const PORT = process.env.PORT || 1200;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
