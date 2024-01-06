import logo from "/public/snipia.png";
import Image from "next/image";
export function Spinner(p: {}) {
  return (
    <div className="flex justify-center items-center">
      <Image src={logo} alt="Loading..." className="animate-spin h-12 w-12" />
    </div>
  );
}
