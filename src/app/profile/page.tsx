"use client";
import React, { useState } from "react";

// Mockup user data
const mockUser = {
  first_name: "",
  last_name: "",
  sex: "",
  national_id: "",
  birth_date: "",
  address: "",
  phone_number: "",
  email: "",
  hn_number: "",
  line_user_id: "",
  role: "",
};

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [loading, setLoading] = useState(false);

  // For restoring value on cancel
  const handleEdit = () => {
    setFormData({ ...user });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({ ...user });
    setIsEditing(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Mock PUT handler
  const handleSave = async () => {
    setLoading(true);
    // สมมุติเรียก PUT API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // ปกติจะต้อง fetch/axios.put('/api/user', formData) ที่นี่
    setUser({ ...formData });
    setIsEditing(false);
    setLoading(false);
  };

  return (
    <main className="bg-gradient-to-tr from-pink-100 via-white to-pink-50 min-h-screen font-[Noto_Serif_Thai]">
      {/* Header Section */}
      <div className="flex flex-col items-center pt-8 pb-4 sm:pt-12 sm:pb-6">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-pink-200 flex items-center justify-center shadow-lg mb-3 sm:mb-4 border-4 border-white">
          <span className="text-5xl sm:text-6xl text-pink-600 font-bold">
            {user.first_name[0]}
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-pink-700 mb-1 drop-shadow text-center">
          {user.first_name} {user.last_name}
        </h1>
      </div>
      {/* Profile Section */}
      <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8 text-black">
        <div className="max-w-full sm:max-w-2xl mx-auto bg-white/80 rounded-2xl sm:rounded-3xl p-4 sm:p-10 shadow-2xl border border-pink-200 backdrop-blur-md">
          <h2 className="text-xl sm:text-2xl font-bold text-pink-700 mb-4 sm:mb-6 text-center">
            ข้อมูลผู้ใช้งาน
          </h2>
          <hr className="border-pink-200 mb-6 sm:mb-8" />
          <form className="mb-4 sm:mb-6" onSubmit={(e) => e.preventDefault()}>
            <div className="sm:grid-cols-2 gap-4 sm:gap-8">
              <div>
                <div className="mb-3 sm:mb-4">
                  <label
                    className="font-semibold block mb-1"
                    htmlFor="fullName"
                  >
                    ชื่อ-นามสกุล:
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="firstName"
                      name="first_name"
                      type="text"
                      className="w-1/2 rounded-lg border border-pink-200 px-3 py-2 bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-300"
                      value={isEditing ? formData.first_name : user.first_name}
                      placeholder="ชื่อจริง"
                      disabled={!isEditing}
                      onChange={handleChange}
                    />
                    <input
                      id="lastName"
                      name="last_name"
                      type="text"
                      className="w-1/2 rounded-lg border border-pink-200 px-3 py-2 bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-300"
                      value={isEditing ? formData.last_name : user.last_name}
                      placeholder="นามสกุล"
                      disabled={!isEditing}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-3 sm:mb-4">
                  <label className="font-semibold block mb-1" htmlFor="email">
                    เพศโดยกำเนิด
                  </label>
                  <input
                    id="sex"
                    name="sex"
                    type="text"
                    className="w-full rounded-lg border border-pink-200 px-3 py-2 bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    value={isEditing ? formData.sex : user.sex}
                    placeholder="เพศโดยกำเนิด"
                    disabled={!isEditing}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 sm:mb-4">
                  <label className="font-semibold block mb-1" htmlFor="email">
                    Email:
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="w-full rounded-lg border border-pink-200 px-3 py-2 bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    value={isEditing ? formData.email : user.email}
                    placeholder="อีเมล (ถ้ามี)"
                    disabled={!isEditing}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 sm:mb-4">
                  <label className="font-semibold block mb-1" htmlFor="phone">
                    เบอร์โทรศัพท์:
                  </label>
                  <input
                    id="phone"
                    name="phone_number"
                    type="text"
                    className="w-full rounded-lg border border-pink-200 px-3 py-2 bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    value={
                      isEditing ? formData.phone_number : user.phone_number
                    }
                    placeholder="เบอร์โทรศัพท์"
                    disabled={!isEditing}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 sm:mb-4">
                  <label
                    className="font-semibold block mb-1"
                    htmlFor="birthDate"
                  >
                    วันเกิด:
                  </label>
                  <input
                    id="birthDate"
                    name="birth_date"
                    type={isEditing ? "date" : "text"}
                    className="w-full rounded-lg border border-pink-200 px-3 py-2 bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    value={
                      isEditing
                        ? formData.birth_date
                        : new Date(user.birth_date).toLocaleDateString("th-TH")
                    }
                    placeholder="วัน/เดือน/ปีเกิด"
                    disabled={!isEditing}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 sm:mb-4">
                  <label
                    className="font-semibold block mb-1"
                    htmlFor="nationalId"
                  >
                    เลขบัตรประชาชน/ID:
                  </label>
                  <input
                    id="nationalId"
                    name="national_id"
                    type="text"
                    className="w-full rounded-lg border border-pink-200 px-3 py-2 bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    value={isEditing ? formData.national_id : user.national_id}
                    placeholder="เลขบัตรประชาชน"
                    disabled={!isEditing}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <div className="mb-3 sm:mb-4">
                  <label
                    className="font-semibold block mb-1"
                    htmlFor="hnNumber"
                  >
                    HN:
                  </label>
                  <input
                    id="hnNumber"
                    name="hn_number"
                    type="text"
                    className="w-full rounded-lg border border-pink-200 px-3 py-2 bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    value={isEditing ? formData.hn_number : user.hn_number}
                    placeholder="หมายเลขประจำตัวผู้ป่วย (ถ้ามี)"
                    disabled={!isEditing}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 sm:mb-4">
                  <label className="font-semibold block mb-1" htmlFor="address">
                    ที่อยู่:
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    className="w-full rounded-lg border border-pink-200 px-3 py-2 bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
                    value={isEditing ? formData.address : user.address}
                    placeholder="ที่อยู่ปัจจุบัน"
                    disabled={!isEditing}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
                <div className="mb-3 sm:mb-4 flex flex-col">
                  <span className="font-semibold mb-2">สถานะ: </span>
                  <span className="inline-block bg-pink-200 text-pink-800 px-3 py-1 rounded-lg text-sm font-medium shadow">
                    {user.role === "admin" ? "หมอ (Doctor)" : "คนไข้ (Patient)"}
                  </span>
                </div>
              </div>
            </div>

            {/* ปุ่มควบคุม */}
            <div className="flex justify-end gap-2 sm:gap-3">
              {!isEditing ? (
                <button
                  type="button"
                  className="mt-2 sm:mt-4 bg-gradient-to-r from-pink-400 to-pink-600 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold shadow hover:from-pink-500 hover:to-pink-700 transition"
                  onClick={handleEdit}
                >
                  แก้ไขข้อมูล
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="mt-2 sm:mt-4 bg-pink-100 border border-pink-400 text-pink-700 px-4 sm:px-6 py-2 rounded-lg font-semibold shadow hover:bg-pink-200 transition"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="button"
                    className="mt-2 sm:mt-4 bg-gradient-to-r from-pink-400 to-pink-600 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold shadow hover:from-pink-500 hover:to-pink-700 transition"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    {loading ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
