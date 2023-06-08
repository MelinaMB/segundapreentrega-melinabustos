import express from "express";
import CartManager from "../DAO/CartManager.js";

const path = "../cart.json";

export const cartsRouter = express.Router();

const cartManager = new CartManager(path);

cartsRouter.post("/", async (req, res) => {
    try {
        const cart = await cartManager.createCart();
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