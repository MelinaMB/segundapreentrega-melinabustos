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
    console.log(JSON.stringify(carts, null, 4));
    return carts;
  }

  async postProdInCart(cartId, productId) {
    let cart = await CartsModel.findOne({ _id: cartId});
    cart.products.push({ product: productId });
    let res = await CartsModel.updateOne({ _id: cartId }, cart)
    return res;
  }

  async getCartById(_id) {
    let cart = await CartsModel.findOne({ _id: _id })
    console.log(JSON.stringify(cart, null, 4));
    return cart;
  }


  async deleteOneProductById(_id) {
    let encontrarUnCarrito = await CartsModel.findOne({ _id: _id });
    if (encontrarUnCarrito) {
      let encontrarUnProducto = await ProductModel.findOneAndDelete({ _id: _id });
        return encontrarUnProducto;
      }
    }
  }

