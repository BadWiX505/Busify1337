'use client';

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EntityWithHoverCard from '@/components/staff/Issues/EntityWithHoverCard';
import ConfirmationPopUp from '@/components/staff/Issues/ConfirmationPopUp';

interface Issue {
  id_issue: number;
  issueType: string;
  reported_at: string;
  status: string;
  driver: {
    id_User: number;
    full_name: string;
    image: string;
    email: string;
    status: string;
    role: string;
  };
  bus: {
    id_Bus: number;
    bus_Name: string;
    image: string;
    bus_Status: string;
  };
}

const PageName: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const totalPages = Math.ceil(issues.length / pageSize);



  // Get the current page of issues
const startIndex = (currentPage - 1) * pageSize;
const endIndex = Math.min(startIndex + pageSize, issues.length);
const currentIssues = issues.slice(startIndex, endIndex);


// Functions to handle pagination
const nextPage = () => {
  setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
};

const prevPage = () => {
  setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
};

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${formattedDate} | ${hours}:${minutes}`;
  };

  useEffect(() => {
    fetchAllIssues();
  }, []);

  const fetchAllIssues = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/Staff/Issue/getAllIssues');
      if (!response.ok) {
        throw new Error('Failed to fetch issues');
      }
      const data = await response.json();
      setIssues(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmOpen = (issue: Issue) => {
    setSelectedIssue(issue);
    setConfirmationOpen(true);
    console.log(issue.id_issue, issue.status);
  };
  
  const handleConfirmClose = () => {
    setSelectedIssue(null);
    setConfirmationOpen(false);
  };

  const handleConfirmation = async () => {
    if (!selectedIssue || !selectedIssue.id_issue || !selectedIssue.status) {
      console.error('Issue ID and status are required');
      toast.error('Issue ID and status are required', {
        position: 'bottom-right',
      });
      return;
    }
  
    try {
      const response = await fetch('/api/Staff/Issue/updateIssueStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          issueId: selectedIssue.id_issue,
          newStatus: selectedIssue.status === 'active' ? 'inactive' : 'active',
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update issue status');
      }
  
      setConfirmationOpen(false);
      setSelectedIssue(null);
  
      toast.success('Issue status updated successfully!', {
        position: 'bottom-right',
      });
  
      setTimeout(() => {
        window.location.reload();
      }, 6000);
    } catch (error) {
      console.error('Error updating issue status:', error);
      toast.error('Failed to update issue status!', {
        position: 'bottom-right',
      });
    }
  };

  const handleSortByDate = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    const sorted = [...issues].sort((a, b) => {
      return newSortOrder === 'asc' ? new Date(a.reported_at).getTime() - new Date(b.reported_at).getTime() : new Date(b.reported_at).getTime() - new Date(a.reported_at).getTime();
    });
    setIssues(sorted);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img
          src="https://gifdb.com/images/high/funny-loading-vegetable-vm0664kd44rc3jk2.webp"
          alt="Loading"
          style={{ width: "200px", height: "200px" }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-4">Issues</h1>
      <div className="w-full max-w-full overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800">
              <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300" style={{ width: '200px' }}>Driver</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300" style={{ width: '200px' }}>Bus</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300" style={{ width: '150px' }}>
                <button className="focus:outline-none" onClick={handleSortByDate}>
                  Reported At {sortOrder === 'asc' ? '↑' : '↓'}
                </button>
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300" style={{ width: '150px' }}>Issue</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300" style={{ width: '100px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {issues.map(issue => (
              <tr
                key={issue.id_issue}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <td className="px-4 py-3">
                  <EntityWithHoverCard entity={issue.driver} />
                </td>
                <td className="px-4 py-3">
                  <EntityWithHoverCard entity={issue.bus} isBus />
                </td>
                <td className="px-4 py-3">{formatTime(issue.reported_at)}</td>
                <td className="px-4 py-3">{issue.issueType}</td>
                <td className="px-4 py-3">
                  {issue.status === 'active' ? (
                    <span className="flex items-center">
                      <span className="text-green-500">Handled</span>
                      <svg className="ml-1 h-4 w-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18.707 2.293a1 1 0 1 1 1.414 1.414l-14 14a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 1.414-1.414L5 13.586 18.293.293a1 1 0 0 1 1.414 0z" clipRule="evenodd"/>
                      </svg>
                    </span>
                  ) : (
                    <button onClick={() => handleConfirmOpen(issue)} className="px-3 py-1 rounded-md border border-gray-500 text-gray-700 hover:bg-gray-200">
                      Confirm
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <button
            className={`mr-2 px-4 py-2 ${currentPage === 1 ? 'bg-gray-500 text-gray-300' : 'bg-black text-white'} rounded`}
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className={`ml-2 px-4 py-2 ${currentPage === totalPages ? 'bg-gray-500 text-gray-300' : 'bg-black text-white'} rounded`}
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <ConfirmationPopUp isOpen={confirmationOpen} onCancel={handleConfirmClose} onConfirm={handleConfirmation} issueId={selectedIssue?.id_issue} issueStatus={selectedIssue?.status} />
    </div>
  );
};

export default PageName;

