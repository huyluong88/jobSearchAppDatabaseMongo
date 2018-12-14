var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');

//specifies the database
let url = 'mongodb://localhost:27017/test';
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/get-data', (req, res, next) => {
  let resultArray = [];
  mongo.connect(url, (err, db) => {
    assert.equal(null, err);
    //find gets all entries for a collection
    let cursor = db.db().collection('users').find();
    cursor.forEach((doc, err) => {
      assert.equal(null, err)
      resultArray.push(doc);
    }, () => {
      db.close();
      //pass in the retrieved info
      return res.json(resultArray);
    })
  })
})

router.post('/insert', (req, res, next) => {
  let jobItem = {
    jobTitle: req.body.jobTitle,
    user: req.body.user,
  }
  mongo.connect(url, (err, db) => {
    assert.equal(null, err);
    //insert a collection with data
    db.db().collection('users').insertOne(jobItem, (err, result) => {
      assert.equal(null, err);
      return res.sendStatus(201);
      db.close();
    })
  })
})

module.exports = router;
