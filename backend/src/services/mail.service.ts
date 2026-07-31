import nodemailer from 'nodemailer';
import { ENV } from '../config/env';

export class MailService {
  private static transporter = nodemailer.createTransport({
    host: ENV.SMTP_HOST,
    port: ENV.SMTP_PORT,
    secure: ENV.SMTP_PORT === 465,
    auth: {
      user: ENV.SMTP_USER,
      pass: ENV.SMTP_PASS,
    },
  });

  static async sendContactConfirmation(to: string, name: string) {
    if (!ENV.SMTP_USER || !ENV.SMTP_PASS) {
      console.log(`[MailService] Mock: contact confirmation to ${to}`);
      return true;
    }
    return this.transporter.sendMail({
      from: ENV.SMTP_FROM,
      to,
      subject: 'Confirmation de réception - Bimera Group',
      html: `<div style="font-family:Arial,sans-serif;padding:20px;color:#333;">
        <h2 style="color:#047857;">Bonjour ${name},</h2>
        <p>Nous avons bien reçu votre message et vous remercions de votre intérêt pour Bimera Group.</p>
        <p>Notre équipe vous recontactera dans les plus brefs délais.</p>
        <p>Cordialement,<br/><strong>L'équipe Bimera Group</strong></p>
      </div>`,
    });
  }

  static async sendInvitation(to: string, name: string, tempPassword: string) {
    if (!ENV.SMTP_USER || !ENV.SMTP_PASS) {
      console.log(`[MailService] Mock: invitation to ${to} — temp password: ${tempPassword}`);
      return true;
    }
    return this.transporter.sendMail({
      from: ENV.SMTP_FROM,
      to,
      subject: 'Invitation - Bimera Group',
      html: `<div style="font-family:Arial,sans-serif;padding:20px;color:#333;">
        <h2 style="color:#047857;">Bonjour ${name},</h2>
        <p>Vous avez été invité à rejoindre la plateforme Bimera Group.</p>
        <p>Votre mot de passe temporaire : <strong>${tempPassword}</strong></p>
        <p>Connectez-vous sur <a href="${ENV.FRONTEND_URL}/login">${ENV.FRONTEND_URL}/login</a></p>
        <p>Cordialement,<br/><strong>L'équipe Bimera Group</strong></p>
      </div>`,
    });
  }

  static async sendAccountApproved(to: string, name: string) {
    if (!ENV.SMTP_USER || !ENV.SMTP_PASS) {
      console.log(`[MailService] Mock: account approved notification to ${to}`);
      return true;
    }
    return this.transporter.sendMail({
      from: ENV.SMTP_FROM,
      to,
      subject: 'Votre compte Bimera a été approuvé !',
      html: `<div style="font-family:Arial,sans-serif;padding:20px;color:#333;">
        <h2 style="color:#047857;">Bonjour ${name},</h2>
        <p>Bonne nouvelle ! Votre compte sur la plateforme Bimera Group a été <strong>approuvé</strong>.</p>
        <p>Vous pouvez maintenant vous connecter à votre espace membre.</p>
        <a href="${ENV.FRONTEND_URL}/login" style="display:inline-block;margin-top:16px;padding:12px 24px;background:#047857;color:white;text-decoration:none;border-radius:8px;font-weight:bold;">
          Se connecter
        </a>
        <p style="margin-top:24px;">Cordialement,<br/><strong>L'équipe Bimera Group</strong></p>
      </div>`,
    });
  }
}
