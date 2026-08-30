const nodemailder = require("nodemailer");

const EmailNotification = async ({
    receiverEmail,
    subject,
    dynamicHtml
}) => {
    try {
        const transporter = nodemailder.createTransport({
            service: "gmail",
            auth: {
                user: "",
                pass: ""
            }
        });

        const mailOptions = {
            from: `"NVKSS" <saravanansenthil605@gmail.com>`,
            to: receiverEmail,
            subject: subject,
            html: `<div style="font-family:Arial,sans-serif;padding:20px;">
                    ${dynamicHtml}
                </div>`
        };

        const response = await transporter.sendMail(mailOptions);

        console.log(" Email sent successfully:", response.messageId)

    } catch (err) {
        console.log(" Error sending Email:", err);
        return false;
    }
}