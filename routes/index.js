const router = require("express").Router();

const productControllers = require("../controllers/productControllers");

router.post("/api/v1/products", productControllers.createProduct);

module.exports = router;