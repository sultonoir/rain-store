"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CheckoutPaymentAnc() {
  const [isVisible, setIsVisible] = useState(true);

  const handleLinkClick = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const paymentForm = document.getElementById("payment-form");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(false);
        } else {
          setIsVisible(true); // Show again if you scroll back up
        }
      },
      { threshold: 0.1 },
    );

    if (paymentForm) {
      observer.observe(paymentForm);
    }

    return () => {
      if (paymentForm) {
        observer.unobserve(paymentForm);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex bg-background p-2 sm:hidden">
      <Button asChild className="w-full" onClick={handleLinkClick}>
        <Link href="#payment-form" scroll={true}>
          Go to payment
        </Link>
      </Button>
    </div>
  );
}
