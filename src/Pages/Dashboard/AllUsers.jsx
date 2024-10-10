import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
  // Fetch all users using react-query with the Object form
  const { data: users = [], refetch, isLoading, error } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const { data } = await axios.get("https://global-news-server-phi.vercel.app/users"); // Update the URL if necessary
      return data;
    }
  });

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users: {error.message}</p>;


  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Make Admin??",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.patch(`https://global-news-server-phi.vercel.app/users/admin/${user._id}`).then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.name} is an Admin Now!`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  const handleMakeBlock = (user) => {
    axios.patch(`https://global-news-server-phi.vercel.app/users/block/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("Successfully user Blocked");
      }
    });
  };

  const handleMakeActive = (user) => {
    axios.patch(`https://global-news-server-phi.vercel.app/users/active/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("Successfully user Active");
        // Swal.fire({
        //   position: "top-end",
        //   icon: "success",
        //   title: `${user.name} is an Admin Now!`,
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
      }
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://global-news-server-phi.vercel.app/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      
      <h1 className="text-xl md:text-6xl fontBebas font-extrabold text-center mb-10">
        ALL USERS
      </h1>
      <hr className="my-10 border-2" />
      <div className="overflow-x-auto border glass rounded-3xl">
        <table className="table  max-w-7xl mx-auto">
          {/* head */}
          <thead>
            <tr className="text-white">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.status === "active" ? (
                    <button
                      onClick={() => handleMakeBlock(user)}
                      className="btn btn-sm bg-green-500 text-white"
                    >
                      Active
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeActive(user)}
                      className="btn btn-sm bg-red-500 text-white"
                    >
                      Block
                    </button>
                  )}
                </td>
                <td>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-sm bg-colorPrimary"
                    >
                      <FaUsers
                        className="text-white 
                                        text-2xl"
                      ></FaUsers>
                    </button>
                  )}
                </td>
                
                <td>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-ghost btn-lg"
                  >
                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
                  </button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
