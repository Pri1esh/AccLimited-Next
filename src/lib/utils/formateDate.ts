const formateDate = (dateStr: string): string => {
    const monthsMap: Record<string, string> = {
      January: "Jan",
      February: "Feb",
      March: "Mar",
      April: "Apr",
      May: "May",
      June: "Jun",
      July: "Jul",
      August: "Aug",
      September: "Sep",
      October: "Oct",
      November: "Nov",
      December: "Dec",
    };
  
    const [day, month, year] = dateStr.split("/");
  
    if (!day || !month || !year || !monthsMap[month]) {
      return `${dateStr}`;
    }
  
    const fullYear = `20${year}`; // Assuming '25' means '2025'
  
    return `${day} ${monthsMap[month]} ${fullYear}`;
  };

  export default formateDate;
