// libraries
import path from "path"
import express from 'express'
import routes from './routes/index.js'
import cors from 'cors'

// instantiate express and port 
const app = express();
const PORT = process.env.PORT || 3001;
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

// instatiate express middleware routes
app.use(routes);

// TODO: remove in production
// cors middleware 
app.use(cors(corsOptions));

// start server
app.listen(PORT, () => console.log('Now listening'));
