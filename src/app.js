const express = require('express'); 
const app = express(); 

app.get('/user/:userId',(req,res)=>{
    console.log(req.params)
    console.log(req.query)
    res.send({firstname:"Bikash", lastname: "Kumar"})
    
})

app.get('/test', (req, res) => {
    res.send('Hello, World!'); 
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
