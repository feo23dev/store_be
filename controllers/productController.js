const ProductModel = require("../models/ProductModel");
const multer = require("multer");
const upload = multer({ dest: "public/img/products" });

class ProductController {
  constructor() {
    this.productModel = new ProductModel();
    this.getAllProducts = this.getAllProducts.bind(this);
    this.getProductById = this.getProductById.bind(this);
  }

  getAllProducts = async (req, res) => {
    try {
      const products = await this.productModel.getAllProducts();

      const formattedProducts = products.map((product) => {
        console.log("PRODUCT", product);
        const imagePath = "../public/images/products/" + product.image;
        return { ...product, image: imagePath };
      });

      res.status(200).json({ status: "success", data: formattedProducts });
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: error,
      });
    }
  };

  getProductById = async (req, res) => {
    const id = req.params.id;
    try {
      const product = await this.productModel.getProductById(id);
      console.log("REQUESTED PRODUCT", product);

      res.status(200).json({ status: "success", data: product });
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: error,
      });
    }
  };

  createNewProduct = async (req, res) => {
    const fileName = req.file.filename;
    req.body.image = fileName;
    console.log("REQ.BODY", req.body);
    console.log("REQ.FILE", req.file);

    const productData = req.body;
    try {
      const response = await this.productModel.createNewProduct(productData);
      res.status(201).json({ status: "success", data: response });
    } catch (error) {
      console.log("xd");
      console.log("ERROR", error);
    }
  };

  // uploadUserPhoto = upload.single("image");
}

module.exports = ProductController;
