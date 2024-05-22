import UserSideBar from "@/components/user/UserSideBar";
import React from "react";
import { Toaster } from "react-hot-toast";

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Toaster />
            <section >
                <div className="flex max-lg:flex-col gap-3">
                    <UserSideBar />
                    <div className="flex-1">{children}</div>
                </div>
            </section>
        </>
    )

}