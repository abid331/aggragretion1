const express = require("express")
const mongoose = require("mongoose")
const app = express();
app.use(express.json())
const port = 4000;


mongoose.connect("mongodb://127.0.0.1:27017/",  { useNewUrlParser: true,     useUnifiedTopology: true,
   })
   
     .then(() => {
        app.listen(port, () => {
          console.log("DB connected successfully");
       });
      })
     .catch((error) => {
         console.log(error);
       });
   let userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type : String,
        required:true,
    },
    age:{
        type : Number,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    }
   });


   const classRoom = mongoose.model("school",userSchema)



   app.post('/users', async (req, res) => {
    try {
      const data = req.body;
      console.log(data, "hello");
      await classRoom.create(data)
  
      res.status(200).json({
        data: "received" 
      });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Server error' });
    }
    })
    app.get("/users",async(req, res)=>{
        const user = await classRoom.aggregate([ {$match:{age: { $gte: 22}}}
          ,{ $limit: 5 }, {
            $project: {
              "name": 1,
              "age": 1
            }
          },
          { $addFields: { location: 'lahore' } }
          
      ])
        
        res.send(user)
    })
  





