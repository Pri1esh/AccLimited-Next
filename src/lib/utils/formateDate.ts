// const formateDate = (dateStr: string): string => {
//     const monthsMap: Record<string, string> = {
//       January: "Jan",
//       February: "Feb",
//       March: "Mar",
//       April: "Apr",
//       May: "May",
//       June: "Jun",
//       July: "Jul",
//       August: "Aug",
//       September: "Sep",
//       October: "Oct",
//       November: "Nov",
//       December: "Dec",
//     };
  
//     const [day, month, year] = dateStr.split("/");
  
//     if (!day || !month || !year || !monthsMap[month]) {
//       return `${dateStr}`;
//     }
  
//     const fullYear = `20${year}`; // Assuming '25' means '2025'
  
//     return `${day} ${monthsMap[month]} ${fullYear}`;
//   };

//   export default formateDate;
const formatDate = (dateStr: string): string => {
  const monthsMap: Record<string, number> = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  const [day, monthName, shortYear] = dateStr.split("/");

  if (!day || !monthName || !shortYear || !monthsMap[monthName]) {
    return dateStr;
  }

  const month = monthsMap[monthName];
  const year = parseInt(shortYear, 10);
  const fullYear = 2000 + year;

  // Determine fiscal quarter
  const quarter = Math.floor((month - 1) / 3) + 1;

  return `FY${year}-Q${quarter}`;
};

export default formatDate;
