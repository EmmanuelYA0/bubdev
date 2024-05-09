import LeftSideBar from '@/components/layout/LeftSideBar';
import { Metadata } from 'next';
import ProtectedRoute from '@/components/admin/protectedAdminRoute';


export const metadata: Metadata = {
    title: "BubblyApp - Admin",
    description: "Admin dashboard of Bubbly",
};
export default function DashboardLayout({

    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ProtectedRoute>
            <section>
                <div className="flex max-lg:flex-col text-gray-600">
                    <LeftSideBar />
                    <div className="flex-1">{children}</div>
                </div>
            </section>
        </ProtectedRoute>
    )
}