import Link from "next/link";
import Balancer from "react-wrap-balancer";
import Logo from "../templates/navbar/logo";

export default function Footer() {
  const year = new Date().getFullYear().toString();
  return (
    <footer className="not-prose border-t">
      <section className="container">
        <div className="grid gap-6 p-6 sm:p-8">
          <div className="grid gap-6">
            <Logo />
            <p>
              <Balancer>
                Rainame is a leading online fashion retailer that offers the
                latest trends and styles in clothing, shoes, and accessories for
                men and women. Our mission is to provide our customers with a
                seamless and enjoyable shopping experience, allowing them to
                stay ahead of the fashion curve without breaking the bank
              </Balancer>
            </p>
            <div className="mb-6 flex flex-col gap-4 text-sm text-muted-foreground underline underline-offset-4 md:mb-0 md:flex-row">
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms-of-service">Terms of Service</Link>
              <Link href="/cookie-policy">Cookie Policy</Link>
            </div>
            <p className="text-muted-foreground">
              © <a href="https://github.com/sultonoir/rainame">Rainame</a>. All
              rights reserved. {year}-present.
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
}
