"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());

  // ฟังก์ชันสำหรับเปลี่ยนเดือน
  const changeMonth = (increment: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1)
    );
  };

  // ฟังก์ชันสำหรับเปลี่ยนปี
  const changeYear = (increment: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear() + increment, currentDate.getMonth(), 1)
    );
  };

  // ได้รับจำนวนวันในเดือน
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // ได้รับวันแรกของเดือน (0 = อาทิตย์, 1 = จันทร์, ...)
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // ฟังก์ชันสำหรับจัดการคลิกวันที่
  const handleDateClick = (day: number) => {
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const date = day.toString().padStart(2, "0");
    const dateString = `${year}-${month}-${date}`;
    router.push(`/diary/${dateString}`);
  };

  // สร้างอาร์เรย์ของวันในเดือน
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // เพิ่มช่องว่างสำหรับวันแรกของเดือน
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // เพิ่มวันที่ในเดือน
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const months = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const daysOfWeek = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
  const today = new Date();
  const calendarDays = generateCalendarDays();

  return (
    <main className="bg-white min-h-screen text-black w-full font-[Prompt]">
      <div className="container mx-auto px-4 py-8 max-w-screen-xl">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              ปฏิทิน
            </h1>

            {/* Navigation Controls */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Year Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => changeYear(-1)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="ปีก่อนหน้า"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <span className="text-lg font-semibold min-w-[60px] text-center">
                  {currentDate.getFullYear()}
                </span>
                <button
                  onClick={() => changeYear(1)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="ปีถัดไป"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
              {/* Month Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => changeMonth(-1)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="เดือนก่อนหน้า"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <span className="text-lg font-semibold min-w-[80px] sm:min-w-[100px] text-center">
                  {months[currentDate.getMonth()]}
                </span>
                <button
                  onClick={() => changeMonth(1)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="เดือนถัดไป"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="bg-gray-50 rounded-lg p-2 sm:p-4">
            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs sm:text-sm font-semibold text-gray-600 py-2 sm:py-3"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {calendarDays.map((day, index) => {
                const isToday =
                  day &&
                  currentDate.getFullYear() === today.getFullYear() &&
                  currentDate.getMonth() === today.getMonth() &&
                  day === today.getDate();
                const isWeekend = index % 7 === 0 || index % 7 === 6;

                return (
                  <div
                    key={index}
                    onClick={() => day && handleDateClick(day)}
                    className={`
                      aspect-square flex items-center justify-center text-sm sm:text-base
                      rounded-lg transition-colors 
                      ${
                        day
                          ? "cursor-pointer hover:bg-pink-100 hover:scale-105"
                          : "cursor-default"
                      }
                      ${
                        isToday
                          ? "bg-pink-500 text-white font-bold shadow-md hover:bg-pink-600"
                          : day
                          ? "bg-white hover:bg-pink-50 hover:shadow-sm"
                          : ""
                      }
                      ${isWeekend && day && !isToday ? "text-red-500" : ""}
                      ${day ? "active:scale-95" : ""}
                    `}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Today Info */}
          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-sm sm:text-base text-gray-600">
              วันนี้: {today.getDate()} {months[today.getMonth()]}{" "}
              {today.getFullYear()}
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 sm:px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors text-sm sm:text-base"
            >
              วันนี้
            </button>
            <button
              onClick={() => changeMonth(-1)}
              className="px-3 sm:px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
            >
              เดือนก่อน
            </button>
            <button
              onClick={() => changeMonth(1)}
              className="px-3 sm:px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
            >
              เดือนหน้า
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
