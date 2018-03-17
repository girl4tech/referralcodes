// variables
const express = require ('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://money:hello18@ds261678.mlab.com:61678/moolah', (err, client) =>{
  if (err) return console.log(err)
  db = client.db('moolah')
  app.listen(3000, () =>{
    console.log('listening on 3000')
  })
})

app.set('view engine', 'ejs')
//url encoded is a method within body-parser that tells BP
//to extract data from the form element and add
//this to the body property in the request object
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', function(req, res) {
  var cursor = db.collection('referrals').find()
  cursor.toArray(function(err, result){
    if (err) return console.log(err)
    // console.log(results)
    res.render('index.ejs', {referrals: result})
  })
  // res.sendFile('/Users/KDor/Desktop/moolah' + '/index.html')
})

app.post('/referrals', (req, res) => {
  db.collection('referrals').save(req.body, (err, result) =>{
    if (err) return console.log(err)
    console.log('saved to database');
    res.redirect('/')
  })
})
