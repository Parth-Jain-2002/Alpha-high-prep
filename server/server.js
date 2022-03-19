var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var { MongoClient } = require('mongodb');
const port = 3000

var app = express();
const uri = "mongodb+srv://OptimalKnight:#12November@cluster0.fh1pc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(uri);

async function main() {
    console.log("HERE")
    await client.connect();
    const connect = await client.db(databasename).admin();

    connect.listDatabases((err, db) => {
        // Printing the databases
        if (!err) console.log(db);
    })
}

main().catch(console.error());

app.get('/', urlencodedParser, (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})