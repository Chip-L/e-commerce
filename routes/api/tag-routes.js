const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagList = await Tag.findAll({
      include: [{ model: Product }],
    });
    if (tagList.length === 0) {
      res.status(404).json({ message: "No tags found." });
      return;
    }
    res.status(200).json(tagList);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagList = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (tagList.length === 0) {
      res.status(404).json({ message: "No tags found." });
      return;
    }
    res.status(200).json(tagList);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tag = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(tag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = Tag.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json(deletedTag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
