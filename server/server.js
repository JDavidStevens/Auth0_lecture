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
SERVER_PORT,
REACT_APP_DOMAIN,
REACT_APP_CLIENT_ID,
CLIENT_SECRET
} = process.env;

app.get('/auth/callback', async (req,res)=>{
    //auth-0 sending code in req.querycode
//=======COPY PASTE START===============
    let payload ={
        client_id: REACT_APP_CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `http://${req.headers.host}/auth/callback`
    }
    //exchange code foer token. Token is on resWithToken.data.access_token
    let resWithToken = await axios.post(`https://${REACT_APP_DOMAIN}/oauth/token`,payload);
    //exchange token for user data
    let resWithData= await axios.get(`https://${REACT_APP_DOMAIN}/userinfo/?access_token=${resWithToken.data.access_token}`)
    console.log("Test:",resWithData.data)
    //======COPY PASTE END======
})

app.listen(SERVER_PORT, ()=>{
    console.log(`Listening on port: ${SERVER_PORT}`)
})