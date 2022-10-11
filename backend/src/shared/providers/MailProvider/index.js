const nodemailer = require('nodemailer');

class MailProvider {
  constructor() {
    this.transport = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '4c6848e45d5449',
        pass: 'ef10c73e43932c',
      },
    });
  }

  async sendMail({ template, to, subject }) {
    await this.transport.sendMail({
      from: 'NoReply <noreply@pets.com.br>',
      to,
      subject,
      html: template,
    });
  }
}

module.exports = MailProvider;
