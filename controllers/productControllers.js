const { Products } = require("../models");

const createProduct = async (req, res) => {
  const { name, stock, price } = req.body;
  try {
    const newProduct = await Products.create({
      name,
      stock,
      price,
    });
    res.status(201).json({
      status: "Success",
      message: "Success create new product",
      isSuccess: true,
      data: {
        newProduct,
      },
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errorMessage = error.errors.map((err) => err.message);
      return res.status(400).json({
        status: "Failed",
        message: errorMessage[0],
        isSuccess: true,
        data: null,
      });
    }
    res.status(500).json({
      status: "Failed",
      message: error.message,
      isSuccess: true,
      data: null,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Products.findAll();
    res.status(200).json({
      status: "Success",
      message: "Success get all products",
      isSuccess: true,
      data: {
        products,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
      isSuccess: true,
      data: null,
    });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Products.findOne({ where: { id: id } });
    res.status(200).json({
      status: "Success",
      message: "Success get product by id",
      isSuccess: true,
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
      isSuccess: true,
      data: null,
    });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, stock, price } = req.body;
  try {
    const product = await Products.findOne({ where: { id: id } });

    if (!product) {
      return res.status(404).json({
        status: "Failed",
        message: "Product not found",
        isSuccess: false,
        data: null,
      });
    }

    const updatedProduct = await product.update({
      name,
      stock,
      price,
    });

    res.status(200).json({
      status: "Success",
      message: "Success update product",
      isSuccess: true,
      data: {
        product: {
          id: updatedProduct.id,
          name: updatedProduct.name,
          stock: updatedProduct.stock,
          price: updatedProduct.price,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
      isSuccess: true,
      data: null,
    });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Products.findOne({ where: { id: id } });

    if (!product) {
      return res.status(404).json({
        status: "Failed",
        message: "Product not found",
        isSuccess: false,
        data: null,
      });
    }

    await product.destroy();

    res.status(200).json({
      status: "Success",
      message: "Success delete product",
      isSuccess: true,
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
      isSuccess: true,
      data: null,
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
