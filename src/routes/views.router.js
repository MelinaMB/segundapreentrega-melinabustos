import express from "express";
import ProductManager from "../DAO/ProductManager.js";
import { ProductModel } from "../DAO/models/products.model.js";


const productManager = new ProductManager();

export const viewsRouter = express.Router();

viewsRouter.get('/', async (req, res) => { 
    const limit = parseInt(req.query.limit)  || 10;
    const page = parseInt(req.query.page)  || 1; 
    const sort = req.query ? { price: req.query.sort } : '';
    let query = {};
    if(req.query.category) {
        query.category = req.query.category
    }
    if(req.query.title){
        query.title = req.query.title
    }
    if(req.query.description){
        query.description  = req.query.description
    }
    if(req.query.price){
        query.price  = req.query.price
    }
    const allProducts = await ProductModel.paginate(query, { limit, page, sort});
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
    const products = await productManager.getProduct();
    return res.render("realTimeProducts", { products });
    socketServer.emit('msg_back_to_front', {products});
});
