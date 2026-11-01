export const WEEKDAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const FULL_MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Format Date object to YYYY-MM-DD string using local calendar numbers.
 */
export function formatDate(date) {
  if (!date) return "";
  const d = date instanceof Date ? date : new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Safely parse a YYYY-MM-DD string into a local Date object without UTC timezone shifting.
 */
export function parseDate(dateStr) {
  if (!dateStr) return new Date();
  if (dateStr instanceof Date) return dateStr;
  const parts = String(dateStr).split("-").map(Number);
  if (parts.length === 3 && !parts.some(isNaN)) {
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }
  return new Date(dateStr);
}

/**
 * Get the Monday Date of the week containing the given date (Monday is day 1).
 */
export function getMonday(date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = d.getDay();
  const diff = day === 0 ? 6 : day - 1; // Sunday is 0, so 6 days back to Monday
  d.setDate(d.getDate() - diff);
  return d;
}

/**
 * Get the Sunday Date of the week starting with the given Monday.
 */
export function getSunday(monday) {
  const d = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate());
  d.setDate(d.getDate() + 6);
  return d;
}

/**
 * Format a week range string, handling month and year transitions.
 * Examples:
 *   Nov 2 – Nov 8, 2026
 *   Oct 26 – Nov 1, 2026
 *   Dec 28, 2026 – Jan 3, 2027
 */
export function formatWeekRange(monday, sunday) {
  const mMonth = MONTH_NAMES[monday.getMonth()];
  const mDate = monday.getDate();
  const mYear = monday.getFullYear();

  const sMonth = MONTH_NAMES[sunday.getMonth()];
  const sDate = sunday.getDate();
  const sYear = sunday.getFullYear();

  if (mYear !== sYear) {
    return `${mMonth} ${mDate}, ${mYear} – ${sMonth} ${sDate}, ${sYear}`;
  }
  if (mMonth !== sMonth) {
    return `${mMonth} ${mDate} – ${sMonth} ${sDate}, ${mYear}`;
  }
  return `${mMonth} ${mDate} – ${sMonth} ${sDate}, ${mYear}`;
}

/**
 * Returns an array of 7 day objects for the week (Monday through Sunday).
 */
export function getWeekDays(selectedDate) {
  const monday = getMonday(selectedDate);
  const selectedStr = formatDate(selectedDate);
  const todayStr = formatDate(new Date());

  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(
      monday.getFullYear(),
      monday.getMonth(),
      monday.getDate() + i
    );
    const dateStr = formatDate(d);
    days.push({
      date: d,
      dateString: dateStr,
      dayName: dayNames[i],
      dayShort: dayNames[i].slice(0, 3),
      dayNumber: d.getDate(),
      isSelected: dateStr === selectedStr,
      isToday: dateStr === todayStr,
    });
  }
  return days;
}

/**
 * Get weekday name from Date or date string (e.g. "Thursday").
 */
export function getWeekdayName(date) {
  const d = date instanceof Date ? date : parseDate(date);
  return WEEKDAY_NAMES[d.getDay()];
}

/**
 * Friendly formatted display date (e.g. "Thursday, Nov 5, 2026").
 */
export function formatDisplayDate(date) {
  const d = date instanceof Date ? date : parseDate(date);
  const weekday = WEEKDAY_NAMES[d.getDay()];
  const month = MONTH_NAMES[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();
  return `${weekday}, ${month} ${day}, ${year}`;
}
