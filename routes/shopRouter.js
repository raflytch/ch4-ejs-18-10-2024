const router = require("express").Router();

const Shop = require("./../controllers/shopController");

router.get("/", Shop.getAllShops);
router.get("/:id", Shop.getShopById);
router.post("/", Shop.createShop);
router.put("/:id", Shop.updateShop);
router.delete("/:id", Shop.deleteShop);

module.exports = router;
