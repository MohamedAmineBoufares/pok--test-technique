interface StatProps {
  icon: React.ReactNode;
  name: string;
  value: number;
}

function Stat({ icon, name, value }: StatProps) {
  return (
    <div className="flex items-center space-x-2">
      {icon}
      <div>
        <p className="text-xs font-medium leading-none uppercase">{name}</p>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
  );
}

export default Stat;
