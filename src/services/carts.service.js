import { CartsModel } from '../DAO/models/carts.model.js';
import { ProductModel } from '../DAO/models/products.model.js';

export class CartService {
  async createCart() {
    const created = CartsModel.create({
      products: [],
      quantity: 1,
    });
    return created;
  }

  async getAllCart() {
    let carts = await CartsModel.find({});
    console.log(JSON.stringify(carts, null, 4));
    return carts;
  }

  async postProdInCart(cartId, productId) {
    let cart = await CartsModel.findOne({ _id: cartId });
    if (cart) {
      let product = await ProductModel.findOne({ _id: productId });
      if (product) {
        const prodCart = cart.products.find((prod) => prod.product.id == productId);
        if (prodCart) {
          prodCart.quantity++;
        } else {
          cart.products.push({ product: productId, quantity: 1 });
        }
      }
    }

    let res = await CartsModel.updateOne({ _id: cartId }, cart);
    return res;
  }

  async getCartById(_id) {
    let cart = await CartsModel.findOne({ _id: _id });
    console.log(JSON.stringify(cart, null, 4));
    return cart;
  }

  async deleteOneProductById(cid, pid) {
    let cart = await CartsModel.findOne({ _id: cid });
    const productIndex = cart.products.findIndex((prod) => prod.product.id === pid);
    if (productIndex === -1) throw new Error('product not found');
    cart.products.splice(productIndex, 1);
    cart.save();
    return cart;
  }

  async deleteProducts(cartId) {
    const cart = await CartsModel.findOneAndUpdate({ _id: cartId }, {products: []});
    return cart;
  }

  async updateCart(cartId, prodList) {
      const catrUpdate = await CartsModel.findOneAndUpdate({ _id: cartId }, {products: prodList});
      return catrUpdate;
    
  }

  async updateCartProdQuantity(cartId, productId, quantity) {
    let cart = await CartsModel.findOne({ _id: cartId });
    if (cart) {
      let product = await ProductModel.findOne({ _id: productId });
      if (product) {
        const prodCart = cart.products.find((prod) => prod.product.id == productId);
        if (prodCart) {
          prodCart.quantity = quantity;
          let res = await CartsModel.updateOne({ _id: cartId }, cart);
        }
      }
    }

    return cart;
  }
}
