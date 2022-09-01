const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const path = require('path')
const PORT = process.env.PORT || 3000;



 

const app = express();
app.use(express.json())
app.use(cors())






var tableSchema = mongoose.Schema({
    Name: { type: String , required:true},
    UserName :{ type : String ,required : true},
    Email: { type: String , lowercase:true , unique:true, required:true},
    DateOfBirth : { type: Date ,default:100 },
    Password : { type: String ,required:true}
    
})

const Data =  mongoose.model('guvi',tableSchema);

url ="mongodb+srv://data:test1234@cluster1.3gbrs9r.mongodb.net/data?retryWrites=true&w=majority"

mongoose.connect(url,(err)=>{
    if (err) throw err;

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


app.post('/login', async (req,res)=>{
    
    console.log(req.body)
    try{
        const user = await Data.findOne({Email : req.body.loginemail , Password : req.body.loginpassword})
        // data = Data.find({Email:req.body.loginemail},(err,data)=>{
        //     if(err){
        //         console.log(err)
        //     }
        //     else{
                
        //         const name = data[0].Name
        //         res.json(name)
        //     }

        // })
        
        if(user){   
            
            return res.sendStatus(201)
        }
        else{

            return res.sendStatus(202)
        }
        
        
        

        
        
    }
    catch(err){
        
        res.json({ status: "error" ,error : 'invalid email'})

    }
})




app.listen(PORT,console.log("sever"))