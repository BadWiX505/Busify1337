import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"


export default function DrivingHoursPerDriver() {
  const [driverData, setDriverData] = useState([]);
  const [totalDrivingHours, setTotalDrivingHours] = useState(0);

  useEffect(() => {
    // Fetch driver data and calculate total driving hours
    async function fetchDriverData() {
      try {
        const response = await fetch("/api/User/getDrivers");
        if (!response.ok) {
          throw new Error("Failed to fetch driver data");
        }
        const data = await response.json();
        setDriverData(data);

        // Calculate total driving hours
        const totalHours = data.reduce((total, driver) => total + parseFloat(driver.driving_hours || 0), 0);
        setTotalDrivingHours(totalHours);
      } catch (error) {
        console.error("Error fetching driver data:", error);
      }
    }

    fetchDriverData();
  }, []);

  const driverHoursWithPercentage = driverData.map(driver => ({
    id: driver.full_name,
    label: driver.full_name,
    value: parseFloat(driver.driving_hours || 0),
    percentage: totalDrivingHours !== 0 ? ((parseFloat(driver.driving_hours || 0) / totalDrivingHours) * 100).toFixed(2) : 0,
  }));

  return (
    <Card className="col-span-1 lg:col-span-2">
         <CardHeader>
           <CardTitle>Driving Hours per Driver</CardTitle>
         </CardHeader>
         <CardContent className="flex flex-col items-center justify-center pt-15px">
             <PieChart data={driverHoursWithPercentage} className="w-[600px] h-[400px]" />
         </CardContent>
       </Card>
  );
}


function PieChart({ data, ...props }) {
  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: 'auto' }} {...props}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: 'nivo' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextColor="#333333"
        radialLabelsLinkColor={{ from: 'color' }}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#333333"
        tooltip={({ datum }) => (
          <div style={{ background: "white", padding: "10px", borderRadius: "5px", fontSize: "12px", display: "flex", alignItems: "center" }}>
            <img
              src={datum.data.image || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAbFBMVEUAAADmzEu6VyF+AAAAAElFTkSuQmCC"} // Render default user PNG if image is not available
              alt={datum.label}
              style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }}
              onError={(e) => { e.currentTarget.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAbFBMVEUAAAD////u7u7t7e32AAAAElFTkSuQmCC";
               e.currentTarget.onerror = null; }} // Handle error and set it to default user PNG
            />
            <div>
              <strong>{datum.label}</strong>
              <br />
              {datum.value} hours ({datum.data.percentage}%)
            </div>
          </div>
        )}
      />
    </div>
  );
}