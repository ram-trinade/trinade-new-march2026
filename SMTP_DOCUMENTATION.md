# SMTP Configuration Documentation

This document outlines the SMTP setup for the Trinade Solutions contact form, including the required credentials and implementation details.

## 1. Credentials Setup

The application uses environment variables to securely store SMTP credentials. These should be defined in your `.env.local` file.

### Required Environment Variables
| Variable | Description | Value for GoDaddy |
| :--- | :--- | :--- |
| `SMTP_EMAIL` | The sender email address | `info@trinade.com` |
| `SMTP_PASSWORD` | The email login password | *Your GoDaddy Email Password* |

> [!IMPORTANT]
> **Security Note**: Never commit your `.env.local` file to version control. It is already included in `.gitignore`.

---

## 2. SMTP Implementation

The email functionality is handled by a Next.js API Route using the `nodemailer` library.

### Configuration Details
- **Email Provider**: GoDaddy (Workspace/Microsoft 365)
- **SMTP Host**: `smtpout.secureserver.net`
- **SMTP Port**: `465`
- **Security**: SSL (`secure: true`)

### Code Implementation
Location: [`app/api/contact/route.ts`](file:///c:/Users/aksha/OneDrive/Desktop/new%20George/trinade-new-march2026/app/api/contact/route.ts)

```typescript
const transporter = nodemailer.createTransport({
  host: 'smtpout.secureserver.net',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false // Necessary for some GoDaddy legacy certs
  }
});
```

---

## 3. Email Template

The system sends a premium, branded HTML email for every contact form submission.

- **Theme**: Dark/Gold (Trinade Brand)
- **Content**: Includes Name, Email, Phone, Topic (Subject), and Message.
- **Responsive**: Balanced for Mobile and Desktop email clients.

---

## 4. Testing & Verification

You can test the SMTP connection without using the web interface by running the scratch script:

```bash
npx tsx scratch/test-smtp.ts
```

### Troubleshooting Common Issues
- **535 Authentication Failed**: This most commonly means the password in `.env.local` is incorrect or the user has 2FA enabled without an App Password.
- **Connection Timeout**: Ensure your firewall or network allows outgoing traffic on port 465.
- **Environment Not Loading**: Remember to restart your development server (`npm run dev`) after changing the `.env.local` file.
