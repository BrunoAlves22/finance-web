import { ReactNode } from "react";

interface PercentageItemProps {
  icon: ReactNode;
  title: string;
  value: number | React.JSX.Element;
}

export function PercentageItem({ icon, title, value }: PercentageItemProps) {
  return (
    <div className="flex items-center justify-between">
      {/* Icone */}
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-black bg-opacity-[3%] p-2 dark:bg-white dark:bg-opacity-[3%]">
          {icon}
        </div>
        <p className="text-sm text-black/80 dark:text-white/80">{title}</p>
      </div>
      <p className="text-sm font-bold text-black dark:text-white">{value} %</p>
    </div>
  );
}
