const {Products} = require("../models");

const createProduct = async(req, res) => {
    const {name, stock, price} = req.body;
    try {
        const newProduct = await Products.create({
            name,
            stock,
            price
        })
        res.status(201).json({
            status: "Success",
            message: "Success create new product",
            isSuccess: true,
            data: {
                newProduct
            }
        })
    } catch (error) {
        if(error.name === 'SequelizeValidationError'){
            const errorMessage = error.errors.map(err => err.message)
            return res.status(400).json({
                status: "Failed",
                message: errorMessage[0],
                isSuccess: true,
                data: null
            })
        }
        res.status(500).json({
            status: "Failed",
            message: error.message,
            isSuccess: true,
            data: null
        })
    }
}



module.exports = {
    createProduct,
};