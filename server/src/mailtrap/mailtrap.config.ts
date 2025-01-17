import { MailtrapClient } from "mailtrap";

const TOKEN = process.env.MAILTRAP_TOKEN as string;

export const mailtrapclient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Om Patel",
};
