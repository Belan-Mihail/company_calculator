import { Request, Response } from "express";
import ServiceProductModel from "../models/Product";

// Create a new product
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      product_name,
      product_price,
      product_quantity,
      product_quantityInStock,
    } = req.body;
    const newProduct = new ServiceProductModel({
      product_name,
      product_price,
      product_quantity,
      product_quantityInStock,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get all products
export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await ServiceProductModel.find();
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get product by ID
export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await ServiceProductModel.findById(req.params.id);
    if (!product) {
      res.status(400).json({ message: "Product not found" });
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Product
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      product_name,
      product_price,
      product_quantity,
      product_quantityInStock,
    } = req.body;
    const product = await ServiceProductModel.findByIdAndUpdate(
      req.params.id,
      {
        product_name,
        product_price,
        product_quantity,
        product_quantityInStock,
      },
      { new: true }
    );
    if (!product) {
        res.status(400).json({ message: 'Product not found'})
        return
    }
    res.json(product)
  } catch (error) {
    res.status(400).json({ message: error.message})
  }
};

// Delete Product
export const deleteProduct = async (req: Request, res: Response) : Promise<void> => {
    try {
        const product = await ServiceProductModel.findByIdAndDelete(req.params.id)
        if (!product) {
            res.status(400).json({ message: 'Product not found'})
            return
        }
        res.json({message: 'The product has been successfully deleted.'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}