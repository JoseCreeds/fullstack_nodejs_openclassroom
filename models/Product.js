const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, required: true }
  })


// QUIZ

// app.post('/api/products', (req, res, next) => {
//   delete req.body._id;quels backend pourrait-on mettre pour un theme du genre
//   const product = new Product({
//     ...req.body
//   });
//   product.save()
//   .then(product => res.status(201).json({product: product}))
//   .catch(error => res.status(400).json({error}));
// });

// app.put('/api/products/:id', (req, res, next) => {
//   Product.updateOne({_id : req.params.id}, {...req.body, _id : req.params.id })
//   .then(() => res.status(200).json({message : 'Modified !'}))
//   .catch(error => res.status(400).json({error}));
// });

// app.delete('/api/products/:id', (req, res, next) => {
//   Product.deleteOne({_id: req.params.id})
//   .then(() => res.status(200).json({message : 'Deleted !'}))
//   .catch(error => res.status(400).json({error}));
// });

// app.get('/api/products/:id', (req, res, next) => {
//   Product.findOne({_id: req.params.id})
//   .then(product => res.status(200).json({product: product}))
//   .catch(error => res.status(404).json(error));
// });

// app.get('/api/products', (req, res, next) => {
//   Product.find()
//   .then(products => res.status(200).json({products: products}))
//   .catch(error => res.status(400).json({error}));
// });

module.exports = mongoose.model('Product', productSchema);