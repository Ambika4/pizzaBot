//require the libray
const mongoose =require('mongoose');

///connect to the database
mongoose.connect('mongodb+srv://ambika:ambika123@cluster0-2hzr8.mongodb.net/pizza_db?retryWrites=true&w=majority');



//acquire the connection(to check if it is successfully)
const db=mongoose.connection;

//when error
db.on('error',console.error.bind(console,"Error connecting to MOngodb"));

//up and running then print up and running 
db.once('open',function(){

    console.log('Connected to the database::MongoDB');
});

module.exports=db;