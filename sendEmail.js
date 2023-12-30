const nodemailer = require('nodemailer');

const notifyAdmin = async (recipients, subject, message) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // or any other email provider 
            port: 465,
            secure: true,
            auth: {
                user: ' ', // use your email address
                pass: ' ' // use with your email 2 step verification password 
            },
            tls: {
                rejectUnauthorized: false // made false for smooth functionality, change for more security
            }
        });

        const listOfRecipients = recipients.split(',').map(email => email.trim());

        const info = await transporter.sendMail({
            from: ' ', // use your email address
            to: listOfRecipients.join(', '), 
            subject: subject,
            html: message
        });

        console.log('Message sent:', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; 
    }
};

module.exports = {
    notifyAdmin
};
