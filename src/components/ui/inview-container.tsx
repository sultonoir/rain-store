"use client";
import React from "react";
import { useInView } from "react-intersection-observer";

type InviewContainerProps = React.HTMLAttributes<HTMLElement>;

export default function InviewContainer({
  children,
  className,
}: InviewContainerProps) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  return (
    <div className={className} ref={ref}>
      {inView ? <>{children}</> : null}
    </div>
  );
}
