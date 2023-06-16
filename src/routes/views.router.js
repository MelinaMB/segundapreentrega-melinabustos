import express from "express";
import ProductManager from "../DAO/ProductManager.js";
import { ProductModel } from "../DAO/models/products.model.js";
import { CartService } from "../services/carts.service.js";


const productManager = new ProductManager();

const cartService = new CartService()

export const viewsRouter = express.Router();

viewsRouter.get('/products', async (req, res) => { 
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
            _id: doc._id.toString(),
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



viewsRouter.get('/realTimeProducts', async (req, res) => {
    const products = await productManager.getProduct();
    return res.render("realTimeProducts", { products });
    socketServer.emit('msg_back_to_front', {products});
});

viewsRouter.get("/carts/:cid", async (req, res, next) => {
    try {
      const { cid } = req.params;
      const cart = await cartService.getCartById(cid);
  
      const simplifiedCart = cart.products.map((item) => {
        return {
          title: item.product.title,
          price: item.product.price,
          quantity: item.quantity,
        };
      });
      console.log(simplifiedCart);
      res.render("carts", { cart: simplifiedCart });
    } catch (error) {
      next(error);
    }
  });

  viewsRouter.get("/products/:pid", async (req, res, next) => {
    try {
      const { pid } = req.params;
      const product = await ProductModel.findById(pid);
      const productSimplificado = {
        _id: product._id.toString(),
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnails,
        code: product.code,
        stock: product.stock,
        category: product.category,
      };
  
      console.log(productSimplificado);
      res.render("product", { product: productSimplificado });
    } catch (error) {
      next(error);
    }
  });