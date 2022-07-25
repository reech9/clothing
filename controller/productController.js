const Product = require("../models/productModel");

// get product
const getProduct = (req, res) => {
  Product.find({}, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });

  // res.send("this should get result");
};

// inserting product
const addProduct = (req, res) => {
  const brandName = req.body.brandName;
  const productName = req.body.productName;
  const productDescription = req.body.productDescription;
  const productPrice = req.body.productPrice;
  const rentPrice = req.body.rentPrice;
  const color = req.body.color;
  const size = req.body.size;
  const rentCategory = req.body.rentCategory;
  const imageFile = req.file;

  if (
    !brandName ||
    !productName ||
    !productDescription ||
    !productPrice ||
    !rentPrice ||
    !color ||
    !size ||
    !rentCategory
  ) {
    return res.json({ errorMessage: "All fields are required." });
  }

  if (!imageFile) {
    return res.json({ errorMessage: "Please upload the image." });
  }

  Product.findOne({ brandName })
    .then((data) => {
      if (data) {
        res.json({ errorMessage: "Product already exists" });
        return;
      }

      if (imageFile) {
        let basePath;

        const fileName = imageFile.filename;

        // req.get("host") ==> Domain Name

        if (req.get("host").includes("10.0.2.2")) {
          basePath = `${req.protocol}://${req

            .get("host")

            .replace("10.0.2.2", "localhost")}/upload/`;
        } else {
          basePath = `${req.protocol}://${req.get("host")}/upload/`;
        }
        const imageURL = basePath + fileName;

        const productData = new Product({
          brandName,
          productName,
          productDescription,
          productPrice,
          rentPrice,
          color,
          size,
          rentCategory,
          imageUrl: imageURL,
          userId: req.customerData._id,
        });

        productData
          .save()
          .then((data) => {
            res.json({ data });
          })
          .catch((err) => res.json({ message: `${err.message}` }));
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

// update products
const updateProduct = (req, res) => {
  const brandName = req.body.brandName;
  const productName = req.body.productName;
  const productDescription = req.body.productDescription;
  const productPrice = req.body.productPrice;
  const rentPrice = req.body.rentPrice;
  const color = req.body.color;
  const size = req.body.size;
  const rentCategory = req.body.rentCategory;

  Product.updateOne(
    { _id: req.customerData._id },
    {
      brandName,
      productName,
      productDescription,
      productPrice,
      rentPrice,
      color,
      size,
      rentCategory,
    }
  )
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      res.json({ message: `${err.message}` });
    });
};

// delete product
const deleteProduct = (req, res) => {
  const id = req.params.id;

  Product.findOne({ userId: req.customerData._id })
    .then((data) => {
      if (data === null) {
        res.send({ message: "Unauthorized access" });
        return;
      }

      Product.findByIdAndDelete(id)
        .then((response) => {
          res.send(response);
        })
        .catch((err) => {
          response.send(err);
        });
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = { addProduct, updateProduct, getProduct, deleteProduct };
