import mongoose from 'mongoose'

const productScheme = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0.0,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const ProductModel = mongoose.model('Product', productScheme)
export default ProductModel
