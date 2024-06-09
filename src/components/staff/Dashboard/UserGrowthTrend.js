import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"


export default function UserGrowthTrend() {
  const [newUsersPerDay, setNewUsersPerDay] = useState([]);

  useEffect(() => {
    // Fetch student data and process it to get new users per day
    async function fetchStudentData() {
      try {
        const response = await fetch("/api/User/getStudents");
        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }
        const studentData = await response.json();

        // Process student data to get the count of students created per day
        const newUserPerDay = {};
        let cumulativeSum = 0;
        studentData.forEach(student => {
          const date = new Date(student.createdAt).toLocaleDateString();
          cumulativeSum++;
          newUserPerDay[date] = cumulativeSum;
        });
        const newUserPerDayArray = Object.entries(newUserPerDay).map(([date, count]) => ({ x: date, y: count }));
        setNewUsersPerDay(newUserPerDayArray);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    }

    fetchStudentData();
  }, []);

  return (
    <Card className="col-span-1 lg:col-span-2">
         <CardHeader>
          <CardTitle>User Growth Trend</CardTitle>
         </CardHeader>
        <CardContent>
           <LineChart data={newUsersPerDay} className="w-full aspect-[4/3]" />
         </CardContent>
       </Card>
  );
}


function LineChart({ data, ...props }) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[{ id: "Bookings", data }]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear" }}
        axisBottom={{ tickSize: 0, tickPadding: 16 }}
        axisLeft={{ tickSize: 0, tickValues: 5, tickPadding: 16 }}
        colors={["#2563eb"]}
        pointSize={6}
        useMesh={true}
        gridYValues={5}
        theme={{
          tooltip: { container: { fontSize: "12px", textTransform: "capitalize", borderRadius: "6px" } },
          grid: { line: { stroke: "#f3f4f6" } },
        }}
        tooltip={({ point }) => (
          <div style={{ background: "white", padding: "5px", borderRadius: "5px", fontSize: "10px" }}>
            {point.data.x}: total users joined : {point.data.y}
          </div>
        )}
        role="application"
      />
    </div>
  );
}
