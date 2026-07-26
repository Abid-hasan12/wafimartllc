import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add product name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add product description'],
    },
    price: {
      type: Number,
      required: [true, 'Please add product price'],
      default: 0.0,
    },
    image: {
      type: String, // এখানে ইমেজের ইউআরএল বা পাথ থাকবে
      required: [true, 'Please add an image URL'],
    },
    category: {
      type: String,
      required: [true, 'Please add product category'],
      trim: true,
    },
    stock: {
      type: Number,
      required: [true, 'Please add stock count'],
      default: 0,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;