import { getStudentFromDb, 
  getDriversFromDb, 
  updateDriverStatus, 
  getReportsFromDb,
  getBusFromDB,
  getActiveUnassignedDriversFromDb, // Updated import
  addBusToDb,
  // deleteBusFromDb,
  editBusInDb,
  getIssuesForBusAndDriver,
  getAllIssues,
  updateIssueStatus,
  getHighestBusId,
  getBookingFromDb,
  updateStudentStatus,
} from '@/app/server/db';

export async function getStudents() {
const res = await getStudentFromDb();
return res;
}

export async function getDrivers() {
return await getDriversFromDb();
}

export async function getActiveDrivers() {
// Use the updated function to get active unassigned drivers
return await getActiveUnassignedDriversFromDb();
}

export async function toggleDriverStatus(id, status) {
return await updateDriverStatus(id, status);
}

export async function getReports(reporterId, reportedUserId) {
const reports = await getReportsFromDb(reporterId, reportedUserId);
return reports;
}

export async function getBus(limit, offset) {
return await getBusFromDB(limit, offset);
}

export async function addBus(busData) {
return await addBusToDb(busData);
}

// export async function deleteBus(busId) {
// return await deleteBusFromDb(busId);
// }

export async function editBus(busId, updatedBusData) {
return await editBusInDb(busId, updatedBusData);
}

export async function getIssues() {
    return await getIssuesForBusAndDriver();
}

export async function getAllIssuesActiveandInactive() {
  return await getAllIssues();
}

export async function updateIssueStatusById(issueId, newStatus) {
  return await updateIssueStatus(issueId, newStatus);
}

export async function HighestBusId() {
  return await getHighestBusId();
}

export async function getBooking() {
  return await getBookingFromDb();
  }


  export async function updateStudent(id,status) {
    return await updateStudentStatus(id,status);
  }