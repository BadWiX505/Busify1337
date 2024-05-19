// import { PrismaClient } from '@prisma/client';

import prisma from '@/lib/prisma';


// let prisma;

// // Ensure the instance is only created once
// if (!prisma) {
//   prisma = new PrismaClient();
// }



export async function createUserAndKey(userInfo) {
  try {
    const user = await prisma.user.create({
      data: {
        full_name: userInfo.full_name,
        image: userInfo.image || null,
        role: userInfo.role,
        status: userInfo.status || "active",
        default_Adress_lat: userInfo.default_Address.lat || null,
        default_Adress_lng: userInfo.default_Address.lng || null,
        default_time: userInfo.default_time || null,
      },
    });

    const key = await prisma.key.create({
      data: {
        userName: userInfo.userName,
        email: userInfo.email,
        user: {
          connect: { id_User: user.id_User },
        },
      },
    });

    console.log("User created:", user);
    console.log("Key created:", key);

    return { user, key };
  } catch (error) {
    console.error("Error creating user and key:", error);
    return null;
  }
}


export async function checkUserExistance(data) {
  try {
    const checkUser = await prisma.key.findFirst({
      where: {
        email: data.email,
        userName: data.userName,
      },
    });

    if (checkUser) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking user:", error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUserRole(userData) {
  try {
    // Query the user based on email and userName
    const user = await prisma.user.findFirst({
      where: {
        key: {
          email: userData.email
        },
        AND: [
          { key: { userName: userData.userName } }
        ]
      },
      select: {
        role: true ,
        id_User : true
      }
    });

    if (user) {
     return user;
    } else {
     return null;
    }
  } catch (error) {
    console.error('Error getting user role:', error);
    return null;
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client
  }
}







export async function getUserDefaultThings(userId) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id_User: userId,
      },
      select: {
        default_time: true,
        default_Adress_lat: true,
        default_Adress_lng: true,
      },
    });
    return user;
  } catch (error) {
    console.error("Error :", error);
    return null;
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client
  }
}













//// Available times

export async function getDepartTimesExceedingTotalSeats(date) {
  try {
    // Step 1: Calculate total capacity of all buses
    const totalCapacityResponse = await prisma.bus.aggregate({
      where: {
        bus_Status: "active"
      },
      _sum: {
        bus_Capacity: true,
      },
    });
    const totalSeats = totalCapacityResponse._sum.bus_Capacity;


    // Step 2: Get counts of depart_times for the specific date
    const bookingCounts = await prisma.booking.groupBy({
      by: ['depart_Time'],
      where: {
        depart_Date: date,
      },
      _count: {
        depart_Time: true,
      },
    });

    // Step 3: Find depart_times with counts exceeding total seats
    const departTimesExceedingTotalSeats = [];
    for (const bookingCount of bookingCounts) {
      if (bookingCount._count.depart_Time >= totalSeats) {
        departTimesExceedingTotalSeats.push({
          depart_Time: bookingCount.depart_Time,
          count: bookingCount._count.depart_Time,
        });
      }
    }

    return departTimesExceedingTotalSeats;

  } catch (error) {
    console.error("Error in getDepartTimesExceedingTotalSeats:", error);
    return null;
  }
}











export async function getAvailableTimes(date) {
  try {
    // Get depart times exceeding total seats
    const departTimesExceedingTotalSeats = await getDepartTimesExceedingTotalSeats(date);

    // Get all travel times
    const allTravelTimes = await prisma.travelTimes.findMany({
      orderBy: {
        
        id: 'desc'
      }
    });

    // Extract depart times exceeding total seats
    const departTimesSet = new Set(departTimesExceedingTotalSeats.map(item => item.depart_Time));

    // Find times that are not in departTimesExceedingTotalSeats
    const availableTimes = allTravelTimes.filter(time => !departTimesSet.has(time.time));

    return availableTimes;
  } catch (error) {
    console.error("Error in getAvailableTimes:", error);
    return null;
  }
}

/////////////////////////////////





import { z } from "zod";




