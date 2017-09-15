var express = require('express');
var router = express.Router();
var models = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {
    models.Suppliers.findAll({
        include : [{model: models.Item}]
    })
    .then(suppliers => {
        res.render('suppliers', { title: 'Suppliers' , data_supplier: suppliers});
        // res.send(suppliers)
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

//add Item
router.get('/:id/addItem', (req, res) => {
    models.Suppliers.findAll({
      where: {
        id: `${req.params.id}`
      }
    })
    .then( supplier => {
        models.Item.findAll()
        .then(item => {
            res.render('addSupplierItem', {data_supplier: supplier, data_item: item})
        })
        .catch(err => {
            console.log(err);
          })
    })
    .catch(err => {
      console.log(err);
    })
  })

//   router.post('/:id/addItem', (req, res) => {
//     models.SupplierItem.create({
//       SupplierId: `${req.params.id}`,
//       ItemId: `${req.body.ItemId}`,
//       Price: `${req.body.Price}`,
//       createdAt: new Date(),
//       updatedAt: new Date()
//     })
//     .then(() => {
//       res.redirect('/supplier')
//     // res.send()
//     })
//     .catch(err => {
//       console.log(err);
//     })
//   })

  router.post('/:id/addItem', (req,res) => {
      models.SupplierItem.create({
          SupplierId: `${req.params.id}`,
          ItemId: `${req.body.ItemId}`,
          Price: `${req.body.Price}`,
          createdAt: new Date(),
          updatedAt: new Date()
      })
      .then(() => {
          res.send('Halo')
      })
      .catch(err => {
          console.log(err)
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
