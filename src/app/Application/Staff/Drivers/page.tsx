"use client"

import React, { useState, useEffect } from "react";
import DriverDetails from "@/components/staff/Drivers/DriverDetails";
import DriverTable from "@/components/staff/Drivers/DriverTable";
import PageTitle from "@/components/staff/PageTitle";

interface User {
  id_User: string;
  full_name: string;
  image?: string[];
  role: string;
  status?: string;
  default_Adress_lat?: number;
  default_Adress_lng?: number;
  default_time?: string;
  salary_per_hour: Float32Array;
  driving_hours: string;
}

const DriversPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch("/api/Staff/User/getDrivers");
        if (!response.ok) {
          throw new Error("Failed to fetch drivers");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  const handleDetailsClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleClose = () => {
    setSelectedUser(null);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/Staff/User/updateDriverStatus`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (!response.ok) {
        throw new Error("Failed to update status");
      }
      const updatedUser = await response.json();
      setUsers((users) =>
        users.map((user) => (user.id_User === id ? updatedUser : user))
      );
      if (selectedUser && selectedUser.id_User === id) {
        setSelectedUser(updatedUser);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
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
      <PageTitle title="Drivers" />
      <br />
      <DriverTable drivers={users} onDetailsClick={handleDetailsClick} />
      {selectedUser && (
        <DriverDetails
          driver={selectedUser}
          onClose={handleClose}
          isOpen={true}
          onStatusChange={(newStatus) =>
            handleStatusChange(selectedUser.id_User, newStatus)
          }
        />
      )}
    </div>
  );
};

export default DriversPage;