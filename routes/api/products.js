const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Products = require("../../models/Products");

//@route POST
router.post(
  "/",
  [
    check("name", "Name of the product is required").not().isEmpty(),
    check("description", "Please provide the description of the product")
      .not()
      .isEmpty(),
    check("price", "Please enter the price of the product").not().isEmpty(),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, price } = req.body;

    try {
      let product = await Products.findOne({ name });
      if (product) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Product already exists" }] });
      }

      product = new Products({
        name,
        description,
        price,
      });

      await product.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@route GET
//Get all products
router.get("/", async (req, res) => {
  try {
    const allProducts = await Products.find({});
    res.send(allProducts);
  } catch (err) {
    res.status(400).json({ errors: [{ msg: "Error retrieving products." }] });
  }
});

//@route Update product price
router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let updPrice = req.body.price;
    const updatePrice = await Products.findByIdAndUpdate(id, {
      price: updPrice,
    });
    res.send(updatePrice);
  } catch (err) {
    res
      .status(400)
      .json({ errors: [{ msg: "Error updating the price of the product." }] });
  }
});

module.exports = router;
