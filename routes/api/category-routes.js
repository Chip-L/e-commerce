const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryList = await Category.findAll({
      include: [{ model: Product }],
    });
    if (categoryList.length === 0) {
      res.status(404).json({ message: "No tags found." });
      return;
    }
    res.status(200).json(categoryList);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Check server logs" });
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryList = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (categoryList.length === 0) {
      res.status(404).json({ message: "No tags found." });
      return;
    }
    res.status(200).json(categoryList);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Check server logs" });
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    if (!req.body.category_name) {
      res.status(406).json({ message: "category_name cannot be NULL." });
      return;
    }
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Check server logs" });
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    if (!req.body.category_name) {
      res.status(406).json({ message: "category_name cannot be NULL." });
      return;
    }
    const newCategory = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(newCategory);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Check server logs" });
  }
});

// this only deletes if there are no relations
router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: { id: req.params.id },
    });
    if (deletedCategory === 0) {
      res.status(400).json({ error: "item did not exist." });
      return;
    }
    res.status(200).json(deletedCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Check server logs" });
  }
});

module.exports = router;
