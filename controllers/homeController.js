const dialogflow=require('../config/dialogflow');
module.exports.home=function(req,res){
    return res.render('chat', {
        title: 'YOYO Pizza'
    });
}

// module.exports.sendMsg=function(req,res)
// {
//     dialogflow.runSample(req.body.MSG,res).then(data=>{
//         res.send({ Reply: data })
//     })
// }