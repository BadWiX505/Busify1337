import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"


export default function MonthlyBookingPerDay() {
  const [bookingData, setBookingData] = useState([]);
  const [monthYear, setMonthYear] = useState("");
  const [bookingsPerDay, setBookingsPerDay] = useState([]);

  useEffect(() => {
    // Fetch booking data and set the latest booking date
    async function fetchBookingData() {
      try {
        const response = await fetch("/api/Booking/getBooking");
        if (!response.ok) {
          throw new Error("Failed to fetch booking data");
        }
        const data = await response.json();
        setBookingData(data);

        // Find the latest booking date
        const latestBooking = new Date(Math.max(...data.map(booking => new Date(booking.bookedAt))));
        const month = latestBooking.toLocaleString('default', { month: 'long' });
        const year = latestBooking.getFullYear();
        setMonthYear(`${month} ${year}`);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    }

    fetchBookingData();
  }, []);

  useEffect(() => {
    // Calculate bookings per day for the current month
    const getBookingsPerDay = () => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Get the total number of days in the current month
      const bookingsPerDay = Array.from({ length: daysInMonth }, (_, i) => ({ x: i + 1, y: 0 })); // Initialize each day with 0 bookings

      bookingData.forEach(booking => {
        const date = new Date(booking.bookedAt).getDate();
        if (bookingsPerDay[date - 1]) {
          bookingsPerDay[date - 1].y++;
        }
      });

      return bookingsPerDay;
    };

    setBookingsPerDay(getBookingsPerDay());
  }, [bookingData]);

  return (
    <Card className="col-span-2 lg:col-span-3">
           <CardHeader>
             <CardTitle>{`Monthly Booking per Day (Month: ${monthYear})`}</CardTitle>
           </CardHeader>
           <CardContent>
             <LineChart2 data={bookingsPerDay} className="w-full aspect-[4/3]" />
           </CardContent>
         </Card>
  );
}


function LineChart2({ data, ...props }) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[{ id: "Bookings", data }]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{ type: "point" }} // Set xScale to "point"
        yScale={{ type: "linear", min: 0 }}
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
            total bookings this day: {point.data.y}
          </div>
        )}
        role="application"
      />
    </div>
  );
}
