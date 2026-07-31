import { Request, Response } from 'express';
import { prisma } from '../config/db';

export class EvenementsController {
  static async getEvents(req: Request, res: Response) {
    try {
      const events = await prisma.event.findMany({
        where: { published: true },
        orderBy: { eventDate: 'asc' },
      });
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des événements.' });
    }
  }

  static async createEvent(req: Request, res: Response) {
    try {
      const { title, description, location, eventDate, category } = req.body;
      const event = await prisma.event.create({
        data: {
          title,
          description,
          location,
          eventDate: new Date(eventDate),
          category: category || 'GENERAL',
        },
      });
      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la création de l'événement." });
    }
  }

  static async updateEvent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description, location, eventDate, category, published } = req.body;

      const event = await prisma.event.update({
        where: { id },
        data: {
          title,
          description,
          location,
          eventDate: eventDate ? new Date(eventDate) : undefined,
          category,
          published,
        },
      });

      res.json(event);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la mise à jour de l'événement." });
    }
  }

  static async deleteEvent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.event.delete({
        where: { id },
      });
      res.json({ message: 'Événement supprimé avec succès.' });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la suppression de l'événement." });
    }
  }
}
