// /Students/UserTable

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Badge from '@/components/ui/Badge2';
import usePagination from './usePagination';
import UserDetailsModal from './UserDetailsModal';
import { User } from "@prisma/client";

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const ITEMS_PER_PAGE = 5;
  const [isHovering, setIsHovering] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortedUsers, setSortedUsers] = useState(users);
  const [{ currentPage, totalPages }, nextPage, prevPage] = usePagination({
    totalItems: sortedUsers.length,
    itemsPerPage: ITEMS_PER_PAGE,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const handleStatusUpdate = (updatedUser: User) => {
    const updatedUsers = sortedUsers.map(u => u.id_User === updatedUser.id_User ? updatedUser : u);
    setSortedUsers(updatedUsers);
  };
  
  useEffect(() => {
    handleSortByName();
  }, []); // Initial sort on component mount
  

  const handleSortByName = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    const sorted = [...sortedUsers].sort((a, b) => {
      return newSortOrder === 'asc' ? a.full_name.localeCompare(b.full_name) : b.full_name.localeCompare(a.full_name);
    });
    setSortedUsers(sorted);
  };


  const handleNextPage = () => {
    nextPage();
  };
  
  const handlePrevPage = () => {
    prevPage();
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-800">
            <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300" style={{ width: '150px' }}>Image</th>
            <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300" style={{ width: '200px' }}>
              <button className="focus:outline-none" onClick={handleSortByName}>
                Full Name {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300" style={{ width: '150px' }}>Role</th>
            <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300" style={{ width: '100px' }}>Status</th>
            <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300" style={{ width: '100px' }}>Details</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr key={user.id_User} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
              <td className="px-4 py-3">
                <img
                  alt={user.full_name}
                  className="rounded-full"
                  height={40}
                  src={user.image || "/placeholder.svg"}
                  style={{
                    aspectRatio: "40/40",
                    objectFit: "cover",
                  }}
                  width={40}
                />
              </td>
              <td className="px-4 py-3">
                <div className="space-y-1">
                  <div className="font-medium">{user.full_name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                </div>
              </td>
              <td className="px-4 py-3">{user.role}</td>
              <td className="px-4 py-3">
                {user.status === 'active' ? (
                  <Badge variant="success">{user.status}</Badge>
                ) : (
                  <Badge variant="danger">{user.status}</Badge>
                )}
              </td>
              <td className="px-4 py-3">
                <Button
                  size="sm"
                  variant="outline"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  onClick={() => {
                    setSelectedUser(user);
                    setIsModalOpen(true);
                  }}
                >
                  <EyeIconOutline className="w-4 h-4 mr-2" />
                  <p>View</p>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <div>
          <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
        </div>
        <div>
          <button
            className={`mr-2 px-4 py-2 ${currentPage === 1 ? 'bg-gray-500 text-gray-300' : 'bg-black text-white'} rounded`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className={`ml-2 px-4 py-2 ${currentPage === totalPages ? 'bg-gray-500 text-gray-300' : 'bg-black text-white'} rounded`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <UserDetailsModal user={selectedUser} onClose={() => setIsModalOpen(false)} isOpen={isModalOpen} onUpdateStatus={handleStatusUpdate} />
    </div>
  );
};

export default UserTable;

function EyeIconOutline(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}