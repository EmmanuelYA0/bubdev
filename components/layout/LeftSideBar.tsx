"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { adminNavLinks } from "@/lib/constants";
import { UserIcon } from "lucide-react";

const LeftSideBar = () => {
  const pathname = usePathname();

  return (
    <div className="h-screen mt-16 -ml-11 p-10 flex flex-col gap-16 bg-[#f5dfd7] shadow-xl max-lg:hidden">
      {/* <Image src="/logo.png" alt="logo" width={150} height={70} /> */}

      <div className="flex flex-col gap-12">
        {adminNavLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-base ${
              pathname === link.url ? "text-redhot font-bold" : "text-gray-600"
            }`}
          >
            {link.icon} <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="flex gap-4 text-base items-center">
        <UserIcon/>
        <p>Editer le profil</p>
      </div>
    </div>
  );
};

export default LeftSideBar;
