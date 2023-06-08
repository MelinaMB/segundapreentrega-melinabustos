import express from "express";
import ProductManager from "../DAO/ProductManager.js";

const productManager = new ProductManager();

export const viewsRouter = express.Router();

viewsRouter.get('/norealtime', async (req, res) => {
    const products = await productManager.getProduct();
    return res.render("home", { products });  
});

viewsRouter.get('/', async (req, res) => {
    const products = await productManager.getProduct();
    return res.render("realTimeProducts", { products });
    socketServer.emit('msg_back_to_front', {products});
});
