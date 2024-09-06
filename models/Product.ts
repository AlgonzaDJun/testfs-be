import { model, Schema, type InferSchemaType } from "mongoose";

const productSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    nama_produk: {
      type: String,
      required: true,
    },
    harga: {
      type: Number,
      required: true,
    },
    deskripsi: {
      type: String,
      required: true,
    },
    stok: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export type ProductT = InferSchemaType<typeof productSchema>;

export const Product = model("Product", productSchema);