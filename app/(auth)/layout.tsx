import { FC, ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children}) => {
    return <div className=" bg-transparent">{children}</div>
}

export default AuthLayout;