import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates";
import { mailtrapclient, sender } from "./mailtrap.config";

export const sendVerificationToken = async (email: string, verificationToken: string) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapclient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        });
        console.log("Email sent succesfully", response);
    } catch (error) {
        console.error(`Error sending verification email: ${error}`);
        throw new Error(`Error sending verification email: ${error}`);
    }
}

export const sendWelcomeEmail = async (email: string, name: string) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapclient.send({
            from: sender,
            to: recipient,
            template_uuid: "d1c484f7-8af2-4081-b49e-6398458245f7",
            template_variables: {
                company_info_name: "Auth",
                name: name
            }
        });
        console.log("Email sent succesfully", response);
    } catch (error) {
        console.error(`Error sending welcome email: ${error}`);
        throw new Error(`Error sending welcome email: ${error}`);
    }
}

export const sendPasswordResetEmail = async (email: string, resetURL: string) => {
    console.log(email);
    const recipient = [{ email }];

    try {
        const response = await mailtrapclient.send({
            from: sender,
            to: recipient,
            subject: "Reset your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset"
        });
        console.log("Password Reset Email sent succesfully", response);
    } catch (error) {
        console.error(`Error sending Password Reset email: ${error}`);
        throw new Error(`Error sending Password Reset email: ${error}`);
    }
}

export const sendResetSuccessEmail = async (email: string) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapclient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        });
        console.log("Password Reset Success Email sent succesfully", response);
    } catch (error) {
        console.error(`Error sending Password Reset Success Email: ${error}`);
        throw new Error(`Error sending Password Reset Success Email: ${error}`);
    }
}