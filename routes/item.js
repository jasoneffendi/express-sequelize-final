var express = require('express');
var router = express.Router();
var models = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {
    models.Item.findAll()
    .then(Items => {
        res.render('items', { title: 'Items' , data_item: Items});
        // res.send(Items)
    })
});

router.get('/add', (req,res) => {
    res.render('addItem', {title: 'Halaman add Item'})
  })

router.post('/add', (req,res) => {
    models.Item.create({
      name: `${req.body.name}`,
      brand: `${req.body.brand}`,
      codeitem: `${req.body.codeitem}`,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .then( order => {
      res.redirect('/item')
    })
  })
//edit
router.get('/edit/:id/', (req, res) => {
    models.Item.findAll({
      where: {
        id: `${req.params.id}`
      }
    })
    .then( supplier => {
      res.render('itemEdit',{data_supplier: supplier})
    })
    .catch(err => {
      console.log(err);
    })
  })
  

  router.post('/edit/:id', (req, res) => {
    models.Item.update({
      name: `${req.body.name}`,
      brand: `${req.body.brand}`,
      codeitem: `${req.body.codeitem}`,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      where: {id: `${req.params.id}`}
  
    })
    .then(teacher => {
      res.redirect('/item')
    })
    .catch(err => {
      console.log(err);
    })
  })
//delete
  router.get('/delete/:id/', (req, res) => {
    models.Item.destroy({
      where: {
        id: `${req.params.id}`
      }
    })
    .then((row_deleted) => {
        console.log('DELETE SUCCESS');
        res.redirect('/item')
    })
    .catch(err => {
      console.log(err);
  
    })
  })


module.exports = router;
