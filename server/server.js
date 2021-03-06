var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var cors = require('cors')
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json()
var { MongoClient } = require('mongodb');
const port = 3001

var app = express();
app.use(cors())
const uri = "mongodb+srv://OptimalNight:techmeet10@cluster0.fh1pc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(uri);

async function main() {
    await client.connect();
    const connect = await client.db().admin();
}

main().catch(console.error());

app.get('/getAllCompanies', async function (req, res) {
    try {
        await client.connect();
        const cursor = await client.db("CIK").collection("data").find({});
        let response = {}
        cursor.toArray((err, r) => {
            for (var e in r) {
                response[r[e]['CIK']] = r[e]['Company Name'];
            }
            res.end(JSON.stringify({ "status": "success", "data": response }));
        })

    } catch (error) {
        res.end(JSON.stringify({ "status": "error", "data": error }))
    }
})

app.post('/getCompanyNameByCIK', jsonParser, async function (req, res) {
    try {
        let ciks = req.body.cik;
        await client.connect();
        let response = {}
        for (var i in ciks) {
            ciks[i] = ciks[i].toString();
            const cursor = await client.db("CIK").collection("data").findOne({
                "CIK": { $eq: ciks[i] },
            })
            try {
                response[ciks[i]] = cursor['Company Name']
            } catch {
                response[ciks[i]] = null
            }
        }
        res.end(JSON.stringify({ "data": response }));
    } catch (error) {
        res.end(JSON.stringify({ "status": "error", "data": error }))
    }
})

app.post('/getBasicCompanyInfo', jsonParser, async function (req, res) {
    try {
        let company = req.body.company;
        await client.connect();
        let response = {}
        let cursor = await client.db("CIK").collection("data").findOne({
            "Company Name": { $eq: company },
        })

        try {
            delete cursor._id;
            delete cursor["8K"];
            delete cursor["10KQ"]
            res.end(JSON.stringify({ "status": "success", "data": cursor }));
        } catch (error) {
            res.end(JSON.stringify({ "status": "error", "data": error }))
        }
    } catch (error) {
        res.end(JSON.stringify({ "status": "error", "data": error }))
    }
})

app.post('/getCompanyForms', jsonParser, async function (req, res) {
    try {
        let company = req.body.company, year = req.body.year;
        await client.connect();
        let response = {}
        let cursor = await client.db("CIK").collection("data").findOne({
            "Company Name": { $eq: company },
        })

        try {
            let form1 = cursor["8K"], form2 = cursor["10KQ"];
            let data1 = [], data2 = [];
            for (var i in form1) {
                form1[i][1] = form1[i][1].split(" ")[0];
                if (form1[i][1].includes(year)) {
                    data1.push(form1[i]);
                }
            }
            for (var i in form2) {
                form2[i][1] = form2[i][1].split(" ")[0];
                if (form2[i][1].includes(year)) {
                    data2.push(form2[i]);
                }
            }
            res.end(JSON.stringify({ "status": "success", "data": {"8K": data1, "10KQ": data2} }));
        } catch (error) {
            res.end(JSON.stringify({ "status": "error", "data": error }))
        }
    } catch (error) {
        res.end(JSON.stringify({ "status": "error", "data": error }))
    }
})

app.post('/getAdditionalCompanyInfo', jsonParser, async function (req, res) {
    try {
        let year = req.body.year.toString(),
        cik = req.body.cik.toString(),
        quarter = req.body.quarter.toString();
        await client.connect();
        let cursor = await client.db(year).collection(cik).findOne({
            "quarter": { $eq: quarter },
        })
        try {
            delete cursor._id;
            delete cursor.quarter;
            res.end(JSON.stringify({ "status": "success", "data": cursor }));
        } catch (error) {
            res.end(JSON.stringify({ "status": "error", "data": error }))
        }
    } catch (error) {
        res.end(JSON.stringify({ "status": "error", "data": error }))
    }
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})