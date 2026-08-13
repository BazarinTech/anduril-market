import React from "react";
import { Inbox } from "lucide-react"; // modern icon

type Props = {
  title: string;
  description: string;
};

function NoList({ title, description }: Props) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 border border-dashed rounded-2xl bg-gray-50 dark:bg-gray-900/40">
      <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gray-200 dark:bg-gray-800">
        <Inbox className="w-8 h-8 text-gray-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
        {title}
      </h3>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}

export default NoList;