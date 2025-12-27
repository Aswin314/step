import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  Name: {
    type: String,
    required: [true, "Please enter the product"],
    trim: true,
  },
  Description: {
    type: String,
    required: [true, "Please enter the description"],
  },
  Price: {
    type: Number,
    required: [true, "Please enter the Price"],
    maxlength: [7, "max length is 7"],
  },
  Rating: {
    type: Number,
    default: 0,
  },
  Image: [
    {
      Public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  Category: {
    type: String,
    required: [true, "Please enter the category"],
  },
  Stock: {
    type: Number,
    required: [true, "Please enter the stock"],
    maxlength: [7, "max length is 7"],
    default: 1,
  },
  numofReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: String,
        required: true,
      },
      comments: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Products = mongoose.model("Products", ProductSchema);

export default Products;
