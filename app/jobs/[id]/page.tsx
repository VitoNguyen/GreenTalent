"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Share2,
  DollarSign,
  MapPin,
  Calendar,
  Clock,
  Briefcase,
  Users,
  Award,
  Eye,
  Bookmark,
  BookmarkCheck,
  AlertTriangle,
  Home,
  Bell,
  User,
} from "lucide-react"

// Mock job data
const JOB_DETAILS = {
  id: "job1",
  title: "Senior React Developer",
  jobCode: "JOB12345",
  salary: "25-40 triệu VNĐ",
  location: "Quận 1, TP.HCM",
  commission: "5 triệu VNĐ",
  deadline: "Còn 7 ngày",
  level: "Senior",
  workingTime: "Thứ 2-6, 9:00-18:00",
  postedDate: "20/03/2025",
  warrantyPeriod: "3 tháng kể từ ngày onboard",
  isHot: true,
  isUrgent: false,
  viewCount: 156,
  referralCount: 12,
  status: "Đang tuyển",
  company: {
    name: "Tech Solutions",
    logo: "/placeholder.svg?height=60&width=60",
    industry: "Công nghệ thông tin",
    size: "100-500 nhân viên",
    address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
  },
  description: [
    "Phát triển và duy trì các ứng dụng web sử dụng React.js và các công nghệ liên quan",
    "Tối ưu hóa các ứng dụng để đạt hiệu suất tối đa trên nhiều thiết bị và trình duyệt",
    "Phối hợp với các nhóm back-end để tích hợp API và dịch vụ",
    "Tham gia vào quá trình thiết kế và phát triển các tính năng mới",
    "Đảm bảo chất lượng kỹ thuật và tính chính xác của thiết kế",
    "Xác định và khắc phục các lỗi và vấn đề về hiệu suất",
    "Tạo các thành phần UI có thể tái sử dụng và thư viện front-end để sử dụng trong tương lai",
  ],
  requirements: [
    "Tối thiểu 5 năm kinh nghiệm phát triển phần mềm, với ít nhất 3 năm làm việc với React.js",
    "Kinh nghiệm sâu rộng với JavaScript/TypeScript, HTML5, CSS3",
    "Hiểu biết vững chắc về Redux, React Router và các thư viện React phổ biến",
    "Kinh nghiệm với các công cụ kiểm thử như Jest, Enzyme, React Testing Library",
    "Quen thuộc với các công cụ xây dựng như Webpack, Babel, ESLint",
    "Hiểu biết về RESTful APIs và tích hợp back-end",
    "Kỹ năng giải quyết vấn đề và tư duy phản biện tốt",
    "Khả năng làm việc độc lập và trong môi trường nhóm",
    "Tiếng Anh giao tiếp tốt",
  ],
  benefits: [
    "Mức lương cạnh tranh và xét tăng lương 2 lần/năm",
    "Thưởng hiệu suất hàng quý và thưởng dự án",
    "Bảo hiểm sức khỏe cao cấp cho nhân viên và người thân",
    "13 tháng lương + thưởng cuối năm",
    "Làm việc từ xa 2 ngày/tuần",
    "Chế độ nghỉ phép 15 ngày/năm",
    "Môi trường làm việc quốc tế, năng động",
    "Cơ hội đào tạo và phát triển chuyên môn",
    "Các hoạt động team building và sự kiện công ty thường xuyên",
  ],
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [job, setJob] = useState(JOB_DETAILS)
  const [activeTab, setActiveTab] = useState<"description" | "requirements" | "benefits">("description")
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [notification, setNotification] = useState({ show: false, message: "" })

  // In a real app, fetch job details based on params.id
  useEffect(() => {
    // Simulate API call
    console.log(`Fetching job with ID: ${params.id}`)
    // setJob(fetchedJob)
  }, [params.id])

  // Handle bookmark toggle
  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsBookmarked(!isBookmarked)

    setNotification({
      show: true,
      message: isBookmarked ? "Đã xóa khỏi danh sách đã lưu" : "Đã lưu tin tuyển dụng",
    })

    setTimeout(() => {
      setNotification({ show: false, message: "" })
    }, 3000)
  }

  // Handle share
  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowShareOptions(!showShareOptions)
  }

  // Handle share option click
  const handleShareOption = (platform: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // In a real app, implement actual sharing functionality
    console.log(`Sharing to ${platform}`)

    setShowShareOptions(false)
    setNotification({
      show: true,
      message: `Đã chia sẻ qua ${platform}`,
    })

    setTimeout(() => {
      setNotification({ show: false, message: "" })
    }, 3000)
  }

  // Handle report job
  const handleReportJob = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // In a real app, implement actual reporting functionality
    console.log("Reporting job")

    setNotification({
      show: true,
      message: "Cảm ơn bạn đã báo cáo tin tuyển dụng này",
    })

    setTimeout(() => {
      setNotification({ show: false, message: "" })
    }, 3000)
  }

  // Get level badge color
  const getLevelBadgeColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "junior":
        return "bg-blue-100 text-blue-600"
      case "middle":
        return "bg-[#1565C0]/10 text-[#1565C0]"
      case "senior":
        return "bg-[#2E7D32]/10 text-[#2E7D32]"
      case "quản lý":
        return "bg-[#FFC107]/10 text-[#FFC107]"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "đang tuyển":
        return "bg-[#2E7D32]/10 text-[#2E7D32]"
      case "tạm dừng":
        return "bg-[#FFC107]/10 text-[#FFC107]"
      case "đã đóng":
        return "bg-[#D32F2F]/10 text-[#D32F2F]"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Notification toast */}
      {notification.show && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-[#2E7D32] text-white px-4 py-2 rounded-md shadow-lg z-50 animate-fade-in">
          {notification.message}
        </div>
      )}

      {/* Share options popup */}
      {showShareOptions && (
        <div className="absolute top-16 right-4 bg-white rounded-lg shadow-lg z-40 p-3 animate-fade-in">
          <div className="flex flex-col space-y-2">
            <button
              className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
              onClick={(e) => handleShareOption("Facebook", e)}
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                <span className="text-white font-bold">f</span>
              </div>
              <span>Facebook</span>
            </button>
            <button
              className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
              onClick={(e) => handleShareOption("Zalo", e)}
            >
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                <span className="text-white font-bold">Z</span>
              </div>
              <span>Zalo</span>
            </button>
            <button
              className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
              onClick={(e) => handleShareOption("Email", e)}
            >
              <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center mr-2">
                <span className="text-white font-bold">@</span>
              </div>
              <span>Email</span>
            </button>
            <button
              className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
              onClick={(e) => handleShareOption("Copy Link", e)}
            >
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mr-2">
                <span className="text-white font-bold">🔗</span>
              </div>
              <span>Copy Link</span>
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-auto pb-20">
        {/* Header */}
        <header className="bg-white p-4 shadow-sm sticky top-0 z-10 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/jobs" className="mr-3">
              <ArrowLeft className="h-6 w-6 text-gray-700" />
            </Link>
            <h1 className="text-lg font-semibold text-gray-800 truncate max-w-[200px]">{job.title}</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors relative"
              onClick={toggleBookmark}
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-5 w-5 text-[#2E7D32]" />
              ) : (
                <Bookmark className="h-5 w-5 text-gray-700" />
              )}
            </button>
            <button
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors relative"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4">
          {/* Basic Job Information */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-4">
            <div className="mb-3">
              <h1 className="text-xl font-bold text-gray-800 mb-1">{job.title}</h1>
              <div className="flex items-center text-sm text-gray-500">
                <span>Mã tin: {job.jobCode}</span>
                <span className="mx-2">•</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusBadgeColor(job.status)}`}>
                  {job.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-start">
                <DollarSign className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Mức lương</p>
                  <p className="text-sm text-gray-900">{job.salary}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Award className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Trình độ</p>
                  <p
                    className={`text-sm px-2 py-0.5 rounded-full inline-block mt-0.5 ${getLevelBadgeColor(job.level)}`}
                  >
                    {job.level}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Địa điểm</p>
                  <p className="text-sm text-gray-900">{job.location}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Hạn nộp</p>
                  <p className="text-sm text-gray-900">{job.deadline}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Ngày đăng</p>
                  <p className="text-sm text-gray-900">{job.postedDate}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Thời gian làm việc</p>
                  <p className="text-sm text-gray-900">{job.workingTime}</p>
                </div>
              </div>
            </div>

            {/* Commission and Warranty Period Section - New highlighted section */}
            <div className="bg-[#f8f9fa] rounded-lg p-4 mb-4 border border-[#e9ecef]">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Thông tin hoa hồng & bảo hành</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                  <DollarSign className="h-5 w-5 text-[#FFC107] mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[#FFC107]">Hoa hồng</p>
                    <p className="text-sm text-gray-900 font-semibold">{job.commission}</p>
                  </div>
                </div>
                <div className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                  <Calendar className="h-5 w-5 text-[#2E7D32] mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[#2E7D32]">Thời hạn bảo hành</p>
                    <p className="text-sm text-gray-900 font-semibold">{job.warrantyPeriod}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500 border-t border-gray-100 pt-3">
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                <span>{job.viewCount} lượt xem</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{job.referralCount} ứng viên đã giới thiệu</span>
              </div>
            </div>
          </div>

          {/* Detailed Description Tabs */}
          <div className="bg-white rounded-xl shadow-md mb-4 overflow-hidden">
            {/* Tab headers */}
            <div className="flex border-b border-gray-200">
              <button
                className={`flex-1 py-3 px-4 text-sm font-medium relative ${
                  activeTab === "description" ? "text-[#2E7D32]" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("description")}
              >
                Mô tả
                {activeTab === "description" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2E7D32]"></div>
                )}
              </button>
              <button
                className={`flex-1 py-3 px-4 text-sm font-medium relative ${
                  activeTab === "requirements" ? "text-[#2E7D32]" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("requirements")}
              >
                Yêu cầu
                {activeTab === "requirements" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2E7D32]"></div>
                )}
              </button>
              <button
                className={`flex-1 py-3 px-4 text-sm font-medium relative ${
                  activeTab === "benefits" ? "text-[#2E7D32]" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("benefits")}
              >
                Quyền lợi
                {activeTab === "benefits" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2E7D32]"></div>
                )}
              </button>
            </div>

            {/* Tab content */}
            <div className="p-4">
              {activeTab === "description" && (
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-800 mb-2">Mô tả công việc</h3>
                  <ul className="space-y-2">
                    {job.description.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[#2E7D32] mr-2">•</span>
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "requirements" && (
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-800 mb-2">Yêu cầu công việc</h3>
                  <ul className="space-y-2">
                    {job.requirements.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[#1565C0] mr-2">•</span>
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "benefits" && (
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-800 mb-2">Quyền lợi</h3>
                  <ul className="space-y-2">
                    {job.benefits.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[#FFC107] mr-2">✓</span>
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Report section */}
          <div className="mb-20">
            <button
              className="flex items-center justify-center w-full py-2 text-sm text-gray-600 hover:text-[#D32F2F]"
              onClick={handleReportJob}
            >
              <AlertTriangle className="h-4 w-4 mr-1" />
              <span>Báo cáo tin tuyển dụng không phù hợp</span>
            </button>
          </div>
        </main>
      </div>

      {/* CTA Button */}
      <div className="fixed bottom-16 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-md">
        <button className="w-full py-3 px-4 bg-[#2E7D32] text-white rounded-md font-medium shadow-sm hover:bg-[#2E7D32]/90 transition-colors flex items-center justify-center">
          <Users className="h-5 w-5 mr-2" />
          Giới thiệu ứng viên
        </button>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center">
          <Link href="/home" className="flex flex-col items-center">
            <div className="p-1">
              <Home className="h-6 w-6 text-[#757575]" />
            </div>
            <span className="text-xs text-[#757575] mt-1">Home</span>
          </Link>

          <Link href="/jobs" className="flex flex-col items-center">
            <div className="p-1 relative">
              <Briefcase className="h-6 w-6 text-[#2E7D32]" />
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-5 h-1 bg-[#2E7D32] rounded-t-full"></span>
            </div>
            <span className="text-xs font-medium text-[#2E7D32] mt-1">Việc làm</span>
          </Link>

          <Link href="/notifications" className="flex flex-col items-center">
            <div className="p-1 relative">
              <Bell className="h-6 w-6 text-[#757575]" />
            </div>
            <span className="text-xs text-[#757575] mt-1">Thông báo</span>
          </Link>

          <Link href="/profile" className="flex flex-col items-center">
            <div className="p-1">
              <User className="h-6 w-6 text-[#757575]" />
            </div>
            <span className="text-xs text-[#757575] mt-1">Cá nhân</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
