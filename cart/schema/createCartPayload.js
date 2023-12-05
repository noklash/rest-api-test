const { ObjectId } = require("mongodb");

module.exports = {
    // owner: "65662ac0c37ca380157c0e67",
   items: [{
    itemId: {
        type: "string",
    },
    quantity: {
        type: "number"
    }
   }],
   required: ["itemId", "quantity"]
}