import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Trash2 } from "lucide-react";

export const UsersTab = () => {
  const users = [
    {
      id: "1",
      name: "John Smith",
      email: "john@acmecorp.co.za",
      role: "Administrator",
      status: "Active",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@acmecorp.co.za",
      role: "Payroll Manager",
      status: "Active",
    },
    {
      id: "3",
      name: "Michael Naidoo",
      email: "michael@acmecorp.co.za",
      role: "Finance Director",
      status: "Active",
    },
    {
      id: "4",
      name: "Priya Patel",
      email: "priya@acmecorp.co.za",
      role: "Payroll Administrator",
      status: "Invited",
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage system users and permissions</CardDescription>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {user.status === "Active" ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      Invited
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-medium">Role Permissions</h3>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Administrator</CardTitle>
              <CardDescription>Full system access and configuration privileges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="admin-employees">Manage Employees</Label>
                    <Switch id="admin-employees" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="admin-payroll">Process Payroll</Label>
                    <Switch id="admin-payroll" defaultChecked />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="admin-reports">Generate Reports</Label>
                    <Switch id="admin-reports" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="admin-payments">Approve Payments</Label>
                    <Switch id="admin-payments" defaultChecked />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="admin-users">Manage Users</Label>
                    <Switch id="admin-users" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="admin-settings">System Settings</Label>
                    <Switch id="admin-settings" defaultChecked />
                  </div>
                </div>
              </div>
              <Button className="mt-4" variant="outline" size="sm">
                <Trash2 className="h-4 w-4 mr-1" />
                Delete Role
              </Button>
            </CardContent>
          </Card>

          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Role
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
