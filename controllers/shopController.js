const { Shops } = require("../models");

const getAllShops = async (req, res) => {
  try {
    const shops = await Shops.findAll();
    res.status(200).json({
      status: "Success",
      message: "Success get all shops",
      isSuccess: true,
      data: {
        shops,
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

const getShopById = async (req, res) => {
  const { id } = req.params;
  try {
    const shop = await Shops.findOne({ where: { id: id } });
    res.status(200).json({
      status: "Success",
      message: "Success get shop by id",
      isSuccess: true,
      data: {
        shop,
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

const createShop = async (req, res) => {
  const { adminEmail, name, productId, userId } = req.body;
  try {
    const newShop = await Shops.create({
      adminEmail,
      name,
      productId,
      userId,
    });
    res.status(201).json({
      status: "Success",
      message: "Success create new shop",
      isSuccess: true,
      data: {
        newShop,
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

const updateShop = async (req, res) => {
  const { id } = req.params;
  const { adminEmail, name, productId, userId } = req.body;
  try {
    const shop = await Shops.findOne({ where: { id: id } });

    if (!shop) {
      return res.status(404).json({
        status: "Failed",
        message: "Shop not found",
        isSuccess: false,
        data: null,
      });
    }

    const updatedShop = await shop.update({
      adminEmail,
      name,
      productId,
      userId,
    });
    res.status(200).json({
      status: "Success",
      message: "Success update shop",
      isSuccess: true,
      data: {
        shop: {
          id: updatedShop.id,
          adminEmail: updatedShop.adminEmail,
          name: updatedShop.name,
          productId: updatedShop.productId,
          userId: updatedShop.userId,
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

const deleteShop = async (req, res) => {
  const { id } = req.params;

  try {
    const shop = await Shops.findOne({ where: { id: id } });

    if (!shop) {
      return res.status(404).json({
        status: "Failed",
        message: "Shop not found",
        isSuccess: false,
        data: null,
      });
    }

    await shop.destroy();

    res.status(200).json({
      status: "Success",
      message: "Success delete shop",
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
  getAllShops,
  getShopById,
  createShop,
  updateShop,
  deleteShop,
};
