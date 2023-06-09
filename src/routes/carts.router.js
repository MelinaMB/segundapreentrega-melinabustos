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

cartsRouter.get("/", async (req, res) => {
    try {
        const carts = await Service.getAllCart();
        res.status(201).json(carts);
    } catch (error) {
        res.status(404).json({ message: "cart not found" });
    }
});

cartsRouter.get("/:cid", async (req, res) => {
    try {
        const idcart = req.params.cid;
        const cart = await Service.getCartById(idcart);
        res.status(201).json(cart);
    } catch (error) {
        res.status(404).json({ message: "cart not found" });
    }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    try {
        const idproduct = req.params.pid;
        const idcart = req.params.cid;
        const cart = await Service.postProdInCart(idcart, idproduct);
        res.status(200).json({
            status: "success",
            masg: "producto agregado",
            data: cart, idcart,
        });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

cartsRouter.delete("/:cid/product/:pid", async (req, res) => {
    try {
        const idproduct = req.params.pid;
        const idcart = req.params.cid;
        const cart = await Service.deleteOneProductById(idcart, idproduct);
        res.status(200).json({
            status: "success",
            masg: "producto eliminado",
            data: cart, idcart,
        });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

cartsRouter.delete("/:cid", async (req, res) => {
    try {
        
        const idcart = req.params.cid;
        const cart = await Service.deleteProducts(idcart);
        res.status(200).json({
            status: "success",
            masg: "producto eliminado",
            data: cart, idcart,
        });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});