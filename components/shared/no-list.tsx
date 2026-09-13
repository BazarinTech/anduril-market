import React from "react";
import { InboxIcon } from "hugeicons-react";

type Props = {
  title: string;
  description: string;
};

function NoList({ title, description }: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-8 text-center">
      <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <InboxIcon className="size-7" />
      </div>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export default NoList;
