const express = require('express');
const dialogflow = require('dialogflow');
const uuid = require('uuid');
const bodyParser = require('body-parser');
const app = express();
const port=process.env.PORT || 8000;
const sassMiddleware=require('node-sass-middleware');
const db=require('./config/mongoose');
const serviceAccount=require('./PIZZA-bot-d4014159e5f7.json');
const sessionId = uuid.v4();
const User=require('./models/user');
const Order=require('./models/order');
userDetailsArray = [];
orderDetailsArray = [];

app.use(sassMiddleware({
  //source is directory from where we pick up the scss file for compilation
  src:'./assets/scss',
  //destination is where do i need to put file
  dest:'./assets/css',
  //It will show error in the console
  debug:true,
  outputStyle:'expanded',
  //where my server look for css file
  prefix:'/css'
}))

app.use(bodyParser.urlencoded({
  extended: false
}))

app.set('view engine','ejs');
app.set('views','./views');
app.post('/send-msg', (req, res) => {
  runSample(req.body.MSG, res).then(data => {
  
    res.send({ Reply: data })
  
})
})

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(msg,res,projectId = 'pizza-bot-xntudo') {
  // A unique identifier for the given session
  
 
  // Create a new session
  const sessionClient = new dialogflow.SessionsClient(
    { credentials:serviceAccount}
  );
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);
 
  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: msg,
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };
 
  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }


  if(result.fulfillmentText=="Which type of pizza you want veg or nonveg"){
      orderDetailsArray['size']=result.queryText;
      console.log( orderDetailsArray['size']);
  }
  if(result.fulfillmentText=="please tell us about base too ,hand tossed or thin crust or cheese?"){
    orderDetailsArray['type']=result.queryText;
    console.log(orderDetailsArray['type']);
  }
  if(result.fulfillmentText=="Choose pizza flavour from the following options bbq,onion,paneer makahani,capsium and veg overloaded"){
    orderDetailsArray['crust']=result.queryText;
    console.log(orderDetailsArray['crust']);
  }
  if(result.fulfillmentText=="Please tell number of pizza you want?"){
    orderDetailsArray['flavour']=result.queryText;
    console.log(orderDetailsArray['flavour']);
  }
  if(result.fulfillmentText=="Now we will take your details.Press ok to continue"){
    orderDetailsArray['quantity']=result.queryText;
    console.log(orderDetailsArray['quantity']);
  }
  if(result.fulfillmentText=="What is the mobilenumber?")
  {
    userDetailsArray['userName']=result.queryText;
    console.log("key"+userDetailsArray['userName']);
  }
  if(result.fulfillmentText=="What is the address?")
  {
    userDetailsArray['mobilenumber']=result.queryText;
    console.log(userDetailsArray['mobilenumber']);
  }
  if(result.fulfillmentText=="What is the pincode?")
  {
    userDetailsArray['address']=result.queryText;
    console.log(userDetailsArray['address']);
  }

  if(result.fulfillmentText=="Thank you for order")
  {
    userDetailsArray['pincode']=result.queryText;
    console.log(userDetailsArray['pincode']);
  }
  if(result.fulfillmentText=="What is the pincode?"){
    console.log(userDetailsArray['mobilenumber']);
    console.log(userDetailsArray['address']);
    console.log(userDetailsArray['userName']);
    let user=await User.create({
    
      mobileNumber:userDetailsArray['mobilenumber'],
      address:userDetailsArray['address'],
      name:userDetailsArray['userName']
      })
      console.log(user);
      let order=await Order.create({
    
        size:orderDetailsArray['size'],
        type:orderDetailsArray['type'],
        crust:orderDetailsArray['crust'],
        flavour:orderDetailsArray['flavour'],
        quantity:orderDetailsArray['quantity']
        })
        console.log(order);
  }
 
    
  
  return result.fulfillmentText;
}


  
//runSample();
app.use(express.static('assets'));
 app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log('Error: ',err);
        /*interpolition
        console.log(`Error in running : ${err}`);
        */
    }
    console.log(`server is running on port${port}`);
});