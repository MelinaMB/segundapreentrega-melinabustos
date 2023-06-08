import express from "express";
import { ProductService } from "../services/products.service.js";

export const productsRouter = express.Router();

const Service = new ProductService();

productsRouter.get("/", async (req, res) => {
    try {
        const products = await Service.getAll();
        return res.status(200).json({
            status: "success",
            msg: "listado de productos",
            data: products,
        });
    } catch (error) {
        res.status(400).json({
            message: "error",
            data: {},
        });
    }
})
// 
productsRouter.get("/", async (req, res) => {
    try {
        const prodlimit = req.query.limit;
        const prod = await Service.getProductLimit(prodlimit);
        return res.status(200).json({
            status: "success",
            msg: "listado de productos",
            data: prod,
        });
    } catch (error) {
        res.status(400).json({
            message: "error",
            data: {},
        });
    }
});

productsRouter.get("/:pid", async (req, res) => {
    try {
        const id = req.params.pid;
        const prodById = await Service.prodById(id);
        return res.status(200).json({
            status: "success",
            msg: "producto por id obtenido",
            data: prodById,
        })
    } catch (error) {
        res.status(400).json({ 
            message: "error",
            data: {},
        });
    }
});

productsRouter.post('/', async (req, res) => {
    try {
        
        const product = req.body;
        const prodCreated = await Service.createOne(product);
        return res.status(201).json({
            status: "success",
            msg: "product created",
            data: prodCreated,
          });
    } catch (error) {
        console.log(error);
        res.status(400).json({ 
            message: "error",
            data: {},
         });
    };
});

productsRouter.put('/:pid', async (req, res) => {
    try {
        const id = req.params.pid;
        const upDate = req.body;
        const prodUpdate = await Service.updateOne(id, upDate)
        return res.status(201).json({
            status: "success",
            msg: "user uptaded",
            data: prodUpdate,
          });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

productsRouter.delete('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
        const proddeleted = await Service.deleteOne(productId);
        return res.status(201).json({
            status: "success",
            masg: "producto borrado",
            data: proddeleted,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

