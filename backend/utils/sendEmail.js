import nodeMailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Use environment variables for sensitive information
const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com"; // Default to Gmail's SMTP host
const SMTP_PORT = process.env.SMTP_PORT || 587; // Port for TLS (use 465 for SSL)
const SMTP_MAIL = process.env.SMTP_MAIL; // Your email address from environment variables
const SMTP_PASSWORD = process.env.SMTP_PASSWORD; // Your app password from environment variables

export const sendEmail = async (options) => {
  // Create the transporter object using nodemailer
  const transporter = nodeMailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT == 465, // Use SSL if port 465
    auth: {
      user: SMTP_MAIL,
      pass: SMTP_PASSWORD,
    },
  });

  // Mail options
  const mailOptions = {
    from: SMTP_MAIL,
    to: options.email, // Recipient email
    subject: options.subject, // Email subject
    text: `${options.message} \n\nEmail of User Who Sent The Message: ${options.userEmail}`, // Email content
  };

  try {
    // Send email and log the result
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId); // Log the message ID if sent successfully
  } catch (error) {
    console.error("Error sending email:", error); // Log any errors that occur
  }
};
