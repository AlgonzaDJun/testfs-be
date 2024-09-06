import type { Request, Response } from "express";
import { Product } from "../models/Product";

export const getProductById = async (req: Request, res: Response) => {
  const user = req.user as { id: string };
  const { id } = req.params;

  try {
    // check if product exist
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // check if product belong to the user
    if (product?.user_id?.toString() !== user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Get product by id",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const getProductByUser = async (req: Request, res: Response) => {
  const user = req.user as { id: string };

  try {
    const products = await Product.find({ user_id: user.id });

    res.status(200).json({
      success: true,
      message: "Get all products by user",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const user = req.user as { id: string };
  const { nama_produk, harga, deskripsi, stok, image } = req.body;

  try {
    // CHECK IF FIELD IS EMPTY
    if (!nama_produk || !harga || !deskripsi || !stok) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newProduct = new Product({
      user_id: user.id,
      nama_produk,
      harga,
      deskripsi,
      stok,
      image,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product created",
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const user = req.user as { id: string };
  const { id } = req.params;

  const { nama_produk, harga, deskripsi, stok, image } = req.body;

  try {
    const findProduct = await Product.findById(id);

    // check if product exist
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // check if field is empty
    if (!nama_produk || !harga || !deskripsi || !stok) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check if product belong to the user
    if (findProduct?.user_id?.toString() !== user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        nama_produk,
        harga,
        deskripsi,
        stok,
        image,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Product updated",
      data: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const user = req.user as { id: string };
  const { id } = req.params;

  try {
    const findProduct = await Product.findById(id);

    // check if product exist
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // check if product belong to the user
    if (findProduct?.user_id?.toString() !== user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};
