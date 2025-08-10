import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check, XCircle } from "lucide-react";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Course date range
const courseStartDate = new Date("2025-08-01");
const courseEndDate = new Date("2025-08-20");

// Completed dates
const completedDates = [
  "2025-08-01",
  "2025-08-03",
  "2025-08-05",
  "2025-08-08"
];

// Holidays
const holidays = [
  "2025-08-07",
  "2025-08-14"
];

const today = new Date();

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const getDaysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();

  const getFirstDayOfMonth = (month: number, year: number) =>
    new Date(year, month, 1).getDay();

  const isCompleted = (date: Date) =>
    completedDates.includes(date.toISOString().split("T")[0]);

  const isInCourseRange = (date: Date) =>
    date >= courseStartDate && date <= courseEndDate;

  const isHoliday = (date: Date) =>
    holidays.includes(date.toISOString().split("T")[0]);

  const totalCourseDays = (() => {
    let count = 0;
    for (
      let d = new Date(courseStartDate);
      d <= courseEndDate;
      d.setDate(d.getDate() + 1)
    ) {
      if (!isHoliday(new Date(d))) count++;
    }
    return count;
  })();

  const totalCompleted = completedDates.filter(
    (d) => !holidays.includes(d)
  ).length;

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const calendarDays = [];

    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(
        <div key={`empty-${i}`} className="h-16 sm:h-20 border border-gray-200 bg-gray-50"></div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(currentYear, currentMonth, day);
      const isToday =
        today.getDate() === day &&
        today.getMonth() === currentMonth &&
        today.getFullYear() === currentYear;

      const completed = isCompleted(currentDate);
      const inCourse = isInCourseRange(currentDate);
      const holiday = isHoliday(currentDate);

      let bgColor = "";
      if (holiday) bgColor = "bg-red-100";
      else if (completed) bgColor = "bg-green-100";
      else if (inCourse) bgColor = "bg-yellow-50";

      calendarDays.push(
        <div
          key={day}
          className={`h-16 sm:h-20 border border-gray-200 p-1 relative ${bgColor} ${
            isToday ? "ring-2 ring-blue-400" : ""
          }`}
        >
          <div className="text-xs sm:text-sm font-medium">{day}</div>
          {completed && !holiday && (
            <div className="absolute top-1 right-1 text-green-600">
              <Check size={14} className="sm:size-16" />
            </div>
          )}
          {holiday && (
            <div className="absolute top-1 right-1 text-red-600">
              <XCircle size={14} className="sm:size-16" />
            </div>
          )}
        </div>
      );
    }

    return calendarDays;
  };

  const prevMonth = () => {
    const firstMonth = courseStartDate.getMonth();
    const firstYear = courseStartDate.getFullYear();
    if (currentYear > firstYear || (currentYear === firstYear && currentMonth > firstMonth)) {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }
  };

  const nextMonth = () => {
    const lastMonth = courseEndDate.getMonth();
    const lastYear = courseEndDate.getFullYear();
    if (currentYear < lastYear || (currentYear === lastYear && currentMonth < lastMonth)) {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const goToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-bold text-xl sm:text-2xl">Course Progress Calendar</h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Green = Completed, Yellow = Upcoming, Red = Holiday
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={prevMonth}>
            <ChevronLeft size={16} />
          </Button>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            <ChevronRight size={16} />
          </Button>
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
        </div>
      </div>

      {/* Stats */}
      <Card className="p-4 flex flex-col sm:flex-row justify-around text-center gap-4 sm:gap-0">
        <div>
          <p className="text-lg font-bold">{totalCourseDays}</p>
          <p className="text-sm text-gray-500">Total Course Days</p>
        </div>
        <div>
          <p className="text-lg font-bold">{totalCompleted}</p>
          <p className="text-sm text-gray-500">Days Completed</p>
        </div>
        <div>
          <p className="text-lg font-bold">{holidays.length}</p>
          <p className="text-sm text-gray-500">Holidays</p>
        </div>
      </Card>

      {/* Calendar */}
      <Card className="p-4 sm:p-6 overflow-x-auto">
        <div className="flex justify-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold">
            {months[currentMonth]} {currentYear}
          </h2>
        </div>
        <div className="grid grid-cols-7 min-w-[500px]">
          {weekDays.map((day, index) => (
            <div
              key={index}
              className="text-center font-medium p-1 sm:p-2 border-b border-gray-200 text-xs sm:text-sm"
            >
              {day}
            </div>
          ))}
          {renderCalendarDays()}
        </div>
      </Card>
    </div>
  );
}
