const express = require('express');
const mongoose = require('mongoose')
const pubData = require('./model/publisherdata')
const subData = require('./model/subscriber')
const axios = require('axios');
const app = express();
var cors = require('cors');
const sublist = require('./model/subscriber');

app.use(cors())
//get env variables
require('dotenv').config();


// parse request with COntent-type application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


//database conection
const uri = 'mongodb://mongo:27017/pubData';


mongoose.connect(uri,{useNewUrlParser:true});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("Connected Database Successfully");
});

app.post("/publishData",(req,res) => {
    //console.log(req.body);
    //console.log(req.body);
    insertData(req.body[0]);
    broadcastTosub();
    res.sendStatus(201);
});

function broadcastTosub() {
    obj = {}
    subData.find((err,docs) => {
        //console.log(docs);
        if(docs.length > 0){
            docs.map(doc => {
                obj[doc.topic] = doc.subscribers
            })
            console.log(JSON.stringify(obj));
            pubData.find({ name: { $in: Object.keys(obj)}},(err,docs) => {
                console.log("------------------------");
                console.log(docs);
                docs.map(doc => {
                    sendReqToSub(doc,obj[doc.name]);
                })
            })
        }    
    })
}

function sendReqToSub(doc,sublist){
    console.log("SendToSub")
    var req = {
        name: doc.name,
        calories: doc.calories,
        protein: doc.protein
    }
    console.log(req);
    if (sublist.length > 0){
        sublist.map(eachsub => {
            console.log(eachsub);
            console.log("------------------------");
            console.log(req);
            console.log("------------------------");
            //console.log(`http://${eachsub}:8081/subscribe-data`);
            if(eachsub == 'subscriber-1'){
                port = '4000'
            } else {
                port = '4001'
            }
            axios.post(`http://${eachsub}:${port}/subscription_data`,req,{'Content-type':'application/json'})
            .then(res => console.log(res.status))
            .catch(err => console.log(err));
        })
    }
    
}

/*

{
    topic: abcd,
    subscribername: s1
}
 */

app.post('/unsubscribe',(req,res) => {
    console.log("------------Unsubscribe------------");
    console.log(req.body);
    console.log("------------------------");
    subData.find({topic: req.body.name}, (err,docs) => {
        console.log(err);
        console.log(docs);
        if (docs.length){
            const index = docs[0].subscribers.indexOf(req.body.subscriberName)
            console.log("------------------------");
            console.log("---->"+index)
            console.log("------------------------");
            if (index > -1) {
                docs[0].subscribers.splice(index, 1);
            }
            docs[0].save((err) => {
                console.log("Subscirber removed successfully");
                res.sendStatus(200);
                if (err) {
                    console.log(err);
                }
            });
        }
    })
});


app.post("/subscribe",(req,res) => {
    //console.log(req.body);
    console.log(req.body);
    subsrcibeData(req.body);
    res.sendStatus(200);
});

function subsrcibeData(data){
    subData.find({topic: data.name}, (err,docs) => {
        console.log(err);
        console.log(docs);
        if (docs.length){
            docs[0].subscribers.push(data.subscriberName);
            docs[0].save((err) => {
                console.log("Data has been updated");
                if (err) {
                    console.log(err);
                }
            });
        } else {
            var sub = new subData();
            sub.topic = data.name;
            sub.subscribers.push(data.subscriberName)
            sub.save((err) => {
                console.log("Data has been saved");
                if (err) {
                    console.log(err);
                }
            });
        }
    })
}

function insertData(data) {
    pubData.find({name: data.name}, (err,docs) => {
        console.log(err);
        console.log(docs);
        if(docs.length){
            console.log("Data Already present in successdully");
        } else {
            var pubdata = new pubData();
            pubdata.name = data.name;
            pubdata.calories = data.calories;
            pubdata.protein = data.protein_g;
            pubdata.save((err) => {
                console.log("Data has been saved");
                if (err) {
                    console.log(err);
                }
            });
            
        }
    })
    
}

const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
