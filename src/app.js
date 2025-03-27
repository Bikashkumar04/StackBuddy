const express = require('express'); 
const app = express();
require('dotenv').config();
const {connectDB } = require('./config/database');
const User =require("./models/user");
const {validateSignUp} =require('./utils/validation');
const bcrypt = require('bcrypt');
const cookieParser =require('cookie-parser');
const jwt =require('jsonwebtoken')
const {userAuth} =require('./middlewares/auth')

app.use(cookieParser())
app.use(express.json())
app.post("/signup", async (req,res)=>{
    try{
        const {firstName, lastName,emailId,password} =req.body;

        //validation of data
        validateSignUp(req);

        //password encrypting
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password,saltRounds)

        // find user exist or not
        const existingUser =await User.findOne({emailId});
        if(existingUser){
            return res.status(400).send("user already exists")
        }

        //create new user and save
        const newUser =new User({firstName,lastName,emailId,password: passwordHash});
        await newUser.save();
        console.log(req.body);

        res.send("user add successfully")
    }catch(err){
        res.status(400).send("Error in saving " +err.message)
    }


})

app.post('/login', async (req,res)=>{
    
    try{
        const {emailId,password} =req.body;

        
        const existingUser =await User.findOne({emailId: emailId});
        if(!existingUser){
            return res.status(400).send("Invalid credentials")
        }

        const isPasswordValid =await bcrypt.compare(password, existingUser.password)

        if (!isPasswordValid) {
            return res.status(400).send("Invalid credentials");
        }else{
            //create jwt token
            const token = await jwt.sign({_id: existingUser._id}, "stackbuddy@1504",{
                expiresIn:'1h'
            })
            console.log(token);
            res.cookie("token",token,{ expires: new Date(Date.now() +8* 3600000), httpOnly: true })
            return res.status(200).send("Login successful");}
    }
    catch(err){
        res.status(400).send("Invalid credentials");
    }
})

app.get("/profile", userAuth, async (req, res)=>{
    try{
        const user =req.user
        res.send(user)
    }
    catch(err){
        res.status(400).send("Invalid credentials") 
    }

})

app.patch("/user/:userId" ,async (req,res)=>{
    const userId =req.params?.userId;
    const data =req.data;


    try{

        const allowed_Update =["gender","photoUrl","skills","age","about"];

        const isUpdateAllowed =Object.keys(data).every((k)=>{
            allowed_Update.includes(k);
        })
    
        if(!isUpdateAllowed){
            throw new Error("This update are not allowed")
        }

        const user =await User.findByIdAndUpdate({_id: userId},data,{new: true,runValidators:true})
        if(!user){
           return res.status(400).send("user not found")
        }
        res.status(200).json({
            message:"user updated successfully",
            user: updateUser
        })

    }catch(err){
        res.status(400).send("user not found");

    }
})

// connected DB and port were website run
connectDB()
   .then(()=>{
    console.log("connection successfully")
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
   })
   .catch((error)=>{
    console.error("connection unsuccessfully")
    process.exit(1)
    })


