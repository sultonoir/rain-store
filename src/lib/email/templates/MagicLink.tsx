import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export interface ResetPasswordTemplateProps {
  link: string;
}

export const MagicLinkEmail = ({ link }: ResetPasswordTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>Magic link email</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Text style={title}>Rizal Store</Text>
            <Text style={text}>Hi,</Text>
            <Text style={text}>
              Welcome to Rizal Store, the fashion brand offering stylish and
              high-quality apparel for every occasion. Discover trendsetting
              designs and timeless elegance that redefine your wardrobe.
            </Text>
            <Button style={button} href={link}>
              Get started
            </Button>
            <Text style={text}>
              If you didn&apos;t request this, please ignore this email.
            </Text>
            <Text style={text}>
              To keep your account secure, please don&apos;t forward this email
              to anyone.
            </Text>
            <Text style={text}>Have a nice day!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const title = {
  ...text,
  fontSize: "22px",
  fontWeight: "700",
  lineHeight: "32px",
};

const button = {
  backgroundColor: "#09090b",
  borderRadius: "4px",
  color: "#fafafa",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

// const anchor = {
//   textDecoration: "underline",
// };
