const express = require("express");
const router = express.Router();
const Products = require("../../models/Products");

//Get products by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const findById = await Products.findById(id);
    res.send(findById);
  } catch (err) {
    res
      .status(400)
      .json({ errors: [{ msg: "Error retrieving the product." }] });
  }
});

module.exports = router;
