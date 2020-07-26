const dialogflow = require('dialogflow');
const uuid = require('uuid');
const serviceAccount=require('../PIZZA-bot-d4014159e5f7.json');


const sessionId = uuid.v4();

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
module.exports.runSample=async function runSample(msg,projectId = 'pizza-bot-xntudo') {
    // A unique identifier for the given session 
    // Create a new session
    const sessionId = uuid.v4();
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
          text:msg,
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
    

    return  result.fulfillmentText;
  }
  
// module.exports.createOrder=function(orderDetailsArray,res){
//   let order=await Order.create({
    
//     size:orderDetailsArray['size'],
//     type:orderDetailsArray['type'],
//     crust:orderDetailsArray['crust'],
//     flavour:orderDetailsArray['flavour'],
//     quantity:orderDetailsArray['quantity']
//     })
//     console.log(order._id);
// }