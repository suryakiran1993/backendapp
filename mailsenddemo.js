const nodemailer = require('nodemailer');


const gmailTransporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'suryakiranmtechcse@gmail.com', //gmail id
        pass: 'mslj kpnw lmjv gboa'  // app password
    }
});


const mailOptions = {
    from: 'suryakiranmtechcse@gmail.com',
    to: 'kiransurya93@kluniversity.in',
    subject: 'MSWD PROJECT TEST MAIL',
    html: '<font color=red>Hello Surya</font>'
};


gmailTransporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        console.error('Error sending email through Gmail:', error.message);
    } else {
        console.log('Email Sent Successfully');
    }
});
