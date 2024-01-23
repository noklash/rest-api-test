const { productPriceUnits } = require("../../config");
module.exports = {
  type: "object",
  properties: {
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
    images: {
      type: "array",
      items: {
        type: "string",
      }

    },
    price: {
      type: "number",
    },
    // priceUnit: {
    //   type: "string",
    //   enum: Object.values(productPriceUnits),
    // },
  },
  required: ["title", "description", "images", "price"],
  additionalProperties: false,
};