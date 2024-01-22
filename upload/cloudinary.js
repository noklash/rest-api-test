// Require the cloudinary library
const cloudinary = require('cloudinary').v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// Log the configuration
console.log(cloudinary.config());

/////////////////////////
// Uploads an image file
/////////////////////////
const uploadImage = async (req, res) => {
  const { path } = req.body;

  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    transformation: [{ width: 1000, height: 752, crop: "scale" }],
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(path, options);
    console.log(result);

    // Send a response back to the client with the public_id or other information
    res.status(200).json({ public_id: result.public_id, url: result.secure_url });
  } catch (error) {
    console.error(error);

    // Send an error response back to the client
    res.status(500).json({ error: "Failed to upload image to Cloudinary" });
  }
};

module.exports = uploadImage;
