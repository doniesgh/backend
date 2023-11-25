const Product = require('./../models/produitModel');

// Create a new product
exports.createProduct = (req, res) => {
    const { name, description, price, category,pic } = req.body;
  
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      pic
    });
  
    newProduct.save((err, product) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).json(product);
    });
  };
  
  // Get a list of all products
  exports.getAllProducts = (req, res) => {
    Product.find({}, (err, products) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(products);
    });
  };
  
  // Get a single product by ID
  exports.getProductById = (req, res) => {
    const productId = req.params.id;
    Product.findById(productId, (err, product) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!product) {
        return res.status(404).send('Product not found');
      }
      res.json(product);
    });
  };
  
  // Update a product by ID
  exports.updateProduct = (req, res) => {
    const productId = req.params.id;
    const { name, description, price, category ,pic} = req.body;
  
    Product.findByIdAndUpdate(
      productId,
      { name, description, price, category,pic },
      { new: true },
      (err, product) => {
        if (err) {
          return res.status(500).send(err);
        }
        if (!product) {
          return res.status(404).send('Product not found');
        }
        res.json(product);
      }
    );
  };
  
  // Delete a product by ID
  exports.deleteProduct = (req, res) => {
    const productId = req.params.id;
    Product.findByIdAndDelete(productId, (err, product) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!product) {
        return res.status(404).send('Product not found');
      }
      res.send('Product deleted successfully');
    });
  };
  