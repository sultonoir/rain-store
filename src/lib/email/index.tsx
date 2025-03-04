import { render } from "@react-email/components";
import { createTransport, type TransportOptions } from "nodemailer";
import type { ComponentProps } from "react";
import { MagicLinkEmail } from "./templates/MagicLink";

export enum EmailTemplate {
  MagicLink = "MagicLink",
}

export type PropsMap = {
  [EmailTemplate.MagicLink]: ComponentProps<typeof MagicLinkEmail>;
};

const getEmailTemplate = <T extends EmailTemplate>(
  template: T,
  props: PropsMap[NoInfer<T>],
) => {
  switch (template) {
    case EmailTemplate.MagicLink:
      return {
        subject: "Signin to Rizal Store",
        body: render(
          <MagicLinkEmail {...(props as PropsMap[EmailTemplate.MagicLink])} />,
        ),
      };
    default:
      throw new Error("Invalid email template");
  }
};

const smtpConfig = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

const transporter = createTransport(smtpConfig as TransportOptions);

export const sendMail = async <T extends EmailTemplate>(
  to: string,
  template: T,
  props: PropsMap[NoInfer<T>],
) => {
  const { subject, body } = getEmailTemplate(template, props);

  const html = await body; // Tambahkan await di sini

  return transporter.sendMail({
    from: '"Rizal Store" <noreply@acme.com>',
    to,
    subject,
    html,
  });
};
