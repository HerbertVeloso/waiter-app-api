import { Request, Response } from 'express';
import { Product } from '../../models/Product';

export async function createProduct(req: Request, res: Response) {
  try {
    const imagePath = req.file?.filename;
    const { name, description, price, category, ingredients } = req.body;

    const formattedIngredients = ingredients ? JSON.parse(ingredients) : [];

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      imagePath,
      ingredients: formattedIngredients,
    });

    res.json(product);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
