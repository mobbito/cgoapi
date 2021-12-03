export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  default: {
    from: 'Maloucos <noreply>@maloucos.com',
  },
};

// Amazon SES - Rocketseate usa para enviar emails
