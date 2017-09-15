var express = require('express');
var router = express.Router();
var models = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {
    models.Items.findAll()
    .then(Items => {
        res.render('Items', { title: 'Items' , data_supplier: Items});
    })
});

router.get('/add', (req,res) => {
    res.render('addSupplier', {title: 'Halaman add Supplier'})
  })

router.post('/add', (req,res) => {
    models.Items.create({
      name: `${req.body.name}`,
      brand: `${req.body.brand}`,
      codeitem: `${req.body.codeitem}`,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .then( order => {
      res.redirect('/supplier')
    })
  })
//edit
router.get('/edit/:id/', (req, res) => {
    models.Items.findAll({
      where: {
        id: `${req.params.id}`
      }
    })
    .then( supplier => {
      res.render('supplierEdit',{data_supplier: supplier})
      // res.send(student)
    })
    .catch(err => {
      console.log(err);
    })
  })
  

  router.post('/edit/:id', (req, res) => {
    models.Items.update({
      name: `${req.body.name}`,
      brand: `${req.body.brand}`,
      codeitem: `${req.body.codeitem}`,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      where: {id: `${req.params.id}`}
  
    })
    .then(teacher => {
      res.redirect('/supplier')
    })
    .catch(err => {
      console.log(err);
    })
  })
//delete
  router.get('/delete/:id/', (req, res) => {
    models.Items.destroy({
      where: {
        id: `${req.params.id}`
      }
    })
    .then((row_deleted) => {
        console.log('DELETE SUCCESS');
        res.redirect('/supplier')
    })
    .catch(err => {
      console.log(err);
  
    })
  })


module.exports = router;
