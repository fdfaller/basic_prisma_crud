import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express'
import { Exception } from '../Exceptions/BaseException';

const prisma = new PrismaClient()

class PersonController {
  async create(req: Request, res: Response) {
    const { name } = req.body;

    if (!name) {
      throw new Exception("incorret Data!", 400);
    }

    const person = await prisma.person.create({
      data: {
        name
      },
    });

    res.status(201).json(person);
  };

  async index(req: Request, res: Response) {
    const people = await prisma.person.findMany();

    res.status(200).json(people);
  };

  async show(req: Request, res: Response) {
    const id = Number(req.params.id);

    const person = await prisma.person.findUnique({ where: { id } });
    if (!person) {
      throw new Exception("Person not found!", 404);
    }

    res.status(200).json(person);
  };

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (!name) {
      throw new Exception("incorret Data!", 400);
    }

    const person = await prisma.person.findUnique({ where: { id } });
    if (!person) {
      throw new Exception("Person not found!", 404);
    }

    const updatedPerson = await prisma.person.update({
      where: { id },
      data: { name },
    });

    res.status(200).json(updatedPerson);
  };

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    const person = await prisma.person.delete({ where: { id } });

    res.status(200).json(person);
  };
}

export default PersonController;