import { CartsModel } from '../DAO/models/carts.model.js';
import { ProductModel } from '../DAO/models/products.model.js';

export class CartService {
  async createCart() {
    const created = CartsModel.create({
      products: [],
    });
    return created;
  }

  async getAllCart() {
    let carts = await CartsModel.find({}).populate('products.product')
    console.log(JSON.stringify(carts, null, 4))
    return carts;
  }

  async postProdInCart(_id) {
    const carts = await this.getCart();
        const cart = carts.find((cart) => cart.id === cartId);
        if (cart) {
            const products = await this.productManager.getProduct();
            const encontrarProduct = products.find((producto) => producto.id == productId);
            if (encontrarProduct) {
                const prodCartExists = cart.products.find((prod) => prod.id == productId);
                if (prodCartExists) {
                    prodCartExists.quantity++;
                } else {
                    cart.products.push({
                        id: productId, quantity: 1
                    });
                }
                const cartsJson = JSON.stringify(carts);
                await fs.promises.writeFile(this.path, cartsJson);
                return cart.products;
            } else {
                throw new Error('product not found');
            }

        }
  }

  async getCartById(_id) {
    let cart = await CartsModel.findOne({ _id: _id }).populate('products.product')
    return cart;
  }

  async deleteAllProduct(_id){
    let encontrarUnCarrito = await CartsModel.findOne({_id: _id});
    if (encontrarUnCarrito){
        
    }
  }

  async deleteOneProductById(_id){
    let encontrarUnCarrito = await CartsModel.findOne({_id: _id});
    if (encontrarUnCarrito){
        let encontrarUnProducto = await ProductModel.findOne({_id: _id});
        if(encontrarUnProducto){
            let deleteProduct = await CartsModel.deleteOne(encontrarUnProducto);
            return deleteProduct;
        }
    }
  }
}
