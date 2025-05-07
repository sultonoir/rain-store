import { cn } from "@/lib/utils";
import React from "react";
import { useIntersectionObserver } from "usehooks-ts";

interface InfiniteScrollContainerProps extends React.PropsWithChildren {
  onBottomReached: () => void;
  className?: string;
}

const InfiniteContainer = ({
  onBottomReached,
  className,
  children,
}: InfiniteScrollContainerProps) => {
  const { ref } = useIntersectionObserver({
    threshold: 0.5,
    onChange(isIntersecting) {
      if (isIntersecting) {
        onBottomReached();
      }
    },
  });
  return (
    <div className={cn(className)}>
      {children}
      <div ref={ref} />
    </div>
  );
};

export default InfiniteContainer;
