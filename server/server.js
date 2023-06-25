// libraries
const express = require('express')
const routes = require('./routes/')
const db = require('./config/connection');


// instantiate express and port 
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// instatiate express middleware routes
app.use(routes);

// start server
db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
});
