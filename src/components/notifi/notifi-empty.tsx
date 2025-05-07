import { Inbox } from "lucide-react";
import React from "react";

const NotifiEmpty = () => {
  return (
    <div className="flex h-[calc(100dvh-73px)] flex-col items-center justify-center gap-3 md:h-72">
      <div className="grid size-12 place-items-center rounded-full bg-accent">
        <Inbox size={20} />
      </div>
      <p className="text-sm text-muted-foreground">No new notifications</p>
    </div>
  );
};

export default NotifiEmpty;
