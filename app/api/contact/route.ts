import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, countryCode, phone, subject, message } = data;

    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
      console.error('Missing SMTP credentials in environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: 'smtpout.secureserver.net',
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
      // GoDaddy sometimes requires this for legacy accounts
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: 'info@trinade.com',
      replyTo: email,
      subject: `New Contact Request: ${subject}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f7f4; padding: 40px 20px; color: #1a1a1e;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid #e5e1da;">
            <div style="background-color: #0a0a0a; padding: 30px; text-align: center;">
              <h1 style="color: #d4bb8a; margin: 0; font-size: 24px; letter-spacing: 0.1em; font-weight: 300;">TRINADE SOLUTIONS</h1>
              <p style="color: rgba(212, 187, 138, 0.6); margin: 5px 0 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.2em;">New Contact Inquiry</p>
            </div>
            
            <div style="padding: 40px;">
              <div style="margin-bottom: 30px; border-bottom: 1px solid #f0ede8; padding-bottom: 20px;">
                <h2 style="font-size: 18px; color: #c9a86e; margin-bottom: 20px; font-weight: 500;">Inquiry Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0; color: #888; font-size: 14px; width: 120px;">Name</td>
                    <td style="padding: 10px 0; color: #1a1a1e; font-size: 15px; font-weight: 500;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #888; font-size: 14px;">Email</td>
                    <td style="padding: 10px 0; color: #c9a86e; font-size: 15px; font-weight: 500;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #888; font-size: 14px;">Phone</td>
                    <td style="padding: 10px 0; color: #1a1a1e; font-size: 15px;">${countryCode} ${phone}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #888; font-size: 14px;">Topic</td>
                    <td style="padding: 10px 0; color: #1a1a1e; font-size: 15px; font-weight: 500; text-transform: capitalize;">${subject.replace(/-/g, ' ')}</td>
                  </tr>
                </table>
              </div>
              
              <div style="margin-bottom: 30px;">
                <h2 style="font-size: 18px; color: #c9a86e; margin-bottom: 15px; font-weight: 500;">Message Content</h2>
                <div style="background-color: #fcfcfb; border-left: 3px solid #d4bb8a; padding: 20px; color: #2a2218; font-size: 15px; line-height: 1.6; white-space: pre-wrap; border-radius: 0 8px 8px 0;">${message}</div>
              </div>
              
              <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #f0ede8;">
                <p style="font-size: 13px; color: #999; margin: 0;">This inquiry was sent from the Trinade website contact form.</p>
              </div>
            </div>
            
            <div style="background-color: #faf9f7; padding: 20px; text-align: center; font-size: 12px; color: #bbb;">
              &copy; ${new Date().getFullYear()} Trinade Solutions. All rights reserved.
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
