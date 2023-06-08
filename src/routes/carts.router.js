import express from "express";
import { CartService } from "../services/carts.service.js";

export const cartsRouter = express.Router();

const Service = new CartService();

cartsRouter.post("/", async (req, res) => {
    try {
        const cart = await Service.createCart();
        res.status(201).json(cart);
    } catch (error) {
        res.status(400).json({ message: "cart not created" });
    }
});

cartsRouter.get("/:cid", async (req, res) => {
    try {
        const idcart = req.params.cid;
        const cart = await cartManager.getCartById(idcart);
        res.status(201).json(cart);
    } catch (error) {
        res.status(404).json({ message: "cart not found" });
    }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    try {
        const idproduct = req.params.pid;
        const idcart = req.params.cid;
        const cart = await cartManager.postProductById(idcart, idproduct);
        res.status(200).json({
            status: "success",
            masg: "producto actualizado",
            data: cart, idcart,
        });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});