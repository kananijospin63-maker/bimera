import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { MailService } from '../services/mail.service';

export class ContactController {
  static async submitContact(req: Request, res: Response) {
    try {
      const { name, email, phone, subject, message } = req.body;

      const contactMsg = await prisma.contactMessage.create({
        data: { name, email, phone, subject, message },
      });

      // Send automated confirmation email asynchronously
      MailService.sendContactConfirmation(email, name).catch((err) =>
        console.error('Failed to send mail confirmation:', err)
      );

      res.status(201).json({
        message: 'Votre message a été transmis avec succès. Merci !',
        contactMsg,
      });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de l'envoi du message." });
    }
  }

  static async getMessages(req: Request, res: Response) {
    try {
      const messages = await prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' },
      });
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des messages.' });
    }
  }
}
