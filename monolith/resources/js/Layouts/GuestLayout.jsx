import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import '../../css/app.css';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-white pt-10 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    <ApplicationLogo className="h-32 w-auto" />
                </Link>
            </div>

            <div className="mt-10 w-full overflow-hidden  border border-slate-100 bg-white px-6 py-8 sm:max-w-md">
                {children}
            </div>
        </div>
    );
}
