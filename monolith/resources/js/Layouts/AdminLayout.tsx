import DashboardLayout from './DashboardLayout';
import { PropsWithChildren } from 'react';
import '../../css/admin.css';

const AdminLayout = ({ children }: PropsWithChildren) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default AdminLayout;
