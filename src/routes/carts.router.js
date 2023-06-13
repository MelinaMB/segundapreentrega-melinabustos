import express from "express";
import { CartService } from "../services/carts.service.js";
import { Types } from "mongoose";

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
            msg: "producto eliminado",
            data: cart, idcart,
        });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

cartsRouter.put('/:cid', (async (req, res) => {
    try {
        const idCart = req.params.cid;
        const newCartContent = req.body;
      const cartUpdate = await Service.updateCart(idCart, newCartContent);
      res.status(200).json({
        success: true,
        msg: "cart update",
        data: cartUpdate, idCart
      });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
  }))

  cartsRouter.put('/:cid/products/:pid', (async (req, res) => {
    try {
        const idCart = req.params.cid;
        const idProd = req.params.pid;
        const prodContent = req.body;
      const cartUpdate = await Service.updateCartProdQuantity(idCart, idProd, prodContent.quantity);
      res.status(200).json({
        success: true,
        msg: "cart update",
        data: cartUpdate, idCart
      });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
  }))