import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const body = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL, // Replace with your email address
        pass: process.env.SMTP_PASSWORD, // Replace with your app password
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: body.to,
      subject: body.subject,
      text: body.text,
    });

    return new Response(
      JSON.stringify({ message: 'Email sent successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
    });
  }
}
