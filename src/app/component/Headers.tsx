"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.svg";

type LineProfile = {
  userId: string;
  displayName: string;
  pictureUrl: string;
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profile, setProfile] = useState<LineProfile | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  // ปิด dropdown ถ้าคลิกรอบนอก
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.profile) setProfile(data.profile);
        else setProfile(null);
      })
      .catch(() => setProfile(null));
  }, []);

  const logout = () => {
    // ลบ cookie และรีเฟรช
    document.cookie =
      "lineProfile=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    window.location.reload();
  };

  const menuItems = (
    <>
      <Link
        href="/home"
        className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100"
      >
        หน้าหลัก
      </Link>
      <Link
        href="/calendar"
        className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100"
      >
        สมุดบันทึก
      </Link>
      <Link
        href="/history"
        className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100"
      >
        ประวัติการบันทึก
      </Link>
      <Link
        href="/howtouse"
        className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100"
      >
        วิธีการใช้
      </Link>
    </>
  );

  return (
    <header className="bg-white shadow-md border-b-2 font-[Prompt]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/home" className="flex-shrink-0 flex items-center">
              <Image src={logo} width={64} height={64} alt="logo" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                สมุดบันทึก
              </span>
              <span className="text-xl font-bold text-[#FB6F92]">สุขภาพ</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <nav className="hidden md:flex md:items-center md:space-x-4">
            {menuItems}
          </nav>

          {/* Profile หรือ Login */}
          <div className="relative flex items-center">
            {profile ? (
              <div
                ref={dropdownRef}
                className="flex items-center cursor-pointer select-none"
              >
                <div onClick={toggleDropdown} className="flex items-center gap-2">
                  <Image
                    src={profile.pictureUrl}
                    alt={profile.displayName}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="text-sm text-gray-800">{profile.displayName}</span>
                  <svg
                    className={`w-4 h-4 text-gray-600 transition-transform ${
                      isDropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      ออกจากระบบ
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/api/login">
                <button className="bg-[#FB6F92] hover:bg-[#FC87A4] text-white px-4 py-2 rounded-md text-sm font-medium">
                  เข้าสู่ระบบ
                </button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {menuItems}
          {profile ? (
            <div className="flex items-center gap-2 px-3 py-2 border-t mt-2">
              <Image
                src={profile.pictureUrl}
                alt={profile.displayName}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-sm">{profile.displayName}</span>
              <button
                onClick={logout}
                className="ml-auto bg-gray-200 px-3 py-1 rounded text-sm mt-6"
              >
                ออกจากระบบ
              </button>
            </div>
          ) : (
            <Link href="/api/login">
              <button className="w-full bg-[#FB6F92] text-white px-4 py-2 rounded-md text-base hover:cursor-pointer">
                เข้าสู่ระบบ
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
