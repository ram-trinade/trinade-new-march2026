import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Escape user input before inserting it into HTML
function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(req: Request) {
  try {
    // Check Resend API key
    if (!process.env.RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY environment variable');

      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Read request body
    const data = await req.json();

    const {
      name,
      email,
      countryCode,
      phone,
      subject,
      message,
    } = data;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    // Escape user-provided values
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCountryCode = escapeHtml(countryCode);
    const safePhone = escapeHtml(phone);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);

    const formattedSubject = safeSubject.replace(/-/g, ' ');

    // Send email through Resend HTTPS API
    const { data: emailData, error: emailError } =
      await resend.emails.send({
        from: 'Trinade Solutions <info@trinade.com>',
        to: ['info@trinade.com'],
        replyTo: email,
        subject: `New Contact Request: ${formattedSubject}`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f7f4; padding: 40px 20px; color: #1a1a1e;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid #e5e1da;">

              <!-- Header -->
              <div style="background-color: #0a0a0a; padding: 30px; text-align: center;">
                <h1 style="color: #d4bb8a; margin: 0; font-size: 24px; letter-spacing: 0.1em; font-weight: 300;">
                  TRINADE SOLUTIONS
                </h1>

                <p style="color: rgba(212, 187, 138, 0.6); margin: 5px 0 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.2em;">
                  New Contact Inquiry
                </p>
              </div>

              <!-- Content -->
              <div style="padding: 40px;">

                <!-- Inquiry Details -->
                <div style="margin-bottom: 30px; border-bottom: 1px solid #f0ede8; padding-bottom: 20px;">

                  <h2 style="font-size: 18px; color: #c9a86e; margin-bottom: 20px; font-weight: 500;">
                    Inquiry Details
                  </h2>

                  <table style="width: 100%; border-collapse: collapse;">

                    <tr>
                      <td style="padding: 10px 0; color: #888; font-size: 14px; width: 120px;">
                        Name
                      </td>

                      <td style="padding: 10px 0; color: #1a1a1e; font-size: 15px; font-weight: 500;">
                        ${safeName}
                      </td>
                    </tr>

                    <tr>
                      <td style="padding: 10px 0; color: #888; font-size: 14px;">
                        Email
                      </td>

                      <td style="padding: 10px 0; color: #c9a86e; font-size: 15px; font-weight: 500;">
                        ${safeEmail}
                      </td>
                    </tr>

                    <tr>
                      <td style="padding: 10px 0; color: #888; font-size: 14px;">
                        Phone
                      </td>

                      <td style="padding: 10px 0; color: #1a1a1e; font-size: 15px;">
                        ${safeCountryCode} ${safePhone}
                      </td>
                    </tr>

                    <tr>
                      <td style="padding: 10px 0; color: #888; font-size: 14px;">
                        Topic
                      </td>

                      <td style="padding: 10px 0; color: #1a1a1e; font-size: 15px; font-weight: 500; text-transform: capitalize;">
                        ${formattedSubject}
                      </td>
                    </tr>

                  </table>
                </div>

                <!-- Message -->
                <div style="margin-bottom: 30px;">

                  <h2 style="font-size: 18px; color: #c9a86e; margin-bottom: 15px; font-weight: 500;">
                    Message Content
                  </h2>

                  <div style="background-color: #fcfcfb; border-left: 3px solid #d4bb8a; padding: 20px; color: #2a2218; font-size: 15px; line-height: 1.6; white-space: pre-wrap; border-radius: 0 8px 8px 0;">
                    ${safeMessage}
                  </div>

                </div>

                <!-- Footer Note -->
                <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #f0ede8;">

                  <p style="font-size: 13px; color: #999; margin: 0;">
                    This inquiry was sent from the Trinade website contact form.
                  </p>

                </div>

              </div>

              <!-- Bottom Footer -->
              <div style="background-color: #faf9f7; padding: 20px; text-align: center; font-size: 12px; color: #bbb;">

                &copy; ${new Date().getFullYear()} Trinade Solutions. All rights reserved.

              </div>

            </div>
          </div>
        `,
      });

    // Handle Resend API error
    if (emailError) {
      console.error('Resend email error:', emailError);

      return NextResponse.json(
        {
          error: 'Failed to send email',
          details: emailError.message,
        },
        { status: 500 }
      );
    }

    // Success
    console.log('Contact email sent successfully:', emailData);

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully.',
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending contact email:', error);

    return NextResponse.json(
      {
        error: 'Failed to send email',
      },
      { status: 500 }
    );
  }
}