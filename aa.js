const express = require('express');
const fs = require('fs');
const ngrok = require('ngrok');
const app = express();
const filePath = 'ab.json';

// Middleware to parse JSON bodies
app.use(express.json());

// Route: /
// Show the JSON content from 'ab.json'
app.get('/', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
});

// Route: /aa
// Add any random string in 'ab.json' file array
app.get('/aa', (req, res) => {
  const randomString = generateRandomString();
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    try {
      const jsonData = JSON.parse(data);
      jsonData.push(randomString);

      fs.writeFile(filePath, JSON.stringify(jsonData), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }
        res.send('Random string added successfully');
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
});

// Helper function to generate a random string
function generateRandomString() {
  return Math.random().toString(36).substring(7);
}

// Start the server
const port = 6761;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  (async ()=>{
    ngrok.connect({proto:'tcp',addr:port,authtoken:'2SR50N2o46aXHCVx1vP88iCRuRH_5eYWHPgRCwFKRniE8Y52G'})
  })()
});
