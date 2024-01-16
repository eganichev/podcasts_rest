import { LucideLoader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="absolute animate-pulse z-10 w-full h-full flex backdrop-opacity-10 backdrop-invert bg-white/30">
      <div className="flex grow items-center justify-center text-lg text-grey">
        <LucideLoader2 className="animate-spin -ml-1 mr-3 h-10 w-10 " />
        Loading...
      </div>
    </div>
  );
}
