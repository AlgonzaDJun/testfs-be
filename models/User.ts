import { model, Schema, type InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    jenis_kelamin: {
      type: String,
      enum: ["L", "P"],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export type UserT = InferSchemaType<typeof userSchema>;

export const User = model("User", userSchema);
