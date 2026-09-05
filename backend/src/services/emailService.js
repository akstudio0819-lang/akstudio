import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create Nodemailer Transporter
const createTransporter = () => {
  // If Gmail App Password or custom SMTP credentials exist in env
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });
  }

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  return null;
};

/**
 * Send project request email to akstudio0819@gmail.com
 */
export const sendProjectRequestEmail = async (projectData) => {
  const { name, email, phone, company, service, budget, message } = projectData;

  const recipientEmail = process.env.ADMIN_EMAIL || 'akstudio0819@gmail.com';
  const mailSubject = `🚀 New Project Request: ${service || 'Web Design'} from ${name}`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #08080a; color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #222;">
      <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #333;">
        <h2 style="color: #06b6d4; margin: 0;">AK STUDIO</h2>
        <p style="color: #888888; font-size: 14px; margin-top: 4px;">New Client Project Request Received</p>
      </div>

      <div style="padding: 20px 0;">
        <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #aaaaaa; width: 140px;">Client Name:</td>
            <td style="padding: 8px 0; font-weight: bold; color: #ffffff;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #aaaaaa;">Email Address:</td>
            <td style="padding: 8px 0; color: #06b6d4;"><a href="mailto:${email}" style="color: #06b6d4;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #aaaaaa;">Phone Number:</td>
            <td style="padding: 8px 0; color: #ffffff;">${phone || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #aaaaaa;">Company / Brand:</td>
            <td style="padding: 8px 0; color: #ffffff;">${company || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #aaaaaa;">Service Focus:</td>
            <td style="padding: 8px 0; font-weight: bold; color: #6366f1;">${service}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #aaaaaa;">Project Scope:</td>
            <td style="padding: 8px 0; color: #ffffff;">${budget}</td>
          </tr>
        </table>

        <div style="margin-top: 20px; padding: 16px; background-color: #111116; border-radius: 8px; border-left: 4px solid #06b6d4;">
          <p style="margin: 0 0 8px 0; color: #888888; font-size: 12px; font-weight: bold; text-transform: uppercase;">Project Details / Message:</p>
          <p style="margin: 0; color: #dddddd; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
      </div>

      <div style="text-align: center; padding-top: 20px; border-top: 1px solid #333; font-size: 12px; color: #666666;">
        Submitted via AK Studio Website • Direct Lead Alert
      </div>
    </div>
  `;

  const transporter = createTransporter();

  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: `"AK Studio Web" <${process.env.GMAIL_USER || 'noreply@akstudio.com'}>`,
        to: recipientEmail,
        replyTo: email,
        subject: mailSubject,
        html: htmlContent
      });
      console.log('✅ Project request email delivered:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (err) {
      console.error('❌ Error sending email via Nodemailer:', err.message);
      return { success: false, error: err.message };
    }
  } else {
    console.log(`📧 [EMAIL SIMULATION] New Project Request for ${recipientEmail}:`);
    console.log(`From: ${name} (${email})`);
    console.log(`Service: ${service} | Scope: ${budget}`);
    console.log(`Message: ${message}`);
    return { success: true, simulated: true };
  }
};
