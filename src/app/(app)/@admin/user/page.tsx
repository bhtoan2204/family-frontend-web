import { CustomBreadcrumb } from "@/components/breadcrumb";
import UserTable from "@/components/table/user-table";

const UserPage = () => {
  return (
    <>
      <CustomBreadcrumb pageName="User" />

      <UserTable />
    </>
  );
};

export default UserPage;
