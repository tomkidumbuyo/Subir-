const express = require('express');
const router = express.Router();
const {create, remove, get} = require('../controllers/card');

router.post('/card/create', async (req, res) => {
  console.log(req.body);
  create(req, res)
});
router.get('/card', get);
router.delete('/card/:id', remove);


module.exports = router;
