"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { UserRoundCheck, LogOut, User2, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

const UserDropdown = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <>
      {/* <pre>{JSON.stringify(session)}</pre> */}
      {session?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <UserRoundCheck
              strokeWidth={1}
              height={35}
              width={35}
              className=" stroke-myblack bg-transparent hidden lg:flex cursor-pointer hover:stroke-[#4A050D] hover:scale-125"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52 bg-redhot">
            <DropdownMenuItem className="bg-transparent">
              <Button
                className="bg-transparent hover:bg-transparent h-4"
                onClick={() => router.push("/user")}
              >
                <User2 stroke="white" className="bg-transparent mr-2 h-4 w-4" />
                <span className="text-white capitalize bg-transparent">
                  {session?.user.username
                    ? session.user.username
                    : session.user.name}
                </span>
              </Button>
            </DropdownMenuItem>

            {session?.user.role === "ADMIN" && (
              <DropdownMenuItem className="bg-transparent">
                <Button
                  className="bg-transparent hover:bg-transparent h-4"
                  onClick={() => router.push("/admin")}
                >
                  <LayoutDashboard
                    stroke="white"
                    className="bg-transparent mr-2 h-4 w-4"
                  />
                  <span className="text-white capitalize bg-transparent">
                    {" "}
                    Tableau de bord
                  </span>
                </Button>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="bg-transparent">
              <Button
                onClick={() => {
                  signOut();
                  localStorage.removeItem("userUsername");
                }}
                className="bg-transparent hover:bg-transparent h-4"
              >
                <LogOut
                  stroke="white"
                  className="bg-transparent mr-2 h-4 w-4"
                />
                <span className="text-white bg-transparent">Log out</span>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        // <Link href='/login' className='bg-transparent'>
        //     <UserRoundCheck
        //      strokeWidth={1}
        //      height={35}
        //      width={35}
        //      className=' stroke-myblack bg-transparent hidden lg:flex cursor-pointer hover:stroke-[#4A050D] hover:scale-125'
        //     />
        // </Link>
          <Link href="/login" className="bg-transparent">
            <Image
              src="/avatar.svg"
              alt="avatar-icon"
              width={35}
              height={35}
              className="bg-transparent hidden h-full lg:flex cursor-pointer hover:stroke-[#4A050D] hover:scale-125"
            />
          </Link>
      )}
    </>
  );
};

export default UserDropdown;
