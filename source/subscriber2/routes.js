var express = require("express");
const axios = require('axios');
var router = express.Router();
const app = express();

router.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
router.use(express.urlencoded({ extended: true }));

var data = {name:'-',protein:'-',calories:'-'};
router.get("/", function(req,res){
    res.render("index", data);
    //console.log("1");
});

router.post("/subscribe_chicken", function(req, res){
    var data = {
        name: "chicken",
        subscriberName: "subscriber-2"
    }
    axios.post("http://broker-service:8080/subscribe",data,{'Content-type':'application/json'})
    .then(res => console.log(res.status))
    .catch(err => console.log(err));
    
});

router.post("/unsubscribe_chicken", function(req, res){
    console.log("unubscribe chicken calling!!!")
    var data = {
        name: "chicken",
        subscriberName: "subscriber-2"
    }
    axios.post("http://broker-service:8080/unsubscribe",data,{'Content-type':'application/json'})
    .then(res => console.log(res.status))
    .catch(err => console.log(err));
});

router.post("/subscribe_fish", function(req, res){
    var data = {
        name: "fish",
        subscriberName: "subscriber-2"
    }
    axios.post("http://broker-service:8080/subscribe",data,{'Content-type':'application/json'})
    .then(res => console.log(res.status))
    .catch(err => console.log(err));
});

router.post("/unsubscribe_fish", function(req, res){
    var data = {
        name: "fish",
        subscriberName: "subscriber-2"
    }
    axios.post("http://broker-service:8080/unsubscribe",data,{'Content-type':'application/json'})
    .then(res => console.log(res.status))
    .catch(err => console.log(err));
});

router.post("/subscribe_pork", function(req, res){
    console.log("subchick");
    var data = {
        name: "pork",
        subscriberName: "subscriber-2"
    }
    axios.post("http://broker-service:8080/subscribe",data,{'Content-type':'application/json'})
    .then(res => console.log(res.status))
    .catch(err => console.log(err));
});

router.post("/unsubscribe_pork", function(req, res){
    console.log("unsubchick");
    var data = {
        name: "pork",
        subscriberName: "subscriber-2"
    }
    axios.post("http://broker-service:8080/unsubscribe",data,{'Content-type':'application/json'})
    .then(res => console.log(res.status))
    .catch(err => console.log(err));
});

router.post("/subscribe_beef", function(req, res){
    console.log("subchick");
    var data = {
        name: "beef",
        subscriberName: "subscriber-2"
    }
    axios.post("http://broker-service:8080/subscribe",data,{'Content-type':'application/json'})
    .then(res => console.log(res.status))
    .catch(err => console.log(err));
});

router.post("/unsubscribe_beef", function(req, res){
    console.log("unsubchick");
    var data = {
        name: "beef",
        subscriberName: "subscriber-2"
    }
    axios.post("http://broker-service:8080/unsubscribe",data,{'Content-type':'application/json'})
    .then(res => console.log(res.status))
    .catch(err => console.log(err));
});

router.post("/subscription_data", function(req, res){
    console.log("inside");
    console.log("------------------------");
    console.log(req.body); 
    console.log("------------------------");   
    data = {
        name:req.body.name,
        protein:req.body.protein,
        calories:req.body.calories
    };
    res.sendStatus(200);
    //res.render("index", {name:'ChickeFFishn0',protein:'12',calories:'22'});
});

router.get("/get_subscription_data", function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
    res.send();
});

module.exports = router;