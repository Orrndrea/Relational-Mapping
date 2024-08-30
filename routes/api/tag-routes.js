const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags
router.get('/', (req, res) => {
  Tag.findAll({
    include: [{ model: Product }],
  })
    .then((tags) => res.json(tags))
    .catch((err) => res.status(500).json(err));
});

// GET one tag by its `id`
router.get('/:id', (req, res) => {
  Tag.findByPk(req.params.id, {
    include: [{ model: Product }],
  })
    .then((tag) => {
      if (!tag) {
        return res.status(404).json({ message: 'Tag not found' });
      }
      res.json(tag);
    })
    .catch((err) => res.status(500).json(err));
});

// POST create a new tag
router.post('/', (req, res) => {
  Tag.create(req.body)
    .then((tag) => res.status(201).json(tag))
    .catch((err) => res.status(400).json(err));
});

// PUT update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => {
      if (!tag[0]) {
        return res.status(404).json({ message: 'Tag not found' });
      }
      res.json({ message: 'Tag updated successfully' });
    })
    .catch((err) => res.status(400).json(err));
});

// DELETE one tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: 'Tag not found' });
      }
      res.json({ message: 'Tag deleted successfully' });
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
