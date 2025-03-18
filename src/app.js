const express = require('express'); 
const app = express(); 

app.get(
    '/user/',
    (req,res,next)=>
        {
    console.log(req.query)
    res.send({firstname:"Bikash", lastname: "Kumar"})
    next()
    },
    (req,res)=>{
        console.log("request handler route 2")
        res.send("response 2")
    }
)

app.get('/test', (req, res) => {
    res.send('Hello, World!'); 
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
