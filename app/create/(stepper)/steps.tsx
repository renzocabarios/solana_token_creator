import { ChevronRightIcon } from "@radix-ui/react-icons";

interface IStepsProps {
  title: string;
  description: string;
  selected?: boolean;
}

export default function Steps({
  title,
  description,
  selected = false,
}: IStepsProps) {
  return (
    <div className="grid grid-cols-7">
      <div className="flex flex-col col-span-6">
        <p className="text-xl text-white font-semibold">{title}</p>
        <p className="text-xs text-slate-400">{description}</p>
      </div>

      <div className="self-center">
        {selected && <ChevronRightIcon className="text-white" />}
      </div>
    </div>
  );
}
