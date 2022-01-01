const express = require('express');
const axios = require('axios');
const app = express();

const getFood = async (food) => {
        const res = await axios.get(`https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=${food}`,{
            headers: {
                'x-rapidapi-host': 'nutrition-by-api-ninjas.p.rapidapi.com',
                'x-rapidapi-key': 'ec061f88cemsha7b28599fa14d82p19150cjsndfba1bae8f0f'
            }
        })
        .then(res => {
            postTobroker(res.data)
        });
        
}

const postTobroker = (data) => {
     axios.post("http://broker-service:8080/publishData",data,{'Content-type':'application/json'})
    .then(res => console.log(res.status))
    .catch(err => console.log(err));
}


var minutes = 1, the_interval = minutes * 10 * 1000;
var i = 0;
var food = ["beef","pork"]
// interval = setInterval(function () {
//     getFood(food[i++])
//     if (i == 2) {
//         i = 0
//         //clearInterval(interval)
//     }
// }, the_interval);

setInterval(function () {
    getFood(food[i++])
    if (i == 1) {
        i = 0
        //clearInterval(interval)
    }
}, the_interval);

const PORT = 3000

app.listen(3001, () => {
    console.log(`Server is running on port ${PORT}.`);
});
