var express = require('express');
var router = express.Router();
var models = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {
    models.Suppliers.findAll()
    .then(suppliers => {
        res.render('suppliers', { title: 'Suppliers' , data_supplier: suppliers});
    })
});

router.get('/add', (req,res) => {
    res.render('addSupplier', {title: 'Halaman add Supplier'})
  })

router.post('/add', (req,res) => {
    models.Suppliers.create({
      name: `${req.body.name}`,
      kota: `${req.body.kota}`,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .then( order => {
      res.redirect('/supplier')
    })
  })
//edit
router.get('/edit/:id/', (req, res) => {
    models.Suppliers.findAll({
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
    models.Suppliers.update({
      name: `${req.body.name}`,
      kota: `${req.body.kota}`,
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
    models.Suppliers.destroy({
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
