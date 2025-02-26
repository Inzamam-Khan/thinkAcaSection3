const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/authMiddleware");

let products = []; // In-memory product store

// Create product
router.post("/", authenticateJWT, (req, res) => {
  const { name, price, description } = req.body;
  const newProduct = { id: products.length + 1, name, price, description };
  products.push(newProduct);

  res.status(201).json({ message: "Product created successfully", product: newProduct });
});

// Get all products
router.get("/", authenticateJWT, (req, res) => {
  res.status(200).json({ products });
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
