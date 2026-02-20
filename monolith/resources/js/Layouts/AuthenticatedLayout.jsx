import DashboardLayout from './DashboardLayout';

export default function AuthenticatedLayout({ header, children }) {
    return (
        <DashboardLayout>
            {header && <div className="mb-6">{header}</div>}
            {children}
        </DashboardLayout>
    );
}
