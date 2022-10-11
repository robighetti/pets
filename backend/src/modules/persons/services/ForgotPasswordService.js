const crypto = require('crypto');

const AppError = require('../../../shared/errors/AppError');

const {
  forgotPassword,
} = require('../../../shared/providers/MailProvider/templates');

class ForgotPasswordService {
  constructor(personsRepository, mailProvider) {
    this.personsRepository = personsRepository;
    this.mailProvider = mailProvider;
  }

  async execute({ email }) {
    const user = await this.personsRepository.checkPersonEmail(email);

    if (!user) {
      throw new AppError('User not found');
    }

    const token = parseInt(crypto.randomBytes(3).toString('hex'), 16)
      .toString()
      .substring(0, 6);

    const data = {
      person_id: user.id,
      token,
    };

    const forgot = await this.personsRepository.saveTokenInDb(data);

    const message = forgotPassword(user.name, token);

    await this.mailProvider.sendMail({
      to: 'robighetti@gmail.com',
      subject: 'Esqueci minha senha [PETS]',
      template: message,
    });

    return forgot;
  }
}

module.exports = ForgotPasswordService;
