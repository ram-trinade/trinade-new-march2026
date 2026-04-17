import nodemailer from 'nodemailer';
import path from 'path';

async function testMail() {
  console.log('Testing SMTP with:', process.env.SMTP_EMAIL);
  
  const transporter = nodemailer.createTransport({
    host: 'smtpout.secureserver.net',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    await transporter.verify();
    console.log('SMTP connection verified successfully!');
    
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: 'info@trinade.com',
      subject: 'Test Email',
      text: 'This is a test email.',
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('SMTP Error:', error);
  }
}

testMail();
