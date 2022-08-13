import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express'
import { Exception } from '../Exceptions/BaseException';

const prisma = new PrismaClient()

class CashFlowController {
  async create(req: Request, res: Response) {
    const { name, description, value, date, type, personId, categoryId } = req.body;

    if (!name || !description || !value || !date || !type || !personId || !categoryId) {
      throw new Exception("incorret Data!", 400);
    }

    const person = await prisma.person.findUnique({ where: { id: personId } });
    if (!person) {
      throw new Exception("Person not found!", 404);
    }

    const category = await prisma.category.findUnique({ where: { id: categoryId } });
    if (!category) {
      throw new Exception("Category not found!", 404);
    }

    const cashFlow = await prisma.cashFlow.create({
      data: {
        name,
        description,
        value,
        date: new Date(date),
        type,
        personId,
        categoryId
      },
    });

    res.status(201).json(cashFlow);
  };

  async index(req: Request, res: Response) {
    const cashFlows = await prisma.cashFlow.findMany({
      include: {
        person: { select: { name: true } },
        category: { select: { name: true } },
      }
    });

    res.status(200).json(cashFlows);
  };

  async show(req: Request, res: Response) {
    const id = Number(req.params.id);

    const cashFlow = await prisma.cashFlow.findUnique({
      where: { id },
      include: {
        person: { select: { name: true } },
        category: { select: { name: true } },
      }
    });

    if (!cashFlow) {
      throw new Exception("CashFlow not found!", 404);
    }

    res.status(200).json(cashFlow);
  };

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { name, description, value, date, type, personId, categoryId } = req.body;

    if (!name || !description || !value || !date || !type || !personId || !categoryId) {
      throw new Exception("incorret Data!", 400);
    }

    const cashFlow = await prisma.cashFlow.findUnique({where: { id }});
    if (!cashFlow) {
      throw new Exception("CashFlow not found!", 404);
    }

    const person = await prisma.person.findUnique({ where: { id: personId } });
    if (!person) {
      throw new Exception("Person not found!", 404);
    }

    const category = await prisma.category.findUnique({ where: { id: categoryId } });
    if (!category) {
      throw new Exception("Category not found!", 404);
    }

    const updatedCashFlow = await prisma.cashFlow.update({
      where: { id },
      data: {
        name,
        description,
        value,
        date: new Date(date),
        type,
        personId,
        categoryId
      },
    });

    res.status(200).json(updatedCashFlow);
  };

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    const cashFlow = await prisma.cashFlow.delete({ where: { id } });

    res.status(200).json(cashFlow);
  };
}

export default CashFlowController;