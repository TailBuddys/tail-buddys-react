export const formatSmartTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  // Helper to reset time for comparison
  const stripTime = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const isToday = stripTime(date).getTime() === stripTime(now).getTime();

  const getStartOfWeek = (d) => {
    const day = d.getDay(); // 0 (Sun) - 6 (Sat)
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // make Monday first
    return new Date(d.setDate(diff));
  };

  const startOfWeek = stripTime(getStartOfWeek(new Date(now)));
  const isThisWeek = stripTime(date) >= startOfWeek;

  if (isToday) {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } else if (isThisWeek) {
    return date.toLocaleDateString("en-US", { weekday: "long" }); // like "Tuesday"
  } else {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
};
