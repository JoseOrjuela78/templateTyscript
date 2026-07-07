import nodemailer from "nodemailer";
import { IEmailService, EmailMessage } from "./models/IEmail";

export class SmtpEmailService implements IEmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async send(message: EmailMessage): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: message.to,
      cc: message.cc,
      bcc: message.bcc,
      subject: message.subject,
      html: message.html,
      text: message.text,
    });
  }
}

