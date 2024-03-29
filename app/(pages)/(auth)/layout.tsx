import logoAuthPng from "/public/logo.png";
import Image from "next/image";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between h-screen w-screen ">
      <div className="flex-1 flex justify-center items-center">{children}</div>
      <div className="hidden lg:flex space-y-4 flex-1 flex-col items-center  bg-main-700 h-full justify-center rounded-bl-[8rem] shadow-2xl ">
        <Image src={logoAuthPng} alt="Logo" />
        <div className="text-xl text-white px-12">
          The one place for all your code snippets, with a touch of AI
        </div>
      </div>
    </div>
  );
}
