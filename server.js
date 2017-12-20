const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'contactManagementAppDB';


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

MongoClient.connect(url, function (err, client) {

    console.log("Connected successfully to server");
    const db = client.db(dbName);


    app.get('/product/:id', (req, res) => {
        var id = parseInt(req.params.id);
        db.collection('product').findOne({ id: id }).then(function(result){
            res.send(result);
        })
    });

    app.get('/product', (req, res) => {
        console.log(req.body);
        db.collection('product').find().toArray(function (err, docs) {
            res.send(docs);
        })
    });

    app.post('/product', (req, res) => {
        console.log(req.body);
        db.collection('product').insert(req.body).then(function (result) {
            res.send(result);
        })
    });

});

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))