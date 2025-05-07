import { fromNow } from "@/lib/from-now";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useDialogNotifi } from "@/hooks/use-dialog-notifi";
import { NotificationWithRead } from "@/server/notifi/notifi-input";

interface NotifiCardProps {
  notification: NotificationWithRead;
}

const NotifiCard = ({ notification }: NotifiCardProps) => {
  const router = useRouter();
  const { setNotifiOpen } = useDialogNotifi();
  const handleNavigate = () => {
    switch (notification.status) {
      case "AdminPaymentConfirmed":
        router.push("/dashboard/orders");
        setNotifiOpen();
        break;
      case "UserPaymentConfirmed":
        router.push("/user/transaction");
        setNotifiOpen();
        break;
      case "Rating":
        router.push("/dashboard/rating");
        setNotifiOpen();
        break;
      case "Promo":
        router.push(`/promotiions/${notification.promoId}`);
        setNotifiOpen();
      default:
        break;
    }
  };
  return (
    <div className="text-sm transition-colors">
      <div className="hover:bg-accent relative flex items-start rounded-lg px-3 py-2 pe-3 transition-colors">
        <div className="flex-1 space-y-1">
          <button
            className="text-foreground/80 text-left after:absolute after:inset-0"
            onClick={handleNavigate}
          >
            <span className="text-foreground font-medium hover:underline">
              {notification.title}
            </span>
          </button>
          <div className="text-muted-foreground text-xs">
            {notification.message}
          </div>
          <div className="text-muted-foreground text-xs">
            {fromNow(new Date(notification.createdAt))}
          </div>
        </div>
        {!notification.isRead && (
          <div className="absolute end-0 self-center">
            <span className="sr-only">Unread</span>
            <Dot className="text-primary" />
          </div>
        )}
      </div>
      <Separator className="my-2" />
    </div>
  );
};

function Dot({ className }: { className?: string }) {
  return (
    <svg
      width="6"
      height="6"
      fill="currentColor"
      viewBox="0 0 6 6"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="3" cy="3" r="3" />
    </svg>
  );
}

export default NotifiCard;
