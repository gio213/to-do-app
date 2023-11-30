import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from "bcryptjs";


export const sendEmail = async ({ email, emailType, userId }: any) => {

    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        console.log(hashedToken);
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, { verifayToken: hashedToken, verifayTokenExpire: Date.now() + 3600000 })


        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashedToken, forgotPasswordTokenExpire: Date.now() + 3600000 })


        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "334d63d40731ef",
                pass: "9c8837fe1ee82e"
            }
        });
        const mailOptions = {
            from: "gio.patsia@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your account" : "Reset your password",
            html: emailType === "VERIFY" ? `<p>Click <a href="http://localhost:3000/verify?token=${hashedToken}">here</a> to verify your account</p>` : `<p>Click <a href="http://localhost:3000/reset?token=${hashedToken}">here</a> to reset your password</p>`

        }
        const mailResponse = await transport.sendMail(mailOptions);
        console.log(mailResponse);
        return mailResponse;
    } catch (err: any) {
        throw new Error(err.message);
    }

}