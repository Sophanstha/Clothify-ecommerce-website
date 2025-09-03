import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    discountPrice: {
      type: Number,
    },
    sku: {
      type: String,
      unique: true,
    },
    countInStock: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    sizes: {
      type: [String],
      required: true,
    },
    colors: {
      type: [String],
      required: true,
    },
    collections: {
      type: String,
      required: true,
    },
    material: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Men", "Women", "Unisex"],
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        altText: {
          type: String,
        },
      },
    ],
    isfeature: {
      type: Boolean,
      // required: true,
    },
    isPublished: {
      type: Boolean,
      // required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReview: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    metaTitle: {
      type: String,
    },
    metaDescrition: {
      type: String,
    },
    metaKeywords: {
      type: String,
    },
    dimension: {
      width: Number,
      height: Number,
      length: Number,
    },
    weight: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
