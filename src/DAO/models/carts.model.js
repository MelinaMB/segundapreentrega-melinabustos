import { Schema, model } from 'mongoose';
// import monsoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
    
    products: {
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: 'products',
          },
        },
      ],
      default: [],
    },
});
// schema.plugin(monsoosePaginate);
export const CartsModel = model('carts', schema);