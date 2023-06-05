// libraries
import path from "path"
import express from 'express'
import routes from './routes/index.js'

// instantiate express and port 
const app = express();
const PORT = process.env.PORT || 3001;

// instatiate express middleware routes
app.use(routes);



// start server
app.listen(PORT, () => console.log('Now listening'));
