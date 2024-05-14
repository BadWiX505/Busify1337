import { BookingStatus, PrismaClient } from '@prisma/client';

let prisma;

// Ensure the instance is only created once
if (!prisma) {
  prisma = new PrismaClient();
}



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
    }
  } catch (error) {
    console.error('Error fetching user and bus details:', error)
   return null;
  } finally {
    await prisma.$disconnect()
  }
}