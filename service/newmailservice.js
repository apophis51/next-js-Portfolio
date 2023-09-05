var nodemailer = require("nodemailer");

//-----------------------------------------------------------------------------
// export async function sendMail() {
//   var transporter = nodemailer.createTransport({
//     service: "gmail",
//     //   port: 587,
//     // secure: true,
//     auth: {
//       user: process.env.GOOGLE_EMAIL_USER,
//       pass: process.env.GOOGLE_EMAIL_PASS

//     },
//     tls: {
//         // do not fail on invalid certs
//         rejectUnauthorized: false,
//       },
//   });

//   export async function sendMail() {
//     var transporter = nodemailer.createTransport({
//          host: 'smtp.ethereal.email',
//       port: 587,
//       auth: {
//         user: process.env.ETHERIAL_USER,',
//         pass: process.env.ETHERIAL_PASS,
//       },
//       tls: {
//           // do not fail on invalid certs
//           rejectUnauthorized: false,
//         },
//     });
  
export async function sendMail() {
  var transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 25,
    auth: {
      user: process.env.MAILGUN_USER,
      pass: process.env.MAILGUN_PASS,
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
  });

  var mailOptions = {
    from: `Last Test Message of tHe Night Malcolm<NoReply@your.sweetphonedeals.online>`,
    // from: 'cool@noreply.sweetjellyparties.com',
    to: 'admin@malcmind.com',
    subject: 'This is a Secondary Test Email',
    // attachments: [
    //     {
    //         filename: 'Malcolm.jpg',
    //         path: 'https://profile.malcmind.com/Malcolm.jpg',

    //     }
    // ],
    // replyTo: 'admin@malcmind.com',
    // text: 'this is a test message ',
    html: `<p>Email To self</p><p>Malcolm</p>`
  };

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
    console.log(process.env.NODEMAILER_USERNAME)
  } else {
    console.log("Server is ready to take our messages");
  }
});
//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       throw new Error(error);
//     } else {
//       console.log("Email Sent");
//       return true;
//     }
//   });
// }

await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        reject(err);
      } else {
        console.log("Email Sent");
        resolve(response);
      }
    });
  });
}