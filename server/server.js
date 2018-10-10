require('dotenv').config();
const express= require('express');
const session = require('express-session');
const axios = require('axios'); 


const app = express();

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))

let{
SERVER_PORT
} = process.env;

app.get('/auth/callback', async (req,res)=>{

})

app.listen(SERVER_PORT, ()=>{
    console.log(`Listening on port: ${SERVER_PORT}`)
})