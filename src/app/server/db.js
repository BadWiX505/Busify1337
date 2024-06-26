import { isInTravelsTime, isFutureDateTime } from '@/utils/dateUtils';
import { z } from "zod";

import prisma from '@/lib/prisma';




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


export async function getStudentsReportsHistory(idS) {
  try {
    const reports = await prisma.studentProblem.findMany({
      where: {
        id_Student: idS,
      },
      orderBy : {
        reportedAt : 'desc',
      }
    })

    if (reports) {
      return reports;
    }

    return null;
  } catch (err) {
    console.log(err)
    return null;
  }  finally {
    prisma.$disconnect();
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




export async function getAlltravelTimes() {
  try {
    const travelsTime = await prisma.travelTimes.findMany({
      orderBy: {
        id: 'desc'
      }
    });
    return travelsTime;
  }

  catch (err) {
    console.log(err)
    return null;
  }
  finally {
    prisma.$disconnect();
  }
}



export async function createStudentProblem(idStudent, message) {
  try {
    const newProblem = await prisma.studentProblem.create({
      data: {
        id_Student: idStudent,
        content: message,
      },
    });

    if (!newProblem) {
      return false;
    }

    return true;
  } catch (err) {
    console.log(err)
    return false;
  }  finally {
    prisma.$disconnect();
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









// Function to check seat availability for a given booking request
export async function bookSeatOnNextAvailableBus(date, hour, userId, Adresslnt, Adresslng) {
  // Define schemas for input parameters
  const DateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Invalid Date" });
  const HourSchema = z.string().regex(/^\d{2}:\d{2}$/, { message: "Invalid Hour" });
  const UserIdSchema = z.string({ message: "Invalid User" });
  const AdresslntSchema = z.number({ message: "Invalid adresslnt" });
  const AdresslngSchema = z.number({ message: "Invalid adresslng" });

  let sucObject = { status: null, message: null };

  try {
    // Validate input parameters
    const validatedDate = DateSchema.parse(date);
    const validatedHour = HourSchema.parse(hour);
    const validatedUserId = UserIdSchema.parse(userId);
    const validatedAdresslnt = AdresslntSchema.parse(Adresslnt);
    const validatedAdresslng = AdresslngSchema.parse(Adresslng);

    const isTimeExist = await isInTravelsTime(validatedHour);

    if (!isFutureDateTime(validatedDate, validatedHour) || !isTimeExist) {
      throw new Error("a prolem occurred in dates and times")
    }

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
      return sucObject = { status: 500, message: "You have already made a booking at this hour on the specified date" }
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
            bookedAt: new Date(),
            bus: { connect: { id_Bus: bus.id_Bus } },
            bookingStatus: 'Pending'
          },
        });

        bookedOnBus = true;
        sucObject = { status: 201, message: "Booking successfully" }


        let existingDuty = await prisma.duty.findFirst({
          where: {
            duty_Date: validatedDate,
            duty_Time: validatedHour,
            bus_id: selectdBus,
          },
        });

        // If duty does not exist, create a new duty
        if (!existingDuty) {
          existingDuty = await prisma.duty.create({
            data: {
              duty_Date: validatedDate,
              duty_Time: validatedHour,
              duty_Status: 'Pending', // You might want to set a default status
              bus_id: selectdBus,
            },
          });
        }

        break;
      }
    }

    if (!bookedOnBus) {
      sucObject = { status: 500, message: "No seats available on any bus for the requested date and time." }
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(error.errors.map(err => err.message).join("\n")); // Show only custom error messages
      sucObject = { status: 500, message: error.errors[0].message }

    } else {
      console.log(error.message)
      sucObject = { status: 500, message: "An unexpected error occurred , try again" }
    }
  } finally {
    prisma.$disconnect();
    return sucObject;
  }
}





// getUser infos for Student app
export async function getStudentDetails(userId) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id_User: userId,
      },
    });
    if (user) {
      user.travelTimes = await getAlltravelTimes();
    }
    else {
      return null;
    }
    return user;
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }

  finally {
    prisma.$disconnect();

  }

}


