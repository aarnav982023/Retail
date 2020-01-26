const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail
        .send({
            to: email,
            from: 'support@retail.com',
            subject: 'Thanks for joining in!',
            text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
        })
        .catch(err => {
            throw new Error('Could not send welcome mail');
        });
};

const sendCancelationEmail = (email, name) => {
    sgMail
        .send({
            to: email,
            from: 'support@retail.com',
            subject: 'Sorry to see you go!',
            text: `Goodbye, ${name}. I hope to see you back sometime soon.`
        })
        .catch(err => {
            throw new Error('Could not send cancelation mail');
        });
};

//@ToDO:- Forgot Password Email implementation
const forgotPasswordEmail = email => {};

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail,
    forgotPasswordEmail
};
