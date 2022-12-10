const express= require("express")
const jwt = require("jsonwebtoken")
const app = express()


app.get("/",(req,res)=>{
    res.json({
        message:"home-page"
    })
})

//protected route
//now after access token is generated and stored  
//if you want to access a protected route you want to send add a header value for authorization with that token i
app.post("/pro",verifyToken,(req,res)=>{
    jwt.verify(req.token,"sup's_secret_key",(err,authData) =>{
        if(err){                               //verify decrypts that token and auth data is a payload.
            res.json({
                message:"some error occured"  //if the entered token is not correct 
            })
        }
        else{
             
            res.json({ 
                message: "protected route", //if the token is correct
                authData
            })
        }
    })
    
    
    
   
})

app.post("/login",(req,res)=>{
    //assume a user when all the details are entered correctly
    const user = {
        id:1,
        username:"suprja",
        email:"suprajaa.20cse@kongu.edu"

    }
    //this methode basically generates a random token (secret key is some sort of encryption string)
    jwt.sign({user:user},"sup's_secret_key",{expiresIn:"30s"},(err,token)=>{
        res.json({
            token:token  // is the token generated
        })
        //this token generated is stored in mongo/localstorages
    })
})

//verify token
function verifyToken(req,res,next){
    const bearerHeader  = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){    // when any authorization token is given
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    else{
        res.json({
            message:"not authenticated"     //no authorization token is given
        })
    }
}

app.listen(3000,()=>{
    console.log("app on port 3000")
})