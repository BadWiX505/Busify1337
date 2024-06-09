// utils.js
export const formatDate = (dateTime) => {
    const date = new Date(dateTime);
    const formattedDate = date.toLocaleDateString(); // Format date as per locale
    return formattedDate;
  };
  
  export const formatTime = (dateTime) => {
    const date = new Date(dateTime);
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format time as HH:MM
    return formattedTime;
  };
  