const express = require('express');
const bodyParser = require('body-parser');
const swapRoutes = require('./routes/swapRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Register swap routes
app.use('/swap', swapRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