// update student info 
export async function updateUser(userId, lat, lng, time) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id_User: userId,
      },
      data: {
        default_Adress_lat: lat,
        default_Adress_lng: lng,
        default_time: time,
      },
    });
    return updatedUser;
  } catch (error) {
    console.error("Error updating user address and time:", error);
    return null;
  } finally {
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
      idBooking: 0,
      code: '',
    }
  } catch (error) {
    console.error('Error fetching user and bus details:', error)
    return null;
  } finally {
    await prisma.$disconnect()
  }
}














//////////////////////////////////////////////////////////////////////////////////Driver ///////////////////////////////////////////


// export async function getDriverInfo(userId) {
//   try {
//     const user = await prisma.user.findUnique({
//       where: {
//         id_User: userId,
//       },
//       select: {
//         full_name: true,
//         image: true,
//       },
//     });

//     if (user) {
//       user.busName = await getBusNameByDriverId(userId)
//       return user;
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error("Error retrieving user info:", error);
//     return null;
//   } finally {
//     await prisma.$disconnect();
//   }
// }


// async function getBusNameByDriverId(driverId) {
//   try {
//     const bus = await prisma.bus.findFirst({
//       where: {
//         id_Driver: driverId,
//       },
//       select: {
//         bus_Name: true,
//       },
//     });
//     if (bus) {
//       console.log(`Bus Name: ${bus.bus_Name}`);
//       return bus.bus_Name;
//     } else {
//       console.log('No bus found for the given driver ID');
//       return null;
//     }
//   } catch (error) {
//     console.error('Error fetching bus name:', error);
//     return null;
//   } finally {
//     await prisma.$disconnect();
//   }
// }



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
      select: { duty_Status: true, id_Duty: true }
    });

    if (!duty) {
      console.log("No duty found for the provided date, time, and driver.");
      return null;
    }

    return { status: duty.duty_Status, idDuty: duty.id_Duty };
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



    if (resultArray) {
      for (const item of resultArray) {
        if (isCurrentMomentWithinTenMinutes(item.date, item.time)) {

          const ok = await updateDutyStatus(item.date, item.time, 'Scanning', 'Pending');

          if (!ok)
            throw new Error("some thing is wrong in table duties");



        }

        const res = await getDutyStatus(item.date, item.time, driverId);
        if (res) {
          item.status = res.status;
          item.idDuty = res.idDuty;
        }
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




async function updateDutyStatus(date, time, newStatus, theWhere) {
  try {
    // Find duties with pending status for the given date and time
    const duty = await prisma.duty.findFirst({
      where: {
        duty_Date: date,
        duty_Time: time,
        duty_Status: theWhere
      }
    });

    // Update duty status to 'Scanning' for found duties
    if (duty) {
      const updatedDuty = await prisma.duty.update({
        where: { id_Duty: duty.id_Duty },
        data: { duty_Status: newStatus }
      });
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

  // Get the current time and add 1 hour
  const currentTimePlusOneHour = new Date(new Date().getTime() + 1 * 60 * 60000); // 1 hour in milliseconds

  // Compare current time plus 1 hour with 10 minutes ago
  return currentTimePlusOneHour >= tenMinutesAgo;
}




export async function getBookingsDetails(busId, departTime, departDate, take, skip, bookingStatus) {
  try {
    const userInfoWithBookingAddress = await prisma.booking.findMany({
      where: {
        depart_Time: departTime,
        depart_Date: departDate,
        bus: {
          id_Bus: busId,
        },
        ...(bookingStatus && { bookingStatus }) // Add the bookingStatus condition if provided
      },
      select: {
        id_Booking: true, // Include the id_Booking field

        user: {
          select: {
            id_User: true,
            full_name: true,
            image: true,
          }
        },
        Adress_lnt: true,
        Adress_lng: true,
      },
      take: take,
      skip: skip,
    });


    if (userInfoWithBookingAddress) {
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


export async function getCountsForScanning(departDate, departTime, busId) {
  try {
    const completedCount = await prisma.booking.count({
      where: {
        depart_Date: departDate,
        depart_Time: departTime,
        bus: {
          id_Bus: busId
        },
        bookingStatus: 'Checked'
      }
    });

    const pendingCount = await prisma.booking.count({
      where: {
        depart_Date: departDate,
        depart_Time: departTime,
        bus: {
          id_Bus: busId
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


// replace that to be geted from id duty


export async function updateBookingStatus(idBooking, newStatus, theWhere) {
  try {
    // Fetch the booking with the given id_Booking and status "Pending"
    const booking = await prisma.booking.findFirst({
      where: {
        id_Booking: idBooking,
        bookingStatus: theWhere,
      }
    });

    if (!booking) {
      console.log('No  booking found with the given id.');
      return false;
    }

    // Update the bookingStatus to "Completed"
    const updatedBooking = await prisma.booking.update({
      where: {
        id_Booking: idBooking
      },
      data: {
        bookingStatus: newStatus,
      }
    });
    if (updatedBooking)
      return true;

    return false;

  } catch (error) {
    console.error('Error updating booking status:', error);
    return false;

  } finally {
    await prisma.$disconnect();
  }
}




export async function confirmDuty(idDuty, idUser) {
  try {
    console.log("confirm Function ....................")
    const dutyProperties = await getDutyPropertiesFronId(idDuty);
    const isUpdated = await updateBookingsStatusToMissed(dutyProperties.duty_Time, dutyProperties.duty_Date, dutyProperties.bus_id);
    const missedBookings = await getBookingsForReport(dutyProperties.duty_Time, dutyProperties.duty_Date, dutyProperties.bus_id);
    if (missedBookings) {
      for (const missedBooking of missedBookings) {
        const res = await createReport(idUser, missedBooking.user_id, 'missed Bus', null, dutyProperties.bus_id);
        if (!res)
          throw new Error("err");
      }
    }
    const updatedDuty = await updateDutyStatusUsingId(idDuty, 'Driving');
    console.log('done')
    return true;
  } catch (err) {
    console.log(err);
    return false;
  } finally {
    prisma.$disconnect();
  }
}


////////////////////////////////////////////  banning /////////////////////////////////////////////////////

export async function getDutyPropertiesFronId(id_Duty) {

  try {
    const duty = await prisma.duty.findUnique({
      where: { id_Duty },
      select: {
        duty_Time: true,
        duty_Date: true,
        duty_Status: true,
        bus_id: true,
      },
    });
    return duty;
  } catch (error) {
    console.error("Error fetching duty details: ", error);
    throw new Error("some thing wrong happened");
  } finally {
    await prisma.$disconnect();
  }
}



async function getBookingsForReport(time, date, idBus) {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        depart_Time: time,
        depart_Date: date,
        bus_id: idBus,
        bookingStatus: 'Missed'
      }
    });
    return bookings;
  } catch (error) {
    console.error("Error retrieving bookings:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}





async function updateBookingsStatusToMissed(time, date, id) {
  try {
    const result = await prisma.booking.updateMany({
      where: {
        depart_Time: time,
        depart_Date: date,
        bus_id: id,
        bookingStatus: 'Pending'
      },
      data: {
        bookingStatus: 'Missed'
      }
    });

    console.log(`${result.count} booking(s) updated to 'Missed'.`);
    return true;
  } catch (error) {
    console.error("Error updating booking status: ", error);
    throw new Error("problem");
  } finally {
    await prisma.$disconnect();
  }
}



export async function createReport(reporterId, reportedUserId, reason, comment, busId) {
  try {
    const newReport = await prisma.report.create({
      data: {
        reporterId: reporterId,
        reportedUserId: reportedUserId,
        reason: reason,
        comment: comment,
        busId: busId
      }
    });

    await incrementReportNumber(reportedUserId);
    const deserveBanning = await isReportNumberGreaterOrEqualToThree(reportedUserId);
    if (deserveBanning) {

      const RecentReports = await getThreeRecentReports(reportedUserId);
      await createNewBann(reportedUserId, 'three reports', RecentReports[0].id, RecentReports[1].id, RecentReports[2].id, null);
      await updateUserStatus(reportedUserId, 'inactive');
      await updateBookingStatusUsingUserId(reportedUserId, 'Pending', 'Banned');
      await resetReportNumber(reportedUserId);
    }

    return true;

  } catch (error) {
    console.error("Error creating report:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}


//// Banning functions  ///////////////////////////////////////////////////////////////////////////////
//used
async function incrementReportNumber(userId) {
  try {
    await prisma.user.update({
      where: { id_User: userId },
      data: {
        report_number: {
          increment: 1,
        },
      },
    });

    return true;
  } catch (error) {
    console.error('Error incrementing report number:', error);
    throw new Error('an error occured');
  } finally {
    await prisma.$disconnect();
  }
}

//used
async function isReportNumberGreaterOrEqualToThree(userId) {

  try {
    const user = await prisma.user.findUnique({
      where: { id_User: userId },
      select: { report_number: true },
    });

    if (user && user.report_number >= 3) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error checking report number:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }

}


//used
async function resetReportNumber(userId) {
  try {
    await prisma.user.update({
      where: { id_User: userId },
      data: {
        report_number: 0,
      },
    });
    console.log(`Report number reset to 0 for user with id: ${userId}`);
  } catch (error) {
    console.error('Error resetting report number:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}


//used
async function getThreeRecentReports(reportedUserId) {
  try {
    const reports = await prisma.report.findMany({
      where: { reportedUserId },
      orderBy: { createdAt: 'desc' },
      take: 3,
    });
    return reports;
  } catch (error) {
    console.error('Error fetching recent reports:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

//used
async function createNewBann(id_Banned_User, bann_cause_staff, id_report_cause1 = null, id_report_cause2 = null, id_report_cause3 = null, end_bann_at = null) {
  try {
    const newBann = await prisma.bann.create({
      data: {
        id_Banned_User: id_Banned_User,
        bann_cause_staff: bann_cause_staff,
        id_report_cause1: id_report_cause1,
        id_report_cause2: id_report_cause2,
        id_report_cause3: id_report_cause3,
        end_bann_at: end_bann_at,
      },
    });

    return newBann;

  } catch (error) {
    console.error('Error creating new bann:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}



//used
async function updateUserStatus(userId, newStatus) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id_User: userId },
      data: {
        status: newStatus,
      },
    });
    return updatedUser;
  } catch (error) {
    console.error('Error updating user status:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}



async function updateBookingStatusUsingUserId(userId, currentStatus, newStatus) {
  try {
    const updatedBooking = await prisma.booking.updateMany({
      where: {
        user_id: userId,
        bookingStatus: currentStatus,
      },
      data: {
        bookingStatus: newStatus,
      },
    });
    return updatedBooking;
  } catch (error) {
    console.error('Error updating booking status:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}


///////////////////////////////////////   END OF BANNING FUNCTIONS /////////////////////////////////////////////////////



export async function updateDutyStatusUsingId(idDuty, value, userId) {
  try {

    const updatedDuty = await prisma.duty.update({
      where: { id_Duty: idDuty },
      data: { duty_Status: value }
    });

    await incrementWorkingHours(userId, 1);
    await incrementTotalProfits(userId);

    if (updatedDuty)
      return true;
    else
      throw new Error("problem")

  } catch (error) {
    console.error('Error updating duty status:', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}



async function incrementTotalProfits(userId) {
  try {
    // Fetch the user's salary_per_hour
    const user = await prisma.user.findUnique({
      where: { id_User: userId },
      select: { salary_per_hour: true },
    });

    if (!user || !user.salary_per_hour) {
      throw new Error('User not found or salary_per_hour is not set');
    }

    // Increment the total_profits by salary_per_hour
    const updatedUser = await prisma.user.update({
      where: {
        id_User: userId,
      },
      data: {
        total_profits: {
          increment: user.salary_per_hour,
        },
      },
    });

    return updatedUser;
  } catch (error) {
    console.error('Error incrementing total profits:', error);
    throw error;
  }
}


async function incrementWorkingHours(userId, hoursToAdd) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id_User: userId,
      },
      data: {
        total_working_hours: {
          increment: hoursToAdd,
        },
      },
    });
    return updatedUser;
  } catch (error) {
    console.error('Error incrementing working hours:', error);
    throw error;
  }
}


////////////////////////////////////////// end of banning ///////////////////////////////



///////// report issue  /////////////////
export async function createIssue(driver_id, issueType, bus_id) {
  try {
    const newIssue = await prisma.issue.create({
      data: {
        driver_id,
        issueType,
        bus_id,
        reported_at: new Date(),
        status : 'inactive', // This is optional as it's already set to default to now()
      },
    });
    return newIssue;
  } catch (error) {
    console.error('Error creating issue:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}


export async function findUniqueBooking(id_Booking, user_id, depart_Time, depart_Date, bus_id, bookingStatus) {
  try {
    const booking = await prisma.booking.findFirst({
      where: {
        id_Booking: id_Booking,
        user_id: user_id,
        depart_Time: depart_Time,
        depart_Date: depart_Date,
        bus_id: bus_id,
        bookingStatus: bookingStatus,
      },
    });

    if (booking)
      return true

    return false;
  } catch (err) {
    console.log(err);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}







///////// leaveBus '///////

export async function updatebusIdInUser(userId, newValue = null) {
  try {
    // Update the user with the specified id_User, setting busId to null
    const updatedUser = await prisma.user.update({
      where: {
        id_User: userId,
      },
      data: {
        busId: newValue,
      },
    });

    console.log('User updated successfully:', updatedUser);
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    return false;
  }
  finally {
    await prisma.$disconnect();
  }
}




///      select available buses ///////

export async function getAvailableBuses() {
  try {

    const allBuses = await prisma.bus.findMany({
      where: {
        bus_Status: 'active',
      }
    });

    const drivers = await prisma.user.findMany({
      where: {
        role: 'driver'
      }
    });

    const AvailableBuses = allBuses.filter(bus => {
      return !checkBusExistanseInDrivers(bus.id_Bus, drivers);
    });



    return AvailableBuses;

  } catch (err) {
    console.log(err)
    return null;
  } finally {
    await prisma.$disconnect();
  }
}


function checkBusExistanseInDrivers(idbus, drivers) {
  for (const driver of drivers) {
    if (driver.busId === idbus) {
      return true;
    }
  }
  return false;
}



export async function asignDriverToBus(userId, busId) {
  try {
    const drivers = await prisma.user.findMany({
      where: {
        role: 'driver'
      }
    });

    if (checkBusExistanseInDrivers(busId, drivers)) {
      return false;
    }

    await prisma.bus.update({
      where: {
        id_Bus: busId,
      },
      data: {
        id_Driver: userId,
      },
    })


    await prisma.user.update({
      where: {
        id_User: userId
      },
      data: {
        busId: busId,
      }
    })

    return true;

  } catch (err) {
    console.log(err);
    return false;
  }


}





////////////////////////////////////////////////// STAFF ///////////////////////////////////////////////////////////////////////




export async function getStudentFromDb() {
  return prisma.user.findMany({
    where: {
      role: {
        in: ['student', 'staff'],
      },
    },
  });
}

export async function getDriversFromDb() {
  return prisma.user.findMany({
    where: {
      role: 'driver',
    },
  });
}

export async function getActiveUnassignedDriversFromDb() {
  // Retrieve all active drivers
  const activeDrivers = await prisma.user.findMany({
    where: {
      role: 'driver',
      status: 'active',
    },
    select: {
      id_User: true,
      full_name: true,
    },
  });

  // Retrieve IDs of drivers who are associated with buses
  const assignedDriverIds = await prisma.bus.findMany({
    select: {
      id_Driver: true,
    },
  }).then(buses => buses.map(bus => bus.id_Driver));

  // Filter out active drivers whose IDs are associated with buses
  const unassignedDrivers = activeDrivers.filter(driver => !assignedDriverIds.includes(driver.id_User));

  return unassignedDrivers;
}





export async function updateDriverStatus(id, newStatus) {
  try {
    const updatedDriver = await prisma.user.update({
      where: { id_User: id },
      data: { status: newStatus },
    });
    return updatedDriver;
  } catch (error) {
    console.error('Error updating driver status:', error);
    throw new Error("Failed to update driver status");
  }
}


export async function getReportsFromDb(reporterId, reportedUserId) {
  const whereClause = {};

  // Add conditions for reporterId and reportedUserId if provided
  if (reporterId) {
    whereClause.reporterId = reporterId;
  }

  if (reportedUserId) {
    whereClause.reportedUserId = reportedUserId;
  }

  // Fetch reports based on the provided conditions
  return prisma.report.findMany({
    where: whereClause,
    include: {
      reporter: {
        select: {
          id_User: true,
          full_name: true,
          email: true,
          image: true,
          role: true,
        },
      },
      reportedUser: {
        select: {
          id_User: true,
          full_name: true,
          email: true,
          image: true,
          status: true,
          role: true,
        },
      },
    },
  });
}





export async function getBusFromDB(limit, offset) {
  return prisma.bus.findMany({
    skip: offset,
    take: limit,
  });
}

export async function getHighestBusId() {
  const highestBus = await prisma.bus.findFirst({
    orderBy: {
      id_Driver: 'desc',
    },
    select: {
      id_Driver: true,
    },
  });
  return highestBus ? highestBus.id : 0; // Return 0 if no buses found
}



export async function addBusToDb(busData) {
  try {
    // Step 1: Create the new bus entry
    const newBus = await prisma.bus.create({
      data: {
        image: busData.image,
        bus_Number: busData.bus_Number,
        bus_Name: busData.bus_Name,
        id_Driver: busData.id_Driver,
        bus_Capacity: busData.bus_Capacity,
        bus_Status: busData.bus_Status,
      },
    });

    // Step 2: Update the User model with the bus id
    await prisma.user.update({
      where: {
        id_User: busData.id_Driver,
      },
      data: {
        busId: newBus.id_Bus,
      },
    });

    return newBus;
  } catch (error) {
    console.error('Error adding bus to database:', error); // Log the error
    return null;
  }
}




// export async function deleteBusFromDb(busId) {
//   try {
//     // Delete the bus with the specified ID
//     const deletedBus = await prisma.bus.delete({
//       where: { id_Bus: busId },
//     });
//     return deletedBus;
//   } catch (error) {
//     console.error('Error deleting bus from database:', error);
//     throw new Error("Failed to delete bus");
//   }
// }


export async function editBusInDb(busId, updatedBusData) {
  try {
    // Update the bus with the specified ID
    const updatedBus = await prisma.bus.update({
      where: { id_Bus: busId },
      data: {
        image: updatedBusData.image,
        bus_Number: updatedBusData.bus_Number,
        bus_Name: updatedBusData.bus_Name,
        id_Driver: updatedBusData.id_Driver,
        bus_Capacity: updatedBusData.bus_Capacity,
        bus_Status: updatedBusData.bus_Status,
      },
    });
    return updatedBus;
  } catch (error) {
    console.error('Error editing bus in database:', error);
    throw new Error("Failed to edit bus");
  }
}



export async function getIssuesForBusAndDriver() {
  try {
    const issues = await prisma.issue.findMany({
      where: {
        status: 'inactive',
      },
      include: {
        driver: {
          select: {
            full_name: true,
          },
        },
        bus: {
          select: {
            bus_Name: true,
          },
        },
      },
    });

    return issues;
  } catch (error) {
    console.error('Error fetching issues for bus and driver:', error);
    throw new Error("Failed to fetch issues for bus and driver");
  }
}



export async function getAllIssues() {
  try {
    const issues = await prisma.issue.findMany({
      include: {
        driver: {
          select: {
            id_User: true,
            full_name: true,
            image: true,
            email: true,
            status: true,
            role: true,
          },
        },
        bus: {
          select: {
            id_Bus: true,
            bus_Name: true,
            image: true,
            bus_Status: true,
          },
        },
      },
    });

    return issues;
  } catch (error) {
    console.error('Error fetching issues for bus and driver:', error);
    throw new Error("Failed to fetch issues for bus and driver");
  }
}



export async function updateIssueStatus(issueId, newStatus) {
  try {
    const updatedIssue = await prisma.issue.update({
      where: { id_issue: issueId },
      data: { status: newStatus },
    });
    return updatedIssue;
  } catch (error) {
    console.error('Error updating issue status:', error);
    throw new Error("Failed to update issue status");
  }
}


export async function getBookingFromDb() {
  return prisma.booking.findMany();
}


export async function updateStudentStatus(id, newStatus) {
  try {
    const updatedStudent = await prisma.user.update({
      where: { id_User: id },
      data: { status: newStatus },
    });
    return updatedStudent;
  } catch (error) {
    console.error('Error updating student status:', error);
    return null;
  }
}
