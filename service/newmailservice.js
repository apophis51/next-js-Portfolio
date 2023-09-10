var nodemailer = require("nodemailer");


const htmlmessage = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Get Your Free Phone Today!</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">

    <table width="100%" bgcolor="#ffffff" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td align="center" style="padding: 20px;">
                <h1 style="color: #333;">Get Your Free Phone Today! 📱</h1>
            </td>
        </tr>
    </table>

    <table width="100%" bgcolor="#ffffff" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td align="center"><a href="https://www.truconnect.com/offers/nlad_etc?agentid=50993&irclickid=QqhSRnzMPxyPUfyTljQq-SZIUkFUk23GNWOlyU0&utm_source=1250818-imp&utm_medium=aff&utm_campaign=1662005-Online%20Tracking%20Link&irgwc=1" target="_blank">
           <img src="https://res.cloudinary.com/dt0ujnagp/image/upload/v1694371740/82083_7eb52dbf06.jpg" alt="Free Phone Image" style="max-width: 100%; height: auto;"></a>
            </td>
        </tr>
    </table>

    <table width="100%" bgcolor="#ffffff" cellpadding="20" cellspacing="0" border="0">
        <tr>
            <td align="center">
                <h2 style="color: #333;">Here's what you'll get:</h2>
                <ul>
                    <li>A <span>free*</span> brand-new, top-of-the-line Cloud Mobile
                    Stratus C7 smartphone</li>
                    <li>Stunning design and cutting-edge features</li>
                    <li>Crystal-clear display for a superior viewing experience</li>
                    <li>Select Plans Now Comes with Amazon Prime On Us!</li>
                </ul>
            </td>
        </tr>
    </table>

    <table width="100%" bgcolor="#ffffff" cellpadding="20" cellspacing="0" border="0">
        <tr>
            <td align="center">
                <h2 style="color: #333;"> Wireless Phone Features:</h2>
                <ul>
                    <li>5.5” LCD Touchscreen - Brilliant, Responsive, Vibrant</li>
    <li>Dual SIM - Versatile, Convenient, Flexible</li>
    <li>16 GB Storage, 2 GB RAM - Spacious, Efficient, Smooth</li>
    <li>8 MP Rear Camera, 5 MP Front Camera - capturing your cherished moments</li>
    <li>Android™ 12 (GO edition) - Modern, User-Friendly, Feature-Rich</li>
    <li>2.0 GHz Quad-Core Processor - Powerful, Fast, Responsive</li>

                </ul>
            </td>
        </tr>
    </table>

    <table width="100%" bgcolor="#ffffff" cellpadding="20" cellspacing="0" border="0">
        <tr>
            <td align="center">
                <p>This offer is too good to pass up, and it's available for a limited time only!</p>
                <p>Click the button below to claim your FREE phone:</p>
                <a href="https://www.truconnect.com/offers/nlad_etc?agentid=50993&irclickid=QqhSRnzMPxyPUfyTljQq-SZIUkFUk23GNWOlyU0&utm_source=1250818-imp&utm_medium=aff&utm_campaign=1662005-Online%20Tracking%20Link&irgwc=1" target="_blank" style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 15px 30px; font-size: 16px; border-radius: 5px;">Claim Your Free Phone</a>
            </td>
        </tr>
    </table>

    <table width="100%" bgcolor="#ffffff" cellpadding="20" cellspacing="0" border="0">
        <tr>
            <td align="center">
                <p>*Lifeline is a government program that subsidizes phone service for qualified customers.

                <p>If you meet the eligibility requirements, you can get one free smartphone and monthly service for your household. Ready to connect? TruConnect offers Lifeline in 37 states, Puerto Rico, and the U.S. Virgin Islands..</p>
                <b>Qualifying programs include:</b>
                <ul  style="list-style: none; padding: 0;">
    <li>Medicaid / Medi-Cal</li>
    <li>SNAP / CalFresh</li>
    <li>Federal Public Housing Assistance or Section 8</li>
    <li>Supplemental Security Income (SSI)</li>
    <li>Veteran and Survivors Pension Benefit</li>
    <li>Multiple Tribal Assistance Programs</li>
    <li>And more!</li>
</ul>

            </td>
        </tr>
    </table>
    <div style="text-align: center; background-color: #ff0000; padding: 10px;">
    <a href="https://www.truconnect.com/devices" target="_blank" style="color: #fff; text-decoration: none; font-weight: bold;">Too much mail? Unsubscribe here</a>
</div>
</body>
</html>`


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

// **magic email */ https://www.wpoven.com/tools/free-smtp-server-for-testing#
// export async function sendMail() {
//   var transporter = nodemailer.createTransport({
//        host: 'smtp.freesmtpservers.com',
//     port: 25,
//     tls: {
//         // do not fail on invalid certs
//         rejectUnauthorized: false,
//       },
//   });

  // export async function sendMail() {
  //   var transporter = nodemailer.createTransport({
  //        host: 'smtp.ethereal.email',
  //     port: 587,
  //     auth: {
  //       user: process.env.ETHERIAL_USER,,
  //       pass: process.env.ETHERIAL_PASS,
  //     },
  //     tls: {
  //         // do not fail on invalid certs
  //         rejectUnauthorized: false,
  //       },
  //   });
  

  //**magic email */
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
    from: `Subsidized Phones <NoReply@your.sweetphonedeals.online>`,
    // from: 'cool@noreply.sweetjellyparties.com',
    // to: 'admin@dinosaur.com',
    // to: 'chris.z.norton@gmail.com',
        // to: 'shawn@govelocitydigital.com',
    to: 'malcolmxvernon@hotmail.com',
    subject: 'Subsidized Wireless Plans Are Here',
    // attachments: [
    //     {
    //         filename: 'Malcolm.jpg',
    //         path: 'https://profile.malcmind.com/Malcolm.jpg',

    //     }
    // ],
    // replyTo: 'admin@malcmind.com',
    // text: 'this is a test message ',
    html: htmlmessage
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