const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const path = require('path')
const PORT = process.env.PORT || 8080;
const port = 8080;
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

const RedisSessions = require("redis-sessions");
var rs = new RedisSessions();
var redis = require("redis");
const { Cookie } = require('express-session');



var redisClient = redis.createClient();





redisClient.connect();

redisClient.on("connect", function (err) {
    if (err) throw err;
    console.log("Connected to redis successfully");
});
   
// rs.create({
//     app: "guvi",
//     id:"username",
//     ip: "192.168.22.58",
//     ttl: 3600,},
    
//     function(err, resp) {
//         return window.localStorage.setItem(token,resp);
//       // resp should be something like 
//       // {token: "r30kKwv3sA6ExrJ9OmLSm4Wo3nt9MQA1yG94wn6ByFbNrVWhcwAyOM7Zhfxqh8fe"}
       

// });
 

const app = express();
app.use(express.json())
app.use(cors());



// app.use(session({
//     secret: 'mysecret',
//     // create new redis store.
//     store: new RedisStore({client: redisClient}),
//     saveUninitialized: false,
//     resave: false,
//     cookie:{
//         secure:false,
//         httpOnly:true, 
//     }
// }));


// app.use((req,res,next)=>{
//     if (!req.session || !req.session.key){
//         const err = new Error("u shall not pass")
//         next(err)
//     }
//     next();
// })




var tableSchema = mongoose.Schema({
    Name: { type: String , required:true},
    UserName :{ type : String ,required : true},
    Email: { type: String , lowercase:true , unique:true, required:true},
    DateOfBirth : { type: Date ,default:100 },
    Password : { type: String ,required:true},
    Files :{type:Array}
    
})

const Data =  mongoose.model('guvi',tableSchema);

url ="mongodb+srv://data:test1234@cluster1.3gbrs9r.mongodb.net/data?retryWrites=true&w=majority"

mongoose.connect(url,(err)=>{
    if (err) throw err;
    console.log("database connected")

})

app.use(express.static(path.join(__dirname, "/client/build"))); 

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

// if (process.env.NODE_ENV === 'production') {
//     // Serve any static files
//     app.use(express.static(path.join(__dirname, '/build')));
//   // Handle React routing, return all requests to React app
//     app.get('*', function(req, res) {
//       res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//     });
//   }





app.post("/",(req,res)=>{
    
    
    if(localStorage.getItem("token")!==null){
        res.json({user:true})
    }
    else{
        res.json({user:false})
    }
})

app.post("/profile",(req,res)=>{
    if(localStorage.getItem("token") !== null){
        res.json({"user":true});

    }else{
        res.json({"user":false});
    }
})

app.post("/logout",(req,res)=>{

    try {
        if(localStorage.getItem !==null){

            rs.kill({
                app:"guvi",
                token:localStorage.getItem("token")},
                function (err,result){
                    if (err) throw err;
                    console.log("cleared")
                    console.log(res)
                }
            );
            localStorage.removeItem("token");
            res.json({"success":true});
        }
        else{
            res.json({"success":false})
        }
        
    } catch(error) {
        if (error) throw error;
        
    }
    
})



app.post('/signup', async (req,res)=>{
    
    console.log(req.body) 
    try{
        const oldUser = await Data.findOne({Email : req.body.email })
        if(!oldUser){

            Data.create({
                Name : req.body.name,
                UserName : req.body.username,
                Email:req.body.email,
                DateOfBirth : req.body.dob, 
                Password : req.body.password,
            })
            return res.sendStatus(201)
        }

        else{
            return res.sendStatus(202)
        }
        
    }  
    catch(err){ 
          
        return res.json({status:'error' , registered : false})
    }
})


app.post("/login", (req,res)=>{
    try {
        console.log(req.body)
        
         Data.findOne({Email:req.body.loginemail},(err,result)=>{
            if (err) throw err;
            if(!result){
                
                res.send({"success":false})
                console.log("not registered")
            }
            else{
                const { Name , UserName , Email} = result;
                
                rs.create({
                    app:"guvi",
                    ip: "192.168.22.58",
                    id:UserName,
                    ttl:3600,
                    
                    

                },
                function(err,resp){
                    if (err) throw err;
                    localStorage.setItem("token",resp.token);
                    
                    
                })
                
                
                 
                console.log(result)
                res.send({"success":true,})
            }
        })
        
    } catch (error) {
        if (error) throw error;
        
    }
})


// app.post('/login', async (req,res)=>{
    
//     console.log(req.body)
//     try{
//         const user = await Data.findOne({Email : req.body.loginemail , Password : req.body.loginpassword})
//         // data = Data.find({Email:req.body.loginemail},(err,data)=>{
//         //     if(err){
//         //         console.log(err)
//         //     }
//         //     else{S
                
//         //         const name = data[0].Name
//         //         res.json(name)
//         //     }

//         // })
        
//         if(user){   
            
//             return res.sendStatus(201)
//         }
//         else{

//             return res.sendStatus(202)
//         }
        
        
        

        
        
//     }
//     catch(err){
        
//         res.json({ status: "error" ,error : 'invalid email'})

//     }
// })




app.listen(port,console.log("server connected"+port))