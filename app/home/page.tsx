"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Bell, Briefcase, Home, User, BarChart3, DollarSign, Sun, RefreshCw } from "lucide-react"

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [refreshing, setRefreshing] = useState(false)
  const [showNotification, setShowNotification] = useState("")
  const [notificationMessage, setNotificationMessage] = useState("")
  const [scrollY, setScrollY] = useState(0)

  // Mock data
  const userData = {
    name: "Nguyễn Văn A",
    notifications: 3,
    jobs: 12,
    candidates: 5,
    urgentCandidates: 2,
    commission: "1.2M VNĐ",
  }

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Chào buổi sáng"
    if (hour < 18) return "Chào buổi chiều"
    return "Chào buổi tối"
  }

  // Format date as Vietnamese format - shorter version
  const formatDate = () => {
    return currentTime.toLocaleDateString("vi-VN", {
      weekday: "short",
      day: "numeric",
      month: "numeric",
    })
  }

  // Simulate pull-to-refresh
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop
    setScrollY(scrollTop)

    if (scrollTop < -50 && !refreshing) {
      handleRefresh()
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)

    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false)
      showNotificationToast("Dữ liệu đã được cập nhật")
    }, 1500)
  }

  const showNotificationToast = (message: string) => {
    setNotificationMessage(message)
    setShowNotification(true)

    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Pull to refresh indicator */}
      {refreshing && (
        <div className="absolute top-0 left-0 right-0 flex justify-center py-3 bg-white z-10">
          <RefreshCw className="h-6 w-6 text-[#2E7D32] animate-spin" />
        </div>
      )}

      {/* Notification toast */}
      {showNotification && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-[#2E7D32] text-white px-4 py-2 rounded-md shadow-lg z-50 animate-fade-in">
          {notificationMessage}
        </div>
      )}

      <div className="flex-1 overflow-auto pb-16" onScroll={handleScroll}>
        {/* Header */}
        <header className="bg-white p-4 shadow-sm">
          <div className="flex justify-between">
            <div>
              <h1 className="text-1xl font-bold text-[#2E7D32]">
                {getGreeting()}, {userData.name}
              </h1>
              <p className="text-sm text-[#757575] mt-1">Chào mừng trở lại với GreenTalent</p>
            </div>
            <div className="flex flex-col items-end space-y-1">
              <div className="bg-gray-50 rounded-full px-2 py-0.5 shadow-sm">
                <span className="text-xs text-[#757575] whitespace-nowrap">{formatDate()}</span>
              </div>
              <div className="bg-gray-50 rounded-full px-2 py-0.5 shadow-sm flex items-center">
                <Sun className="h-3.5 w-3.5 text-[#FFC107] mr-1" />
                <span className="text-xs text-[#757575]">28°C</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Job Listings Card */}
            <div className="bg-white rounded-xl shadow-md p-3 flex flex-col items-center justify-center transition-transform hover:scale-[1.02] active:scale-[0.98]">
              <div className="w-14 h-14 rounded-full bg-[#2E7D32]/10 flex items-center justify-center mb-2">
                <Briefcase className="h-7 w-7 text-[#2E7D32]" />
              </div>
              <h2 className="text-sm font-semibold text-gray-800 mb-1 whitespace-nowrap">Danh sách việc làm</h2>
              <p className="text-sm text-[#757575]">{userData.jobs} vị trí đang tuyển</p>
            </div>

            {/* My Candidates Card */}
            <div className="bg-white rounded-xl shadow-md p-3 flex flex-col items-center justify-center transition-transform hover:scale-[1.02] active:scale-[0.98]">
              <div className="w-14 h-14 rounded-full bg-[#1565C0]/10 flex items-center justify-center mb-2 relative">
                <User className="h-7 w-7 text-[#1565C0]" />
                {userData.urgentCandidates > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FFC107] text-xs font-medium text-white rounded-full h-5 w-5 flex items-center justify-center">
                    {userData.urgentCandidates}
                  </span>
                )}
              </div>
              <h2 className="text-sm font-semibold text-gray-800 mb-1 whitespace-nowrap">Ứng viên của tôi</h2>
              <p className="text-sm text-[#757575]">{userData.candidates} ứng viên mới</p>
            </div>

            {/* Statistics Card */}
            <div className="bg-white rounded-xl shadow-md p-3 flex flex-col items-center justify-center transition-transform hover:scale-[1.02] active:scale-[0.98]">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#2E7D32]/10 to-[#1565C0]/10 flex items-center justify-center mb-2">
                <BarChart3 className="h-7 w-7 text-[#1565C0]" />
              </div>
              <h2 className="text-sm font-semibold text-gray-800 mb-1 whitespace-nowrap">Báo cáo thống kê</h2>
              <p className="text-sm text-[#757575]">10 ứng viên onboard</p>
            </div>

            {/* Commission Card */}
            <div className="bg-white rounded-xl shadow-md p-3 flex flex-col items-center justify-center transition-transform hover:scale-[1.02] active:scale-[0.98]">
              <div className="w-14 h-14 rounded-full bg-[#FFC107]/10 flex items-center justify-center mb-2">
                <DollarSign className="h-7 w-7 text-[#FFC107]" />
              </div>
              <h2 className="text-sm font-semibold text-gray-800 mb-1 whitespace-nowrap">Quản lý hoa hồng</h2>
              <p className="text-sm text-[#757575]">{userData.commission}</p>
            </div>
          </div>

          {/* Recent Activity Section */}
          <section className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-800">Hoạt động gần đây</h2>
              <button className="text-sm text-[#1565C0]">Xem tất cả</button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 space-y-4">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-[#2E7D32]/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <Briefcase className="h-5 w-5 text-[#2E7D32]" />
                </div>
                <div>
                  <p className="text-sm font-medium">Vị trí "Senior React Developer" đã được cập nhật</p>
                  <p className="text-xs text-[#757575]">2 giờ trước</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-[#1565C0]/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <User className="h-5 w-5 text-[#1565C0]" />
                </div>
                <div>
                  <p className="text-sm font-medium">Ứng viên "Trần Văn B" đã được phỏng vấn</p>
                  <p className="text-xs text-[#757575]">Hôm qua</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-[#FFC107]/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <DollarSign className="h-5 w-5 text-[#FFC107]" />
                </div>
                <div>
                  <p className="text-sm font-medium">Bạn đã nhận được hoa hồng 500.000 VNĐ</p>
                  <p className="text-xs text-[#757575]">3 ngày trước</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center">
          <button className="flex flex-col items-center">
            <div className="p-1 relative">
              <Home className="h-6 w-6 text-[#2E7D32]" />
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-5 h-1 bg-[#2E7D32] rounded-t-full"></span>
            </div>
            <span className="text-xs font-medium text-[#2E7D32] mt-1">Home</span>
          </button>

          <button className="flex flex-col items-center">
            <div className="p-1 relative">
              <Bell className="h-6 w-6 text-[#757575]" />
              {userData.notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D32F2F] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {userData.notifications}
                </span>
              )}
            </div>
            <span className="text-xs text-[#757575] mt-1">Thông báo</span>
          </button>

          <button className="flex flex-col items-center">
            <div className="p-1">
              <User className="h-6 w-6 text-[#757575]" />
            </div>
            <span className="text-xs text-[#757575] mt-1">Cá nhân</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
