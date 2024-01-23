const router = require("express").Router();


const uploadImage = require('./cloudinary');

router.post('/', async (req, res) => {
  const { path } = req.body;
  uploadImage( path);
});

module.exports = router;
