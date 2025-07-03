"use client";

import React from "react";
import Image from "next/image";
import banner from "../../../public/banner.png";
import howtouse from "../../../public/howtouse.png";

export default function HomePage() {
  return (
    <main className="bg-white min-h-screen font-[Prompt]">
      <div className="relative flex justify-center">
        <Image src={banner} alt="Health Diary" className="object-cover" />
        <div className="absolute left-6 sm:left-10 md:left-12 top-1/2 transform -translate-y-1/2 p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-black leading-snug sm:leading-tight">
            ยินดีต้อนรับสู่สมุดบันทึก
            <span className="block mb-1 sm:mb-4"></span>
            สำหรับสุขภาพที่ดีขึ้น
          </h1>
          <div className="text-sm sm:text-base noto-sans-thai md:text-lg lg:text-xl text-black mt-1 sm:mt-2 leading-snug sm:leading-normal">
            ช่วยบันทึกข้อมูลสุขภาพของคุณ
            <span className="block mb-1 sm:mb-2"></span>
            ได้รับคำแนะนำจากผู้เชี่ยวชาญ
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* วิธีใช้ */}
          <div className="bg-[#ffedee] rounded-3xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 tracking-wider">
              วิธีใช้
            </h2>
            <div className="border-t border-gray-400 mb-6"></div>
            <div className="rounded-3xl overflow-hidden">
              <Image
                src={howtouse}
                alt="Medical notebook"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* สมุดบันทึกนี้ทำอะไรได้บ้าง */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              สมุดบันทึกนี้ทำอะไรได้บ้าง
            </h2>
            <div className="border-t border-gray-400 mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-black">
              {/* คอลัมน์ซ้าย */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-[#ffc2d1] rounded-lg flex items-center justify-center">
                    <span className="text-black-800 text-lg">✓</span>
                  </div>
                  <span className="noto-sans-thai text-lg">
                    บันทึกอาหารที่ทานแต่ละวัน
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-[#ffc2d1] rounded-lg flex items-center justify-center">
                    <span className="text-black-800 text-lg">✓</span>
                  </div>
                  <span className="noto-sans-thai text-lg">
                    เตือนอาหารที่กินไม่ได้
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-[#ffc2d1] rounded-lg flex items-center justify-center">
                    <span className="text-black-800 text-lg">✓</span>
                  </div>
                  <span className="noto-sans-thai text-lg">
                    บันทึกอาการแต่ละวัน
                  </span>
                </div>
              </div>

              {/* คอลัมน์ขวา */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-[#ffc2d1] rounded-lg flex items-center justify-center">
                    <span className="text-black-800 text-lg">✓</span>
                  </div>
                  <span className="noto-sans-thai text-lg">
                    บันทึกความรุนแรงของอาการ
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-[#ffc2d1] rounded-lg flex items-center justify-center">
                    <span className="text-black-800 text-lg">✓</span>
                  </div>
                  <span className="noto-sans-thai text-lg">
                    ดูประวัติย้อนหลัง
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