// Function to check seat availability for a given booking request
export async function bookSeatOnNextAvailableBus(date, hour, userId, Adresslnt, Adresslng) {
  // Define schemas for input parameters
const DateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/,{ message: "Invalid Date" });
const HourSchema = z.string().regex(/^\d{2}:\d{2}$/,{ message: "Invalid Hour" });
const UserIdSchema = z.number().int({ message: "Invalid User Id" });
const AdresslntSchema = z.number({ message: "Invalid adresslnt" });
const AdresslngSchema = z.number({ message: "Invalid adresslng" });

let sucObject={status : null, message : null};

  try{
  // Validate input parameters
  const validatedDate = DateSchema.parse(date);
  const validatedHour = HourSchema.parse(hour);
  const validatedUserId = UserIdSchema.parse(userId);
  const validatedAdresslnt = AdresslntSchema.parse(Adresslnt);
  const validatedAdresslng = AdresslngSchema.parse(Adresslng);

  // Check if the user has already made a booking for the specified hour on the given date
  const existingBooking = await prisma.booking.findFirst({
    where: {
      user_id: validatedUserId,
      depart_Date: validatedDate,
      depart_Time: validatedHour,
    },
  });
  // If the user has already made a booking for the specified hour on the given date, return false
  if (existingBooking) {
    return sucObject={status : 500, message : "You have already made a booking at this hour on the specified date"}
  }




  // Query available buses for the requested date and time
  const availableBuses = await prisma.bus.findMany({
    where: {
      AND: [
        { bus_Status: "active" }, // Only consider active buses
      ],
    },
    orderBy: {
      id_Bus: "asc", // Order by bus ID to prioritize the first available bus
    },
  });

  let bookedOnBus = false;
  let selectdBus = null;
  // Loop through available buses
  for (const bus of availableBuses) {
    const bookedSeats = await prisma.booking.count({
      where: {
        bus_id: bus.id_Bus,
        depart_Date: validatedDate,
        depart_Time: validatedHour,
      },
    });
    const availableSeats = bus.bus_Capacity - bookedSeats;

    if (availableSeats > 0) {
      // If available seats found on this bus, create a booking
      selectdBus = bus.id_Bus;
      await prisma.booking.create({
        data: {
          user: { connect: { id_User: validatedUserId } },
          depart_Time: validatedHour,
          depart_Date: validatedDate,
          Adress_lnt: validatedAdresslnt,
          Adress_lng: validatedAdresslng,
          bookedAt : new Date(),
          bus: { connect: { id_Bus: bus.id_Bus } },
          bookingStatus : 'Pending'
        },
      });

      bookedOnBus = true;
     sucObject = {status : 201 , message: "Booking successfully"}


     let existingDuty = await prisma.duty.findFirst({
      where: {
        duty_Date: validatedDate,
        duty_Time: validatedHour,
        bus_id : selectdBus,
      },
    });

    // If duty does not exist, create a new duty
    if (!existingDuty) {
      existingDuty = await prisma.duty.create({
        data: {
          duty_Date: validatedDate,
          duty_Time: validatedHour,
          duty_Status: 'Pending', // You might want to set a default status
          bus_id : selectdBus,
        },
      });
    }
     
      break;
    }
  }
  
  if (!bookedOnBus) {
    sucObject = {status : 500 , message: "No seats available on any bus for the requested date and time."}
  }
}catch (error) {
  if (error instanceof z.ZodError) {
    console.error(error.errors.map(err => err.message).join("\n")); // Show only custom error messages
    sucObject = {status : 500 , message : error.errors[0].message }

  } else {
    console.log(error.message)
    sucObject = {status : 500 , message : "An unexpected error occurred , try again" }
  }
}finally{
  prisma.$disconnect();
  return sucObject;
}
}





// getUser infos for Student app
export async function getStudentDetails(userId) {
  try{
  const user = await prisma.user.findUnique({
    where: {
      id_User: userId,
    },
    include: {
      key: true,
    },
  });

  if (!user) {
     return null;
  }

  const { full_name, image, default_Adress_lat, default_Adress_lng, default_time } = user;
  const { email } = user.key;

  const allTravelTimes = await prisma.travelTimes.findMany({
    orderBy: {
      
      id: 'desc'
    }
  });

  return {
    fullName: full_name,
    Email : email,
    Image : image,
    defaultAddress: {
      lat: default_Adress_lat,
      lng: default_Adress_lng,
    },
    defaultTime: default_time,
    travelTimes : allTravelTimes
  };
}
catch(err){

console.log(err.message)
  return null;
}finally{
  prisma.$disconnect();
  
}
}



