// const nodemailer = require('nodemailer');

// // Debug: Log environment variables
// console.log('Environment check:');
// console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'SET' : 'NOT SET');
// console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'SET' : 'NOT SET');
// console.log('Current working directory:', process.cwd());

// const hasCreds = !!process.env.EMAIL_USER && !!process.env.EMAIL_PASS;

// let transporter = null;

// if (hasCreds) {
//   try {
//     transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//       },
//       // Add these options for better Gmail compatibility
//       secure: true,
//       port: 465,
//       tls: {
//         rejectUnauthorized: false
//       }
//     });
    
//     // Verify transporter configuration
//     transporter.verify(function(error, success) {
//       if (error) {
//         console.log('Transporter verification failed:', error);
//       } else {
//         console.log('Transporter is ready to send emails');
//       }
//     });
    
//   } catch (error) {
//     console.error('Error creating transporter:', error);
//     transporter = null;
//   }
// }

// const sendOTP = async (email, otp) => {
//   if (!hasCreds) {
//     console.log('Email creds missing. OTP (dev):', otp, 'to:', email);
//     return;
//   }
  
//   if (!transporter) {
//     console.log('Transporter not available. OTP (dev):', otp, 'to:', email);
//     return;
//   }
  
//   try {
//     const mailOptions = {
//       from: `"TerraceTop" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: 'TerraceTop - Email Verification OTP',
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <h2 style="color: #22c55e;">Welcome to TerraceTop!</h2>
//           <p>Your email verification OTP is:</p>
//           <div style="background-color: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0;">
//             <h1 style="color: #22c55e; font-size: 32px; margin: 0;">${otp}</h1>
//           </div>
//           <p>This OTP will expire in 10 minutes.</p>
//           <p>If you didn't request this, please ignore this email.</p>
//         </div>
//       `
//     };
    
//     console.log('Attempting to send email to:', email);
//     const result = await transporter.sendMail(mailOptions);
//     console.log('OTP sent successfully:', result.messageId);
//     return result;
//   } catch (error) {
//     console.error('Email sending error:', error);
//     console.error('Error details:', {
//       code: error.code,
//       command: error.command,
//       response: error.response,
//       responseCode: error.responseCode
//     });
//     throw error;
//   }
// };

// module.exports = { sendOTP };
const nodemailer = require('nodemailer');

// Enhanced Debugging for Environment Variables
console.log('--- Email Service Configuration ---');
console.log('Checking for .env file in:', process.cwd());
console.log('EMAIL_USER is:', process.env.EMAIL_USER ? 'SET' : 'NOT SET');
console.log('EMAIL_PASS is:', process.env.EMAIL_PASS ? 'SET' : 'NOT SET');
console.log('------------------------------------');


const hasCreds = !!process.env.EMAIL_USER && !!process.env.EMAIL_PASS;

let transporter = null;

if (hasCreds) {
    try {
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            // Add these options for better Gmail compatibility
            secure: true,
            port: 465,
            tls: {
                rejectUnauthorized: false
            }
        });

        // Verify transporter configuration
        transporter.verify(function(error, success) {
            if (error) {
                console.error('❌ Nodemailer transporter verification failed:', error);
            } else {
                console.log('✅ Nodemailer transporter is configured and ready to send emails.');
            }
        });
    } catch (error) {
        console.error('Error creating Nodemailer transporter:', error);
        transporter = null;
    }
} else {
    console.warn('⚠️ Email credentials (EMAIL_USER, EMAIL_PASS) are not set in the .env file.');
    console.warn('Email sending is disabled. OTPs will be logged to the console for development.');
}

const sendOTP = async (email, otp) => {
    // If credentials are not set, log OTP to console and resolve successfully for dev purposes
    if (!transporter || !hasCreds) {
        console.log('**************************************************');
        console.log(`** DEV MODE: OTP for ${email} is: ${otp} **`);
        console.log('**************************************************');
        // We return a resolved promise to prevent frontend errors when in dev mode.
        return Promise.resolve();
    }

    try {
        const mailOptions = {
            from: `"TerraceTop" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'TerraceTop - Your Verification Code',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
                    <h2 style="color: #22c55e; text-align: center;">Welcome to TerraceTop!</h2>
                    <p style="text-align: center; color: #555;">Your verification code is:</p>
                    <div style="background-color: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
                        <h1 style="color: #16a34a; font-size: 36px; margin: 0; letter-spacing: 4px;">${otp}</h1>
                    </div>
                    <p style="text-align: center; color: #555;">This code will expire in 10 minutes.</p>
                    <p style="text-align: center; color: #888; font-size: 12px;">If you didn't request this, you can safely ignore this email.</p>
                </div>
            `
        };

        console.log(`Attempting to send OTP email to: ${email}`);
        const result = await transporter.sendMail(mailOptions);
        console.log('✅ OTP email sent successfully. Message ID:', result.messageId);
        return result;

    } catch (error) {
        console.error('❌ Email sending error:', error);
        // This will propagate the error back to the auth route
        throw error;
    }
};

module.exports = { sendOTP };
