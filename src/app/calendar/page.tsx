"use client";

import React from "react";
import Calendar from "../component/Calendar";

export default function HomePage() {
  return (
    <main className="bg-white min-h-screen text-black w-full">
      <div className="container mx-auto px-4 py-8 max-w-screen-xl">
        <Calendar/>
      </div>
    </main>
  );
}