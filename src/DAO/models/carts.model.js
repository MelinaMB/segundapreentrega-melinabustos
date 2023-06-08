import { Schema, model } from 'mongoose';
// import monsoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
  title: {
    type: String,
    required: true,
    max: 100,
  },
  description: {
    type: String,
    required: true,
    max: 100,
  },
  code: {
    type: String,
    required: true,
    max: 100,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    max: 100,
  },
  status: {
    type: String,
    required: true,
    max: 100,
  },
  stock: {
    type: Number,
    required: true,
    max: 100,
  },
  category: {
    type: String,
    required: true,
    max: 100,
  },
  thumbnails: {
    type: String,
    required: true,
    max: 100,
  },
});
// schema.plugin(monsoosePaginate);
export const CartsModel = model('carts', schema);