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
    let carts = await CartsModel.find({});
    console.log(JSON.stringify(carts, null, 4))
    return carts;
  }

  async postProdInCart(_id) {
    let cart = await CartsModel.findOne({ _id: _id });
    if (cart) {
      const products = await ProductModel.findOne({ _id: _id });
      const encontrarProduct = products.find((producto) => producto.id == _id);
      if (encontrarProduct) {
        const prodCartExists = cart.products.find((prod) => prod.id == _id);
        if (prodCartExists) {
          prodCartExists.quantity++;
        } else {
          cart.products.push({
            id: _id,
            quantity: 1,
          });
        }
      }
      let res = await CartsModel.updateOne({ _id: _id }, cart);
      return res;
    }
  }

  async getCartById(_id) {
    let cart = await CartsModel.findOne({ _id: _id });
    return cart;
  }

  async deleteAllProduct(){

  }

  async deleteOneProductById(_id){

  }
}
