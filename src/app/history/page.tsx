"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface DiaryEntry {
  id: string;
  date: string;
  symptom: string;
  symptomPhoto?: string;
  painScore: number;
  breakfast: string;
  breakfastPhoto?: string;
  lunch: string;
  lunchPhoto?: string;
  dinner: string;
  dinnerPhoto?: string;
}

export default function HistoryPage() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "painScore">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);

  // Mock data - ในการใช้งานจริงควรดึงจาก API หรือฐานข้อมูล
  useEffect(() => {
    const mockData: DiaryEntry[] = [
      {
        id: "1",
        date: "2024-01-15",
        symptom: "ปวดหัวเล็กน้อย มีอาการคลื่นไส้",
        symptomPhoto: "/images/symptom1.jpg",
        painScore: 3,
        breakfast: "ข้าวต้ม ไข่ต้ม น้ำผึ้งมะนาว",
        breakfastPhoto: "/images/breakfast1.jpg",
        lunch: "ข้าวผัดไก่ ต้มส้มปลา",
        lunchPhoto: "/images/lunch1.jpg",
        dinner: "ข้าวกับแกงเขียวหวานไก่",
        dinnerPhoto: "/images/dinner1.jpg"
      },
      {
        id: "2",
        date: "2024-01-14",
        symptom: "ปวดท้อง ท้องเสีย",
        painScore: 5,
        breakfast: "โจ๊ก",
        lunch: "ข้าวต้ม น้ำเปล่า",
        dinner: "ข้าวขาว ไก่ต้ม"
      },
      {
        id: "3",
        date: "2024-01-13",
        symptom: "รู้สึกดี ไม่มีอาการผิดปกติ",
        symptomPhoto: "/images/symptom3.jpg",
        painScore: 0,
        breakfast: "ขนมปังปิ้ง นม กล้วย",
        breakfastPhoto: "/images/breakfast3.jpg",
        lunch: "ข้าวผัดกุ้ง ต้มยำกุ้ง",
        lunchPhoto: "/images/lunch3.jpg",
        dinner: "พิซซ่า สลัด",
        dinnerPhoto: "/images/dinner3.jpg"
      }
    ];
    setDiaryEntries(mockData);
  }, []);

  // กรองและเรียงลำดับข้อมูล
  const filteredAndSortedEntries = diaryEntries
    .filter(entry => 
      entry.symptom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.breakfast.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.lunch.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.dinner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.date.includes(searchTerm)
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        const comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        return sortOrder === "asc" ? comparison : -comparison;
      } else {
        const comparison = a.painScore - b.painScore;
        return sortOrder === "asc" ? comparison : -comparison;
      }
    });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPainScoreColor = (score: number) => {
    if (score === 0) return "text-green-600 bg-green-100";
    if (score <= 3) return "text-yellow-600 bg-yellow-100";
    if (score <= 6) return "text-orange-600 bg-orange-100";
    return "text-red-600 bg-red-100";
  };

  const PhotoDisplay = ({ src, alt }: { src?: string; alt: string }) => {
    if (!src) return <span className="text-gray-400 text-sm">ไม่มีรูปภาพ</span>;
    
    return (
      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.parentElement!.innerHTML = '<span class="text-gray-400 text-xs flex items-center justify-center h-full">No Image</span>';
          }}
        />
      </div>
    );
  };

  return (
    <main className="bg-gradient-to-tr from-pink-100 via-white to-pink-50 min-h-screen font-[Noto_Serif_Thai]">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            ประวัติไดอารี่สุขภาพ
          </h1>
          <p className="text-gray-600">
            ดูประวัติการบันทึกอาการและการรับประทานอาหารของคุณ
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="ค้นหาด้วยอาการ, อาหาร หรือวันที่..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              />
            </div>

            {/* Sort Controls */}
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "date" | "painScore")}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
              >
                <option value="date">เรียงตามวันที่</option>
                <option value="painScore">เรียงตามคะแนนความปวด</option>
              </select>
              
              <button
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 text-black"
              >
                {sortOrder === "asc" ? "↑" : "↓"}
              </button>
            </div>
          </div>
        </div>

        {/* Entries List */}
        <div className="space-y-6">
          {filteredAndSortedEntries.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500 text-lg">ไม่พบข้อมูลไดอารี่</p>
            </div>
          ) : (
            filteredAndSortedEntries.map((entry) => (
              <div key={entry.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Entry Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        {formatDate(entry.date)}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPainScoreColor(entry.painScore)}`}>
                          ความปวด: {entry.painScore}/10
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedEntry(selectedEntry?.id === entry.id ? null : entry)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {selectedEntry?.id === entry.id ? "ย่อ" : "ดูรายละเอียด"}
                    </button>
                  </div>
                </div>

                {/* Entry Content */}
                <div className="p-6">
                  {/* Symptoms Section */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      อาการ
                    </h4>
                    <div className="flex gap-4 items-start">
                      <div className="flex-1">
                        <p className="text-gray-700">{entry.symptom}</p>
                      </div>
                      <PhotoDisplay src={entry.symptomPhoto} alt="รูปอาการ" />
                    </div>
                  </div>

                  {/* Meals Section */}
                  {(selectedEntry?.id === entry.id) && (
                    <div className="space-y-4 border-t pt-6">
                      {/* Breakfast */}
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                          มื้อเช้า
                        </h4>
                        <div className="flex gap-4 items-start">
                          <div className="flex-1">
                            <p className="text-gray-700">{entry.breakfast}</p>
                          </div>
                          <PhotoDisplay src={entry.breakfastPhoto} alt="รูปอาหารเช้า" />
                        </div>
                      </div>

                      {/* Lunch */}
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                          มื้อเที่ยง
                        </h4>
                        <div className="flex gap-4 items-start">
                          <div className="flex-1">
                            <p className="text-gray-700">{entry.lunch}</p>
                          </div>
                          <PhotoDisplay src={entry.lunchPhoto} alt="รูปอาหารเที่ยง" />
                        </div>
                      </div>

                      {/* Dinner */}
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                          มื้อเย็น
                        </h4>
                        <div className="flex gap-4 items-start">
                          <div className="flex-1">
                            <p className="text-gray-700">{entry.dinner}</p>
                          </div>
                          <PhotoDisplay src={entry.dinnerPhoto} alt="รูปอาหารเย็น" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary Stats */}
        {diaryEntries.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-lg text-gray-800 mb-4">สถิติสรุป</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{diaryEntries.length}</div>
                <div className="text-sm text-gray-600">บันทึกทั้งหมด</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round((diaryEntries.reduce((sum, entry) => sum + entry.painScore, 0) / diaryEntries.length) * 10) / 10}
                </div>
                <div className="text-sm text-gray-600">คะแนนความปวดเฉลี่ย</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {diaryEntries.filter(entry => entry.painScore === 0).length}
                </div>
                <div className="text-sm text-gray-600">วันที่ไม่มีอาการ</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}