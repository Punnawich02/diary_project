"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";

export default function DiaryPage() {
  const params = useParams();
  const router = useRouter();
  const date = params.date as string;

  // แยกวันที่จาก URL parameter
  const [year, month, day] = date?.split("-").map(Number) || [0, 0, 0];

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

  return (
    <main className="bg-white min-h-screen text-black w-full font-[Prompt]">
      <div className="container mx-auto px-4 py-8 max-w-screen-xl">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                ไดอารี่ประจำวัน
              </h1>
              <p className="text-lg text-pink-600 font-semibold">
                วันที่ {day} {months[month - 1]} {year}
              </p>
            </div>

            <button
              onClick={() => router.push("/calendar")}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors hover:cursor-pointer"
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              กลับสู่ปฏิทิน
            </button>
          </div>
          {/* Quick Navigation */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            <button
              onClick={() => {
                const prevDate = new Date(year, month - 1, day - 1);
                router.push(
                  `/diary/${prevDate.getFullYear()}-${
                    prevDate.getMonth() + 1
                  }-${prevDate.getDate()}`
                );
              }}
              className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-center hover:cursor-pointer"
            >
              ← วันก่อนหน้า
            </button>

            <button
              onClick={() => router.push("/")}
              className="p-3 bg-pink-100 rounded-lg hover:bg-pink-200 transition-colors text-center hover:cursor-pointer"
            >
              📅 ปฏิทิน
            </button>

            <button
              onClick={() => {
                const nextDate = new Date(year, month - 1, day + 1);
                router.push(
                  `/diary/${nextDate.getFullYear()}-${
                    nextDate.getMonth() + 1
                  }-${nextDate.getDate()}`
                );
              }}
              className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-center hover:cursor-pointer"
            >
              วันถัดไป →
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Symptom */}
            <div className="mb-6">
              <label
                htmlFor="diary-content"
                className="block text-xl font-medium text-black mb-2"
              >
                อาการของวันนี้:
              </label>
              <textarea
                id="symptom"
                rows={10}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                placeholder={`บันทึกอาการของวันที่ ${day} ${
                  months[month - 1]
                } ${year}`}
              />
            </div>
            {/* Symptom Photo Upload */}
            <div className="mb-6">
              <label
                htmlFor="photo-upload"
                className="block text-xl font-medium text-black mb-2"
              >
                อัปโหลดรูปภาพอาการ:
              </label>
              <div className="flex items-center gap-4">
                <label
                  htmlFor="symptom-photo"
                  className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition-colors cursor-pointer"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                    />
                  </svg>
                  เลือกรูปภาพ
                  <input
                    type="file"
                    id="symptom-photo"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
                <span className="text-gray-500 text-sm" id="file-name"></span>
              </div>
            </div>{" "}
            <hr className="mb-4" />
            {/* Pain Score */}
            <div className="mb-6">
              <label
                htmlFor="pain-score"
                className="block text-xl font-medium text-black mb-2"
              >
                ระดับความเจ็บปวดของวันนี้:
              </label>
              <input
                type="range"
                id="pain-score"
                min={0}
                max={10}
                defaultValue={0}
                className="w-full accent-pink-500"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10</span>
              </div>
            </div>{" "}
            <hr className="mb-4" />
            {/* Breakfast */}
            <div className="mb-6">
              <label
                htmlFor="morning-diary"
                className="block text-xl font-medium text-black mb-2"
              >
                อาหารเช้า:
              </label>
              <textarea
                id="morning-diary"
                rows={4}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                placeholder={`บันทึกอาหารเช้าของวันที่ ${day} ${
                  months[month - 1]
                } ${year}`}
              />
            </div>
            {/* Breakfast Photo Upload */}
            <div className="mb-6">
              <label
                htmlFor="photo-upload"
                className="block text-xl font-medium text-black mb-2"
              >
                อัปโหลดรูปภาพอาหารเช้า:
              </label>
              <div className="flex items-center gap-4">
                <label
                  htmlFor="breakfast-photo"
                  className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition-colors cursor-pointer"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                    />
                  </svg>
                  เลือกรูปภาพ
                  <input
                    type="file"
                    id="breakfast-photo"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
                <span className="text-gray-500 text-sm" id="file-name"></span>
              </div>
            </div>{" "}
            <hr className="mb-4" />
            {/* Lunch */}
            <div className="mb-6">
              <label
                htmlFor="morning-diary"
                className="block text-xl font-medium text-black mb-2"
              >
                อาหารกลางวัน:
              </label>
              <textarea
                id="lunch-diary"
                rows={4}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                placeholder={`บันทึกอาหารกลางวันของวันที่ ${day} ${
                  months[month - 1]
                } ${year}`}
              />
            </div>
            {/* Lunch Photo Upload */}
            <div className="mb-6">
              <label
                htmlFor="photo-upload"
                className="block text-xl font-medium text-black mb-2"
              >
                อัปโหลดรูปภาพอาหารกลางวัน:
              </label>
              <div className="flex items-center gap-4">
                <label
                  htmlFor="lunch-photo"
                  className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition-colors cursor-pointer"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                    />
                  </svg>
                  เลือกรูปภาพ
                  <input
                    type="file"
                    id="lunch-photo"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
                <span className="text-gray-500 text-sm" id="file-name"></span>
              </div>
            </div>{" "}
            <hr className="mb-4" />
            {/* Dinner */}
            <div className="mb-6">
              <label
                htmlFor="morning-diary"
                className="block text-xl font-medium text-black mb-2"
              >
                อาหารเย็น:
              </label>
              <textarea
                id="dinner-diary"
                rows={4}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                placeholder={`บันทึกอาหารเย็นของวันที่ ${day} ${
                  months[month - 1]
                } ${year}`}
              />
            </div>
            {/* Dinner Photo Upload */}
            <div className="mb-6">
              <label
                htmlFor="photo-upload"
                className="block text-xl font-medium text-black mb-2"
              >
                อัปโหลดรูปภาพอาหารเย็น:
              </label>
              <div className="flex items-center gap-4">
                <label
                  htmlFor="dinner-photo"
                  className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition-colors cursor-pointer"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                    />
                  </svg>
                  เลือกรูปภาพ
                  <input
                    type="file"
                    id="dinner-photo"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
                <span className="text-gray-500 text-sm" id="file-name"></span>
              </div>
            </div>{" "}
            <hr className="mb-4" />
            {/* Action Buttons */}
            <div className="flex flex-col justify-end sm:flex-row gap-3 sm:gap-4">
              <button className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 hover:cursor-pointer transition-colors">
                บันทึกไดอารี่
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
