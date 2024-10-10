import React, { useEffect, useState } from "react";
import ConfirmActionModal from "../../../Components/Dashboard/Modal/ConfirmActionModal";

interface User {
  _id: string;
  email: string;
  fullName: string; // Ensure 'fullName' is the correct field
  status: string;
}

const ReporterRequestManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [action, setAction] = useState<"approve" | "cancel" | null>(null);

  // Fetch users with pending reporter requests
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("https://global-news-server-phi.vercel.app/pending-reporter-requests");
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleAction = (user: User, action: "approve" | "cancel") => {
    setSelectedUser(user);
    setAction(action);
  };

  const onConfirmAction = async (confirmed: boolean) => {
    if (confirmed && selectedUser && action) {
      const response = await fetch("https://global-news-server-phi.vercel.app/admin/approve-request", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: selectedUser.email, action }),
      });

      const result = await response.json();
      if (result.modifiedCount > 0) {
        alert(`${action === "approve" ? "Approved" : "Denied"} successfully!`);
        setUsers((prev) =>
          prev.filter((user) => user.email !== selectedUser.email)
        );
      } else {
        alert("Action failed!");
      }
    }
    setSelectedUser(null);
    setAction(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Reporter Request Management</h1>

      <div className="bg-white shadow-md rounded-lg p-4">
        {users.length === 0 ? (
          <p>No pending reporter requests.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2">Full Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="py-2">{user.fullName}</td> {/* Change 'user.name' to 'user.fullName' */}
                  <td className="py-2">{user.email}</td>
                  <td className="py-2 flex gap-2">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                      onClick={() => handleAction(user, "approve")}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      onClick={() => handleAction(user, "cancel")}
                    >
                      Deny
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedUser && action && (
        <ConfirmActionModal
          user={selectedUser}
          action={action}
          onConfirm={onConfirmAction}
        />
      )}
    </div>
  );
};

export default ReporterRequestManagement;
