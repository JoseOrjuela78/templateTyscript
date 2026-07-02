export interface EmailMessage {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  cc?: string[];
  bcc?: string[];
}

export interface IEmailService {
  send(message: EmailMessage): Promise<void>;
}