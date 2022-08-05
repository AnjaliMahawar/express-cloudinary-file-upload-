const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_DB}.1968b.mongodb.net/?retryWrites=true&w=majority`).then((d)=>{
    //Success
    console.log('Conneted');
}).catch((e)=>{
    //Error
});
