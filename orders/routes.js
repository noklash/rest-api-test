const router = require("express").Router();


const isAuthenticatedMiddleware = require("./../common/middlewares/IsAuthenticatedMiddleware");

router.get("/orders", 
        [   
            isAuthenticatedMiddleware
        ], async (req, res) => {
            const owner = req.user.userId;
            try {
                const order = await Order.find({owner: owner }).sort({ date: -1});
                res.status(200).send(order)
            }catch (error){
                res.status(500).send()
            }
            })