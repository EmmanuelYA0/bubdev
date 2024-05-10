import LeftSideBar from '@/components/layout/LeftSideBar';
import { Metadata } from 'next';
import ProtectedRoute from '@/components/admin/protectedAdminRoute';
import { Toaster } from 'react-hot-toast';


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
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=" bg-transparent"
                containerStyle={{}}
                toastOptions={{
                    // Define default options
                    className: 'bg-transparent',
                    duration: 5000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },

                    // Default options for specific types
                    success: {
                        duration: 3000,
                    },
                }}
            />
            <section>
                <div className="flex max-lg:flex-col text-gray-600">
                    <LeftSideBar />
                    <div className="flex-1">{children}</div>
                </div>
            </section>
        </ProtectedRoute>
    )
}