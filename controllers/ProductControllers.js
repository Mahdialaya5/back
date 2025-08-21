const Product = require('../models/product')

exports.AddProduct = async (req, res) => {
    try {
        const NewProduct = new Product(req.body)
        NewProduct.Image = `${req.protocol}://${req.get("host")}/${req.file.path}`
        await NewProduct.save()
      
        return res.status(201).send({ msg: 'Product created' })

    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}
exports.GetProducts=async(req,res)=>{
try {
    const Products=await Product.find()
    return res.status(200).send(Products)
} catch (error) {
    return res.status(500).send({ msg: error.message })
}
}