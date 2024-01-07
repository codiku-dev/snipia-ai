"use client";
import Image from "next/image";
import logoPng from "/public/logo.png";
import Link from "next/link";
import { UserButton, useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { RxCopy } from "react-icons/rx";
import { DrawerMobile } from "../Nav/DrawerMobile";

export function Header(p: { nav: React.ReactNode }) {
  const { userId } = useAuth();
  const copyUserIdToClipboard = () => {
    navigator.clipboard.writeText(userId!);
    toast("userId copied to clipboard");
  };

  return (
    <header className="bg-main-800 px-8 py-8 flex justify-between">
      <DrawerMobile>{p.nav}</DrawerMobile>
      <Link href="/">
        <Image
          src={logoPng}
          alt="Logo"
          width={192}
          height={192}
          priority
          className="w-32  md:w-48"
        />
      </Link>
      <div className="flex items-center space-x-3 text-white">
        <UserButton
          appearance={{ elements: { userButtonPopoverCard: "bg-main-900" } }}
          afterSignOutUrl="/auth/sign-in"
        />
        <div
          className="cursor-pointer flex justify-center items-center hover:text-main-50"
          onClick={copyUserIdToClipboard}
        >
          <div className="w-5 h-5">
            <RxCopy />
          </div>
          {userId?.slice(0, 10) + "..."}
        </div>
      </div>
    </header>
  );
}