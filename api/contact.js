// pages/api/contact.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    // Set up nodemailer transporter with your Gmail credentials
    const transporter = nodemailer.createTransport({
      service: "gmail", // Using Gmail for sending emails
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // App Password for your Gmail
      },
    });

    // Email options
    const mailOptions = {
      from: email, // Now using the user's email as the "From" address
      to: "raif.moon2000@gmail.com", // Recipient email (your email to receive messages)
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
      // Send email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send message." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method Not Allowed");
  }
}
