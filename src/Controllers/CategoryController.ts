import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express'
import { Exception } from '../Exceptions/BaseException';

const prisma = new PrismaClient()

class CategoryController {
  async create(req: Request, res: Response) {
    const { name } = req.body;

    if (!name) {
      throw new Exception("incorret Data!", 400);
    }

    const category = await prisma.category.create({
      data: {
        name
      },
    });

    res.status(201).json(category);
  };

  async index(req: Request, res: Response) {
    const categories = await prisma.category.findMany();

    res.status(200).json(categories);
  };

  async show(req: Request, res: Response) {
    const id = Number(req.params.id);

    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new Exception("Category not found!", 404);
    }

    res.status(200).json(category);
  };

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (!name) {
      throw new Exception("incorret Data!", 400);
    }

    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new Exception("Category not found!", 404);
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name },
    });

    res.status(200).json(updatedCategory);
  };

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    const category = await prisma.category.delete({ where: { id } });

    res.status(200).json(category);
  };
}

export default CategoryController;