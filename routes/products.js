const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/authMiddleware");

let products =  [
  {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQI2yaBrsOhg60x5FPzVUiINeZVKQdCQn58PkSVcFW-htMNxKHmDlWa2sHDc814ubs5q8zKmxyxZDaJv9EfY2zUeIZTfe2NLXxmpz3xKDLa3oUoybYwyZbD",
      description:""
  },
  {
      id: 2,
      name: "Smartphone",
      price: 699.99,
      image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTsBWunD-FRAmru16_81zVYOXOW5gRr5yYpL-bLUdJ2PKJXBjwwYXQGHLXbFtlXxMCu_G4UZMKajbfRDqcE-3d3te136O0sABRCqbzB1iADEhdTHWiH_JZfGEQ",
      description:""
  },
  {
      id: 3,
      name: "Laptop",
      price: 1299.99,
      image: "https://rukminim2.flixcart.com/image/1200/1200/xif0q/computer/i/j/l/a324-45-thin-and-light-laptop-acer-original-imah6gfdkf2m5rjf.jpeg",
      description:""
  },
  {
      id: 4,
      name: "Smartwatch",
      price: 199.99,
      image: "https://rukminim2.flixcart.com/image/416/416/xif0q/smartwatch/s/i/u/-original-imah76jt64ffmwg4.jpeg?q=70&crop=false",
      description:""
  },
  {
      id: 5,
      name: "Gaming Console",
      price: 499.99,
      image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRa8u-wY3u6vi5fx7dmRGzZK7JzPPmoWJR94LmZf5ecgFCc662v5-TZJj3EUjI8UaGB_etGFB7uiLYB48p4Vl8Y62H5ndGB0HxAdciPCEA",
      description:""
  },
  {
      id: 6,
      name: "Mechanical Keyboard",
      price: 89.99,
      image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQd3CcNlyz7VcYXI76DnDqd8VFFZVosP2X-R_bT67iN2OrtS5uQPjju96dTtF_FOhaotYqYSkoCOgS5SqTLrd0CISCtvyMZ2dViDe6cAY7ESGZbpW70As2WKDE",
      description:""
  },
];// In-memory product store

// Create product
router.post("/", authenticateJWT, (req, res) => {
  const { name, price, description } = req.body;
  const newProduct = { id: products.length + 1, name, price, description };
  products.push(newProduct);

  res.status(201).json({ message: "Product created successfully", product: newProduct });
});

// Get all products
router.get("/", authenticateJWT, (req, res) => {
  res.status(200).json(products);
});

// Update product
router.put("/:id", authenticateJWT, (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.name = name || product.name;
  product.price = price || product.price;
  product.description = description || product.description;

  res.status(200).json({ message: "Product updated successfully", product });
});

// Delete product
router.delete("/:id", authenticateJWT, (req, res) => {
  const { id } = req.params;
  
  const productIndex = products.findIndex(p => p.id === parseInt(id));

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products.splice(productIndex, 1);
  res.status(200).json({ message: "Product deleted successfully" });
});

module.exports = router;
