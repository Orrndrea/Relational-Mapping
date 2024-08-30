const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories
router.get('/', (req, res) => {
  Category.findAll({
    include: [{ model: Product }],
  })
    .then((categories) => res.json(categories))
    .catch((err) => res.status(500).json(err));
});

// GET one category by its `id` value
router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id, {
    include: [{ model: Product }],
  })
    .then((category) => {
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json(category);
    })
    .catch((err) => res.status(500).json(err));
});

// POST create a new category
router.post('/', (req, res) => {
  Category.create(req.body)
    .then((category) => res.status(201).json(category))
    .catch((err) => res.status(400).json(err));
});

// PUT update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      if (!category[0]) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json({ message: 'Category updated successfully' });
    })
    .catch((err) => res.status(400).json(err));
});

// DELETE a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json({ message: 'Category deleted successfully' });
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;

