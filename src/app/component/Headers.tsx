"use client"; // If using Next.js App Router

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/logo.svg'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md border-b-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/home" className="flex-shrink-0 flex items-center">
              <Image src={logo} width={64} height={64} alt={'logo'}/>
              <span className="ml-2 text-xl font-bold text-gray-900">สมุดบันทึก</span>
              <span className="text-xl font-bold text-[#FB6F92]">สุขภาพ</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <Link href="/home" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100">
              หน้าหลัก
            </Link>
            <Link href="/calendar" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100">
              สมุดบันทึก
            </Link>
            <Link href="/history" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100">
              ประวัติการบันทึก
            </Link>
            <Link href="/howtouse" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100">
              วิธีการใช้
            </Link>
          </nav>

          <div className="flex items-center">
            <button className="hidden md:block bg-[#FB6F92] hover:bg-[#FC87A4] hover:cursor-pointer text-white px-4 py-2 rounded-md text-sm font-medium">
              เข้าสู่ระบบ
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/home" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">
            หน้าหลัก
          </Link>
          <Link href="/calendar" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">
            สมุดบันทึก
          </Link>
          <Link href="/history" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">
            ประวัติการบันทึก
          </Link>
          <Link href="/howtouse" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">
            วิธีการใช้
          </Link>
          <button className="mt-1 block w-full px-3 py-2 rounded-md text-base font-medium text-white bg-[#FB6F92] hover:bg-[#FC87A4] hover:cursor-pointer">
            เข้าสู่ระบบ
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;