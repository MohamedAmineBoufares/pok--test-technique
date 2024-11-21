import React from "react";

function Chip({ title }: { title: React.ReactNode }) {
  return (
    <div className="rounded-full bg-slate-100 shadow-sm py-0.5 px-2.5 text-xs capitalize text-slate-700">
      {title}
    </div>
  );
}

export default Chip;
