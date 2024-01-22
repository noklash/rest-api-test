const router = require("express").Router();



const uploadImage = require("./cloudinary")

router.post(
    "/",
    uploadImage()
)

module.exports = router;