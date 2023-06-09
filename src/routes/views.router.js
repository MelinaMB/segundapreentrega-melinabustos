import express from "express";
import ProductManager from "../DAO/ProductManager.js";
import { ProductModel } from "../DAO/models/products.model.js";
import { CartsModel } from "../DAO/models/carts.model.js";

const productManager = new ProductManager();

export const viewsRouter = express.Router();

viewsRouter.get('/', async (req, res) => { 
    const {limit} = (req.query) || 10;
    const {sort} = req.query ? { price: req.query.sort } : '';
    const {filtro} = req.query || '';
    const {page} = req.query; 
    const {busqueda} = req.query.busquedad || '';
    const allProducts = await ProductModel.paginate(filtro ? {[busqueda]: filtro} : {}, {limit: limit || 10, page: page,  sort: sort});
    const {docs, ...rest} = allProducts;
    
    let products = docs.map((doc) => {
        return {
            title: doc.title,
            description: doc.description,
            code: doc.code,
            price: doc.price,
            status: doc.satus,
            stock: doc.stock,
            category: doc.category,
            thumbnails: doc.thumbnails
        }
    })
    return res.render("home", { products, paginate: rest, });  
});

viewsRouter.get('/', async (req, res) => {
    const carts = await CartsModel.getAllCarts();
    return res.render("carts",  carts )
})

viewsRouter.get('/', async (req, res) => {
    const products = await productManager.getProduct();
    return res.render("realTimeProducts", { products });
    socketServer.emit('msg_back_to_front', {products});
});
