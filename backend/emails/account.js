const sgMail = require('@sendgrid/mail');

const sendGridAPIKey = '';

sgMail.setApiKey(sendGridAPIKey);

sgMail.send({
    to: 'pushptyagi1@gmail.com',
    from: 'pushp@pushp.com',
    subject: 'Hello WOrld!',
    text: 'I hope this one actually gets to you.'
});
