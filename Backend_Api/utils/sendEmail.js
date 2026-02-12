
// this is just to send a confirmation message via an email


// const nodemailer = require('nodemailer');
// const sendConfirmationEmail = async (booking) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'yourcafeemail@gmail.com',
//       pass: 'yourpassword'
//     },
//     tls: {
//     rejectUnauthorized: false // ✅ This bypasses the certificate error
//   }

//   });

  // const mailOptions = {
//     from: '"Lounge Cafe" <yourcafeemail@gmail.com>',
//     to: booking.email,
//     subject: 'Your Table Booking Confirmation',
//     text: `Hi ${booking.name},\n\nYour booking is confirmed for ${booking.date} at ${booking.time}.\nReference Code: ${booking.referenceCode}\n\nThank you for choosing Lounge Cafe!`
//   };

//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendConfirmationEmail;