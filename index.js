const express = require('express');
<<<<<<< HEAD
const { v4: uuidv4 } = require('uuid');
require('dotenv').config({path: '.env'});
=======
require('dotenv').config({path: '.env'})
>>>>>>> 10918e04e0929b18dced06e30c92fc19873707b3
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const multer = require('multer');
<<<<<<< HEAD
const upload = multer({ dest: 'public/uploads/' });
const { MongoClient, ObjectId } = require('mongodb');
=======
const { MongoClient } = require('mongodb');
>>>>>>> 10918e04e0929b18dced06e30c92fc19873707b3

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
<<<<<<< HEAD
  }
}

connectToDatabase();

// Insert a new theme into the database
async function insertTheme(theme) {
  try {
    const result = await collection.insertOne(theme);
    console.log('Theme saved to database:', theme);
    themes.push(theme);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

app.post('/submit-form', upload.single('image'), async (req, res) => {
  console.log('Your coven theme has been uploaded, huzzah!')
  console.log(req.file)
  const { body, file } = req;
  const theme = {
    _id: body.id,
    name: body.name, 
    backgroundColor: body.color,
    fontFamily: body.font,
    textColor: body['font-color'],
    images:  file.filename,
    thumbnailUrl: `/public/uploads/${file.filename}`
  };
  
  try {
    await insertTheme(theme);
    try {
      const renderData = await collection.find({}).toArray();
      res.render('theme-builder2', { themes: renderData , theme});
    } catch (err) {
      console.error(err);
      res.status(500).send('Failed to retrieve themes');
    }
  } catch (err) {
    res.status(500).send({ error: 'Failed to save theme' });
  }
=======
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
>>>>>>> 10918e04e0929b18dced06e30c92fc19873707b3
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

<<<<<<< HEAD
app.get('/themes/:themeID', async (req, res) => {
  try {
    if (!collection) {
      return res.status(500).send('Unable to connect to database');
    }

    const id = req.params.themeID;
    const theme = await collection.findOne({ _id: new ObjectId(id) });
    if (!theme) {
      return res.status(404).send('Theme not found');
    }

    const renderData = await collection.find({}).toArray(); // hier is een aanpassing gemaakt
    res.render('theme-builder2', { theme, themes: renderData }); // hier is een aanpassing gemaakt
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to retrieve theme');
  }
});

app.delete('/themes/:themeID', async (req, res) => {
  try {
    if (!collection) {
      return res.status(500).send('Unable to connect to database');
    }

    const id = req.params.themeID;
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).send('Theme not found');
    }

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to delete theme');
  }
});



=======
connectToDatabase();
>>>>>>> 10918e04e0929b18dced06e30c92fc19873707b3

app.get('/form', (req, res) => {
  res.render('form.ejs');
});

<<<<<<< HEAD

=======
>>>>>>> 10918e04e0929b18dced06e30c92fc19873707b3
app.post('/submit', (req, res) => {
  const name = req.body.test;
  res.send(`Name: ${name}`);
});
<<<<<<< HEAD


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.error();
=======

// Start the server
const PORT = process.env.PORT || 1200;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
>>>>>>> 10918e04e0929b18dced06e30c92fc19873707b3
});
