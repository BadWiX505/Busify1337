'use client'

import { useState, useEffect } from 'react';
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function Navbare() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedIssue, setExpandedIssue] = useState(null); // To keep track of expanded issue

  useEffect(() => {
    // Fetch issues when component mounts
    fetchIssues();
  }, []);

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const formattedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${formattedDate} | ${hours}:${minutes}`;
  };

  const fetchIssues = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/Issue/getIssue');
      if (!response.ok) {
        throw new Error('Failed to fetch issues');
      }
      const issuesData = await response.json();
      setIssues(issuesData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleIssueClick = (issue) => {
    setExpandedIssue(expandedIssue === issue ? null : issue);
  };

  const issueCount = issues.length;

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm flex items-center justify-between px-4 py-4 md:px-6">
      <div className="flex items-center">
        <h1 className="text-lg font-bold text-gray-800 dark:text-gray-200">Dashboard</h1>
      </div>
      <div className="flex items-center relative">
        <div className="ml-4 relative" style={{ paddingRight: '10px' }}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="rounded-full relative"
                size="icon"
                variant="outline"
                onClick={fetchIssues} // Call fetchIssues on button click
              >
                <BellIcon className="w-4 h-4" />
                {issueCount > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">{issueCount}</div>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Card className="shadow-none border-0">
                <CardHeader className="border-b">
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {loading && <p>Loading...</p>}
                  {error && <p>{error}</p>}
                  {issues.length > 0 ? (
                    issues.map(issue => (
                      <div key={issue.id_issue} className="mb-4">
                        <div className="flex items-center mb-2 cursor-pointer" onClick={() => handleIssueClick(issue)}>
                          <div className="mr-2">
                            <TriangleAlertIcon />
                          </div>
                          <div className="flex-grow">
                            <p className="text-red-500 font-bold">{issue.issueType}</p>
                            <p className="text-sm text-gray-500">{formatTime(issue.reported_at)}</p>
                          </div>
                          <button 
                            className="ml-auto p-0.5 flex items-center text-xs text-gray-500" 
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent triggering the parent div's click event
                              window.location.href = '/Issues'; // Navigate to the /Issues page
                            }}
                          >
                            <EyeIconOutline className="w-4 h-4 mr-1" /> View
                          </button>
                        </div>

                        {expandedIssue === issue && (
                          <div>
                            <div className="flex justify-between mb-2">
                              <p className="font-semibold">Driver:</p>
                              <p>{issue.driver.full_name}</p>
                            </div>
                            <div className="flex justify-between mb-2">
                              <p className="font-semibold">Bus:</p>
                              <p>{issue.bus.bus_Name}</p>
                            </div>
                            {/* Add other issue details as needed */}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">There are no issues at the moment.</p>
                  )}
                </CardContent>
              </Card>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center">
          <div className="ml-4 relative">
            <div className="grid gap-0.5 text-sm" style={{ paddingRight: '10px' }}>
              <div className="font-semibold">Jardani Youssef</div>
              <div className="text-gray-500 dark:text-gray-400">1337 Stagaire</div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="ml-4 relative">
            <Avatar>
              <AvatarImage alt="@shadcn" src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}

function BellIcon(props) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function TriangleAlertIcon(props) {
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
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}

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
