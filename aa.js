const express = require('express');
const app = express();

const port = 7619;

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);

  // Code to connect ngrok TCP tunnel
  const ngrok = require('ngrok');
  const ngrokPort = 7619;

  (async function() {
    try {
      const url = await ngrok.connect({
        proto: 'tcp',
        addr: ngrokPort,
      });

      console.log(`Ngrok tunnel established at: ${url}`);
    } catch (error) {
      console.error('Error while connecting to ngrok:', error);
    }
  })();
});
