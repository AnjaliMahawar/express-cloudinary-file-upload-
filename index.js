//console.log("helooo frti")
const express =require('express')
const app= express()
const multer  = require('multer')
const cloudinary = require('cloudinary');
const fs = require('fs'); // fs = file system


const { uuid } = require('uuidv4');

require('dotenv').config()

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

//mongo connect
//Require the db.js file
require('./DB/db.js')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        console.log(file)
      var random =uuid()
      var fname=random+""+file.originalname;
      cb(null, fname)
    }
  })
  
  const upload = multer({ storage })
app.post("/",upload.single('mypic'),function(req,res){
    console.log(req.file.path);
// snd file on cloudinary
    cloudinary.uploader.upload(req.file.path, function(error, result)

     {console.log(result, error)
        //let's delet the file from local
        console.log("result....",result)

        fs.unlink(req.file.path, function(err){
            if (err) console.log(err);
            else console.log("File Deleted");
        })
       // 
       
    });
   
    res.json({
        "msg":"file uploaded ",
        "data":"hl"
    })
})
let port = process.env.PORT ||2333 ;
app.listen(port,()=>{
    console.log('server is running on port '+port)
})