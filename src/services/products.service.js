import { ProductModel } from "../DAO/models/products.model.js";

export class ProductService {
    isValidProduct(product) {
        if (typeof product.title === 'undefined' || typeof product.description === 'undefined'
            || typeof product.price === 'undefined' || typeof product.code === 'undefined'
            || typeof product.stock === 'undefined' || typeof product.status === 'undefined' || typeof product.category === 'undefined'){
                throw new Error ('Product invalid')
            } 
    }

    async getAll(){
        const products = await ProductModel.find({});
        return products

    }

    async getProductLimit() {
        const products = await ProductModel.find({});
        const limit = prodlimit
        if (limit) {
            const productoslimitados = products.slice(0, limit)
            return productoslimitados;
        } 
    }

    async prodById(_id){
        const prod = await ProductModel.findOne( { _id: _id } );
        return prod;

    }

    async createOne(product){
       this.isValidProduct(product);
       const prodCreated = await ProductModel.create(product);
       return prodCreated;
        
    }

    async updateOne(_id, product){
        if (!_id) throw new Error('invalid_id');
        this.isValidProduct(product);
        const prodUpdate = await ProductModel.updateOne({_id: id}, {product});
        return prodUpdate;

    }

    async deleteOne(_id){
        const deleted = await ProductModel.deleteOne({_id: _id});
        return deleted;
    }
}