// update student info 
export async function updateUser(userId, lat, lng, newTime) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id_User: userId,
      },
      data: {
        default_Adress_lat: lat,
        default_Adress_lng: lng,
        default_time: newTime,
      },
    });
    return updatedUser;
  } catch (error) {
    console.error("Error updating user address and time:", error);
    return null;
  }finally{
    prisma.$disconnect(); 
  }
}


// find User Bookings 
export async function getStudentHistory(userId, offset, limit) {
  try {
    const userBookings = await prisma.user.findUnique({
      where: {
        id_User: userId // Replace userId with the actual user ID
      },
      select: {
        booking: {
          take: limit,
          skip: offset,
          select: {
            depart_Time: true,
            depart_Date: true,
            Adress_lnt: true,
            Adress_lng: true,
            bookedAt: true,
            bookingStatus: true,
            bus: {
              select: {
                bus_Name: true
              }
            }
          },
          orderBy: {
            bookedAt: 'desc'
          }
        }
      }
    });

    if (userBookings)
      return userBookings;
    else
      return null;
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}


export async function getPendingBookingsByUserId(userId) {
  try {
    const pendingBookings = await prisma.booking.findMany({
      where: {
        bookingStatus: 'Pending',
        user_id: userId
      },
      include: {
        bus: {
          select: {
            bus_Name: true
          }
        }
      },
      orderBy: {
        bookedAt: 'desc'
      }
    });
    return pendingBookings;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}


export async function getStudentTicket(idBooking) {
  try {
    const booking = await prisma.booking.findUnique({
      where: {
        id_Booking: idBooking,
      },
      include: {
        user: {
          select: {
            full_name: true,
            image: true,
          },
        },
        bus: {
          select: {
            bus_Name: true,
          },
        },
      },
    })

    if (!booking) {
     return null;
    }
    
    return {
      full_name: booking.user.full_name,
      image: booking.user.image,
      bus_Name: booking.bus.bus_Name,
      depart_Date: booking.depart_Date,
      depart_Time: booking.depart_Time,
      idBooking : 0
    }
  } catch (error) {
    console.error('Error fetching user and bus details:', error)
   return null;
  } finally {
    await prisma.$disconnect()
  }
}








//////////////////////////////////////////////////////////////////////////////////Driver ///////////////////////////////////////////


export async function getDriverInfo(userId) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id_User: userId,
      },
      select: {
        full_name: true,
        image: true,
      },
    });

    if (user) {
      user.busName = await getBusNameByDriverId(userId)
     return user;
    } else {
     return null;
    }
  } catch (error) {
    console.error("Error retrieving user info:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}


async function getBusNameByDriverId(driverId) {
  try {
    const bus = await prisma.bus.findFirst({
      where: {
        id_Driver: driverId,
      },
      select: {
        bus_Name: true,
      },
    });
    if (bus) {
      console.log(`Bus Name: ${bus.bus_Name}`);
      return bus.bus_Name;
    } else {
      console.log('No bus found for the given driver ID');
      return null;
    }
  } catch (error) {
    console.error('Error fetching bus name:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}



async function getDutyStatus(date, time, driverId) {
  try {
    // Find the bus ID associated with the provided driver ID
    const bus = await prisma.bus.findFirst({
      where: { id_Driver: driverId },
      select: { id_Bus: true }
    });

    if (!bus) {
      console.log("No bus found for the provided driver ID.");
      return null;
    }

    // Find the duty with the given date, time, and bus ID
    const duty = await prisma.duty.findFirst({
      where: {
        duty_Date: date,
        duty_Time: time,
        bus_id: bus.id_Bus
      },
      select: { duty_Status: true }
    });

    if (!duty) {
      console.log("No duty found for the provided date, time, and driver.");
      return null;
    }
 
    return duty.duty_Status;
  } catch (error) {
    console.error('Error getting duty status:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}


export async function getBookingCountsByTimeAndDate(driverId, date) {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        bus: {
          id_Driver: driverId,
        },
        depart_Date: date,
      },
      select: {
        depart_Time: true,
        depart_Date: true,
      }
    });

    const groupedBookings = {};
    bookings.forEach(booking => {
      const key = `${booking.depart_Date} ${booking.depart_Time}`;
      if (!groupedBookings[key]) {
        groupedBookings[key] = { date: booking.depart_Date, time: booking.depart_Time, count: 0 };
      }
      groupedBookings[key].count++;
    });

    // Convert the grouped bookings to an array
    const resultArray = Object.values(groupedBookings);

   

   if(resultArray){
    for(const item of resultArray){
        if(isCurrentMomentWithinTenMinutes(item.date,item.time)){

           const ok = await updateDutyStatus(item.date,item.time);
           
            if(!ok)
            throw new Error("some thing is wrong in table duties");

                     

           }

           item.status = await getDutyStatus(item.date,item.time,driverId);
        }

        return resultArray;
    }


   return null;


  } catch (error) {
    console.error("Error retrieving booking counts:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}




async function updateDutyStatus(date, time) {
  try {
    // Find duties with pending status for the given date and time
    const duties = await prisma.duty.findMany({
      where: {
        duty_Date: date,
        duty_Time: time,
        duty_Status: 'Pending'
      }
    });

    // Update duty status to 'Scanning' for found duties
    for (const duty of duties) {
      await prisma.duty.update({
        where: { id_Duty: duty.id_Duty },
        data: { duty_Status: 'Scanning' }
      });
      console.log(`Updated duty ${duty.id_Duty} status to 'Scanning'`);
    }

    return true;
  } catch (error) {
    console.error('Error updating duty status:', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}



  function isCurrentMomentWithinTenMinutes(date, time) {
    // Parse date and time strings into Date objects
    const dateTimeString = `${date}T${time}`;
    const targetTime = new Date(dateTimeString);
    
    // Subtract 10 minutes from the target time
    const tenMinutesAgo = new Date(targetTime.getTime() - 10 * 60000); // 10 minutes in milliseconds
    
    // Get the current time
    const currentTime = new Date();

    // Compare current time with 10 minutes ago
    return currentTime >= tenMinutesAgo;
}




export async function getBookingsDetails(driverId,departTime, departDate,take,skip) {
  try {
    const userInfoWithBookingAddress = await prisma.booking.findMany({
      where: {
        depart_Time: departTime,
        depart_Date: departDate,
        bus: {
          id_Driver: driverId,
        },
      },
      select: {
    
        user: {
          select: {
            full_name: true,
            image: true,
          }
        },
        Adress_lnt: true,
        Adress_lng: true,
      },
      take: parseInt(take),
      skip: parseInt(skip),
    });


   if(userInfoWithBookingAddress){
    return userInfoWithBookingAddress;
   }
   return null;
  } catch (error) {
    console.error("Error retrieving user info and booking address:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}


export async function getCountsForScanning(departDate, departTime, busName) {
  try {
    const completedCount = await prisma.booking.count({
      where: {
        depart_Date: departDate,
        depart_Time: departTime,
        bus: {
          bus_Name: busName
        },
        bookingStatus: 'Completed'
      }
    });

    const pendingCount = await prisma.booking.count({
      where: {
        depart_Date: departDate,
        depart_Time: departTime,
        bus: {
          bus_Name: busName
        },
      }
    });

    return { completed: completedCount, total: pendingCount };
  } catch (error) {
    console.error('Error fetching booking counts:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}



export  async function completeBooking(idBooking) {
  try {
    // Fetch the booking with the given id_Booking and status "Pending"
    const booking = await prisma.booking.findFirst({
      where: {
        id_Booking: idBooking,
        bookingStatus: 'Pending'
      }
    });

    if (!booking) {
      console.log('No pending booking found with the given id.');
      return false;
    }

    // Update the bookingStatus to "Completed"
    const updatedBooking = await prisma.booking.update({
      where: {
        id_Booking: idBooking
      },
      data: {
        bookingStatus: 'Completed'
      }
    });

   return true;

  } catch (error) {
    console.error('Error updating booking status:', error);
    return false;
    
  } finally {
    await prisma.$disconnect();
  }
}