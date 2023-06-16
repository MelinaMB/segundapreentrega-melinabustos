import express from "express";
import { CartService } from "../services/carts.service.js";

export const cartViewRouter = express.Router();

const Service = new CartService()

cartViewRouter.get('/carts/:cid', async (req, res) => {
    const cid = req.query.cid
    const carts = await Service.getCartById(cid);
    const cartById = carts
    let cart = cartById.map((doc) => {
        return {
            product: doc.product,
            quantity: doc.quantity
        }
    })
    return res.render("carts", cart )
})