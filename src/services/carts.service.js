import { CartsModel } from "../DAO/models/carts.model.js";

export class CartService {
    async createCart(){
        const created = CartsModel.create({

            products: [],
          }); 
          return created;
    }
}