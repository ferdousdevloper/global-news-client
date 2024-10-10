import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface RequestReporterModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string; // assuming you pass the logged-in user's email
}

const RequestReporterModal: React.FC<RequestReporterModalProps> = ({
  isOpen,
  onClose,
  userEmail,
}) => {
  const [email, setEmail] = useState(userEmail);
  const [fullName, setFullName] = useState(""); // Full Name state
  const [imageUrl, setImageUrl] = useState(""); // Image URL state
  const [status, setStatus] = useState<null | string>(null); // to store request status

  useEffect(() => {
    if (email && isOpen) {
      // Fetch current status of user's reporter request
      const fetchRequestStatus = async () => {
        const response = await fetch(`https://global-news-server-phi.vercel.app/request-status?email=${email}`);
        const result = await response.json();
        setStatus(result.status); // Assuming result contains 'status'
      };

      fetchRequestStatus();
    }
  }, [email, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("https://global-news-server-phi.vercel.app/request-reporter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, fullName, imageUrl }), // Include full name and image URL in request body
    });

    const result = await response.json();
    if (result.modifiedCount > 0) {
      alert("Request sent successfully!");
      setStatus("Requested"); // Update status to 'Requested' after successful request
    } else {
      alert("Failed to send request!");
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg max-w-md w-full text-black">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Request to Become a Reporter</h2>
          <button onClick={onClose}>
            <AiOutlineClose size={24} className="text-black" />
          </button>
        </div>

        {/* Show status if it exists */}
        {status && (
          <div className="mb-4">
            <p className={`text-sm ${status === "Requested" ? "text-yellow-500" : "text-red-500"}`}>
              Current Request Status: {status}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Full Name Field */}
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-900">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Image URL Field */}
          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-900">
              Image URL
            </label>
            <input
              id="imageUrl"
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg"
              disabled={status === "Requested"} // Disable submit if already requested
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestReporterModal;
