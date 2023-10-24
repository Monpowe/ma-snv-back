import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
//import bodyParser from 'body-parser';
import test from './test.js'

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { CustomAPIError } from './config/errors.js';

import userRoute from './routes/users.js';
import apiRoute from './routes/api.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config();

const app = express();

//static
app.use("/public", express.static(path.join(__dirname, "public")));

//middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// app.use((req, res, next)=>{
//     next();
// })

//Routes
app.use('/api/users', userRoute);
app.use('/api/v2', apiRoute);
app.use('/test', test)

app.use('*', (req, res)=>{
    //res.redirect('/test');
    res.send('Not Found');
})

app.use((err, req, res, next)=>{

    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json(err.message);
    }
    //console.log(err);
    res.status(500).json(err.message);
})




const port = process.env.PORT


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});




