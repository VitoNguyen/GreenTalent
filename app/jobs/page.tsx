"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Search,
  Filter,
  MapPin,
  DollarSign,
  Calendar,
  Clock,
  Home,
  Bell,
  User,
  ArrowLeft,
  RefreshCw,
  X,
  Briefcase,
  BookmarkCheck,
} from "lucide-react"

// Mock data for job listings
const MOCK_JOBS = [
  {
    id: "job1",
    title: "Senior React Developer",
    salary: "25-40 triệu VNĐ",
    location: "Quận 1, TP.HCM",
    commission: "5 triệu VNĐ",
    deadline: "Còn 7 ngày",
    level: "Senior",
    postedDate: "3 ngày trước",
    isHot: true,
    isUrgent: false,
    company: "Tech Solutions",
    companyLogo: "/placeholder.svg?height=40&width=40",
    isBookmarked: true,
  },
  {
    id: "job2",
    title: "Product Marketing Manager",
    salary: "20-30 triệu VNĐ",
    location: "Quận 7, TP.HCM",
    commission: "3 triệu VNĐ",
    deadline: "Còn 14 ngày",
    level: "Middle",
    postedDate: "1 ngày trước",
    isHot: false,
    isUrgent: true,
    company: "Marketing Pro",
    companyLogo: "/placeholder.svg?height=40&width=40",
    isBookmarked: false,
  },
  {
    id: "job3",
    title: "HR Business Partner",
    salary: "15-25 triệu VNĐ",
    location: "Hà Nội",
    commission: "2.5 triệu VNĐ",
    deadline: "Còn 10 ngày",
    level: "Middle",
    postedDate: "5 ngày trước",
    isHot: false,
    isUrgent: false,
    company: "HR Solutions",
    companyLogo: "/placeholder.svg?height=40&width=40",
    isBookmarked: true,
  },
  {
    id: "job4",
    title: "Sales Director",
    salary: "Trên 40 triệu VNĐ",
    location: "Đà Nẵng",
    commission: "8 triệu VNĐ",
    deadline: "Còn 5 ngày",
    level: "Quản lý",
    postedDate: "2 ngày trước",
    isHot: true,
    isUrgent: true,
    company: "Sales Force",
    companyLogo: "/placeholder.svg?height=40&width=40",
    isBookmarked: false,
  },
  {
    id: "job5",
    title: "Junior UX/UI Designer",
    salary: "10-15 triệu VNĐ",
    location: "Quận 2, TP.HCM",
    commission: "1.5 triệu VNĐ",
    deadline: "Còn 20 ngày",
    level: "Junior",
    postedDate: "1 ngày trước",
    isHot: false,
    isUrgent: false,
    company: "Design Studio",
    companyLogo: "/placeholder.svg?height=40&width=40",
    isBookmarked: false,
  },
  {
    id: "job6",
    title: "DevOps Engineer",
    salary: "30-45 triệu VNĐ",
    location: "Quận 4, TP.HCM",
    commission: "6 triệu VNĐ",
    deadline: "Còn 8 ngày",
    level: "Senior",
    postedDate: "4 ngày trước",
    isHot: true,
    isUrgent: false,
    company: "Cloud Systems",
    companyLogo: "/placeholder.svg?height=40&width=40",
    isBookmarked: true,
  },
]

export default function JobsPage() {
  const router = useRouter()
  const [jobs, setJobs] = useState(MOCK_JOBS)
  const [filteredJobs, setFilteredJobs] = useState(MOCK_JOBS)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSavedOnly, setShowSavedOnly] = useState(false)
  const [filters, setFilters] = useState({
    position: "all",
    salary: "all",
    level: "all",
    location: "all",
    sort: "newest",
  })
  const [notification, setNotification] = useState({ show: false, message: "" })
  const scrollRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null)
  const [showFilterPopup, setShowFilterPopup] = useState(false)
  const [tempFilters, setTempFilters] = useState({
    position: "all",
    salary: "all",
    level: "all",
    location: "all",
  })
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)

    // Clear any existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    // Set a new timeout to apply search after typing stops
    searchTimeoutRef.current = setTimeout(() => {
      applyFilters()
    }, 500) // 500ms delay
  }

  // Handle search button click
  const handleSearchClick = () => {
    // Clear any existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
      searchTimeoutRef.current = null
    }

    applyFilters()
  }

  // Handle clear search
  const handleClearSearch = () => {
    // Clear the search query
    setSearchQuery("")

    // Reset filtered jobs based on current saved filter state
    if (showSavedOnly) {
      setFilteredJobs(jobs.filter((job) => job.isBookmarked))
    } else {
      // Apply other filters without search query
      const filteredResults = applyFiltersToJobs(jobs, "", filters)
      setFilteredJobs(filteredResults)
    }
  }

  // Helper function to apply filters to jobs array
  const applyFiltersToJobs = (jobsArray: typeof MOCK_JOBS, query: string, filterSettings = filters) => {
    let results = [...jobsArray]

    // Apply saved jobs filter if active
    if (showSavedOnly) {
      results = results.filter((job) => job.isBookmarked)
    }

    // Apply search query
    if (query) {
      results = results.filter(
        (job) =>
          job.title.toLowerCase().includes(query.toLowerCase()) ||
          job.company.toLowerCase().includes(query.toLowerCase()),
      )
    }

    // Apply position filter
    if (filterSettings.position !== "all") {
      // In a real app, you would filter by job category
      // This is just a placeholder
    }

    // Apply salary filter
    if (filterSettings.salary !== "all") {
      // Simple filtering logic - in a real app this would be more sophisticated
      switch (filterSettings.salary) {
        case "under15":
          results = results.filter((job) => job.salary.includes("10-15"))
          break
        case "15to25":
          results = results.filter((job) => job.salary.includes("15-25"))
          break
        case "25to40":
          results = results.filter((job) => job.salary.includes("25-40"))
          break
        case "over40":
          results = results.filter((job) => job.salary.includes("Trên 40"))
          break
      }
    }

    // Apply level filter
    if (filterSettings.level !== "all") {
      results = results.filter((job) => job.level.toLowerCase() === filterSettings.level.toLowerCase())
    }

    // Apply location filter
    if (filterSettings.location !== "all") {
      results = results.filter((job) => job.location.includes(filterSettings.location))
    }

    // Apply sorting
    switch (filterSettings.sort) {
      case "newest":
        // Already sorted by newest in our mock data
        break
      case "salary":
        results.sort((a, b) => {
          // Simple sorting logic - in a real app this would be more sophisticated
          if (a.salary.includes("Trên 40")) return -1
          if (b.salary.includes("Trên 40")) return 1
          if (a.salary.includes("30-45")) return -1
          if (b.salary.includes("30-45")) return 1
          if (a.salary.includes("25-40")) return -1
          if (b.salary.includes("25-40")) return 1
          return 0
        })
        break
      case "commission":
        results.sort((a, b) => {
          const aValue = Number.parseFloat(a.commission.split(" ")[0])
          const bValue = Number.parseFloat(b.commission.split(" ")[0])
          return bValue - aValue
        })
        break
    }

    return results
  }

  // Handle filter change
  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => {
      const newFilters = {
        ...prev,
        [filterType]: value,
      }

      // Áp dụng bộ lọc ngay lập tức khi thay đổi
      requestAnimationFrame(() => {
        applyFilters(false, newFilters)
      })

      return newFilters
    })
  }

  // Toggle saved jobs filter
  const toggleSavedJobs = () => {
    setShowSavedOnly(!showSavedOnly)

    if (!showSavedOnly) {
      // Filter to show only saved jobs
      const savedJobs = jobs.filter((job) => job.isBookmarked)
      setFilteredJobs(savedJobs)

      setNotification({
        show: true,
        message: "Hiển thị việc làm đã lưu",
      })
    } else {
      // Reset to show all jobs (or apply current filters)
      applyFilters(true)

      setNotification({
        show: true,
        message: "Hiển thị tất cả việc làm",
      })
    }

    // Sử dụng ref để lưu trữ timeout ID
    const timeoutId = setTimeout(() => {
      setNotification({ show: false, message: "" })
    }, 3000)

    // Cleanup timeout khi component unmount hoặc khi hàm được gọi lại
    return () => clearTimeout(timeoutId)
  }

  // Apply filters
  const applyFilters = (skipSavedFilter = false, customFilters = filters) => {
    setLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      let results = applyFiltersToJobs(jobs, searchQuery, customFilters)

      // If skipSavedFilter is true, we need to reapply the saved filter
      if (skipSavedFilter && showSavedOnly) {
        results = results.filter((job) => job.isBookmarked)
      }

      setFilteredJobs(results)
      setLoading(false)
      setShowFilters(false)

      // Show notification if no results
      if (results.length === 0) {
        setNotification({
          show: true,
          message: showSavedOnly ? "Không có việc làm đã lưu" : "Không tìm thấy việc làm phù hợp",
        })

        setTimeout(() => {
          setNotification({ show: false, message: "" })
        }, 3000)
      }
    }, 800)
  }

  // Reset filters
  const resetFilters = () => {
    const newFilters = {
      position: "all",
      salary: "all",
      level: "all",
      location: "all",
      sort: "newest",
    }
    setFilters(newFilters)
    setTempFilters({
      position: "all",
      salary: "all",
      level: "all",
      location: "all",
    })
    setSearchQuery("")

    if (showSavedOnly) {
      // If in saved jobs mode, only show saved jobs
      const savedJobs = jobs.filter((job) => job.isBookmarked)
      setFilteredJobs(savedJobs)
    } else {
      // Otherwise show all jobs
      setFilteredJobs(jobs)
    }
  }

  // Handle pull-to-refresh
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const currentScrollY = e.currentTarget.scrollTop

    // Detect scroll direction
    if (currentScrollY > lastScrollY.current) {
      setScrollDirection("down")
    } else {
      setScrollDirection("up")
    }
    lastScrollY.current = currentScrollY

    // Pull-to-refresh logic
    if (currentScrollY < -50 && !refreshing) {
      handleRefresh()
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)

    // Simulate data refresh
    setTimeout(() => {
      // In a real app, you would fetch fresh data here
      setRefreshing(false)
      setNotification({
        show: true,
        message: "Dữ liệu đã được cập nhật",
      })

      setTimeout(() => {
        setNotification({ show: false, message: "" })
      }, 3000)
    }, 1500)
  }

  // Load more jobs on scroll to bottom (infinite scroll)
  const handleScrollEnd = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current

      // If scrolled to bottom
      if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
        loadMoreJobs()
      }
    }
  }

  const loadMoreJobs = () => {
    // Only load more if we have a reasonable number of jobs already
    // to avoid infinite loading of the same items in this demo
    if (filteredJobs.length <= 12) {
      setLoading(true)

      // Simulate API call delay
      setTimeout(() => {
        // In a real app, you would fetch more jobs here
        // For demo, we'll just duplicate existing jobs with new IDs
        const moreJobs = filteredJobs.slice(0, 3).map((job, index) => ({
          ...job,
          id: `job-more-${index}`,
          postedDate: "Mới đăng",
        }))

        setFilteredJobs([...filteredJobs, ...moreJobs])
        setLoading(false)
      }, 1000)
    }
  }

  // Apply filters when showSavedOnly changes
  useEffect(() => {
    applyFilters()
  }, [showSavedOnly])

  // Add scroll event listener for infinite scroll
  useEffect(() => {
    const currentRef = scrollRef.current

    const handleScrollEndEvent = () => {
      if (currentRef) {
        const { scrollTop, scrollHeight, clientHeight } = currentRef

        // If scrolled to bottom
        if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
          loadMoreJobs()
        }
      }
    }

    if (currentRef) {
      currentRef.addEventListener("scroll", handleScrollEndEvent)
      return () => {
        if (currentRef) {
          currentRef.removeEventListener("scroll", handleScrollEndEvent)
        }
      }
    }
  }, [filteredJobs, loading])

  // Cleanup search timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [])

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

  // Render skeleton loading
  const renderSkeletons = () => {
    return Array(3)
      .fill(0)
      .map((_, index) => (
        <div key={`skeleton-${index}`} className="bg-white rounded-xl shadow-md p-4 mb-4 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="flex flex-wrap gap-2 mb-3">
            <div className="h-5 bg-gray-200 rounded w-1/3"></div>
            <div className="h-5 bg-gray-200 rounded w-1/4"></div>
            <div className="h-5 bg-gray-200 rounded w-1/5"></div>
          </div>
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      ))
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Pull to refresh indicator */}
      {refreshing && (
        <div className="absolute top-0 left-0 right-0 flex justify-center py-3 bg-white z-10">
          <RefreshCw className="h-6 w-6 text-[#2E7D32] animate-spin" />
        </div>
      )}

      {/* Notification toast */}
      {notification.show && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-[#2E7D32] text-white px-4 py-2 rounded-md shadow-lg z-50 animate-fade-in">
          {notification.message}
        </div>
      )}

      <div className="flex-1 overflow-auto pb-16" ref={scrollRef} onScroll={handleScroll}>
        {/* Header */}
        <header className="bg-white p-4 shadow-sm sticky top-0 z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Link href="/home" className="mr-3">
                <ArrowLeft className="h-6 w-6 text-gray-700" />
              </Link>
              <h1 className="text-xl font-bold text-gray-800">Danh sách việc làm</h1>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className={`p-2 rounded-full ${showSavedOnly ? "bg-[#2E7D32]/10 text-[#2E7D32]" : "bg-gray-100 hover:bg-gray-200 text-gray-700"} transition-colors`}
                onClick={toggleSavedJobs}
              >
                <BookmarkCheck className="h-5 w-5" />
              </button>
              <button
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                onClick={() => {
                  setTempFilters({
                    position: filters.position,
                    salary: filters.salary,
                    level: filters.level,
                    location: filters.location,
                  })
                  setShowFilterPopup(true)
                }}
              >
                <Filter className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative mb-4 flex">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Tìm kiếm việc làm..."
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-l-md shadow-sm focus:ring-[#2E7D32] focus:border-[#2E7D32] sm:text-sm"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleSearchClick()
                  }
                }}
              />
              {searchQuery && (
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={handleClearSearch}
                  aria-label="Xóa tìm kiếm"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <button
              className="px-4 py-2 bg-[#2E7D32] text-white rounded-r-md hover:bg-[#2E7D32]/90 transition-colors flex items-center justify-center"
              onClick={handleSearchClick}
            >
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* Filter Popup */}
          {showFilterPopup && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[80vh] overflow-auto">
                <div className="sticky top-0 bg-white p-4 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="font-medium text-gray-800">Bộ lọc</h2>
                  <div className="flex items-center space-x-4">
                    <button
                      className="text-sm text-[#1565C0]"
                      onClick={() => {
                        setTempFilters({
                          position: "all",
                          salary: "all",
                          level: "all",
                          location: "all",
                        })
                      }}
                    >
                      Đặt lại
                    </button>
                    <button onClick={() => setShowFilterPopup(false)}>
                      <X className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  {/* Position filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vị trí công việc</label>
                    <select
                      className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-[#2E7D32] focus:border-[#2E7D32] sm:text-sm rounded-md"
                      value={tempFilters.position}
                      onChange={(e) => setTempFilters({ ...tempFilters, position: e.target.value })}
                    >
                      <option value="all">Tất cả</option>
                      <option value="it">IT</option>
                      <option value="marketing">Marketing</option>
                      <option value="sales">Sales</option>
                      <option value="hr">HR</option>
                    </select>
                  </div>

                  {/* Salary filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mức lương</label>
                    <select
                      className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-[#2E7D32] focus:border-[#2E7D32] sm:text-sm rounded-md"
                      value={tempFilters.salary}
                      onChange={(e) => setTempFilters({ ...tempFilters, salary: e.target.value })}
                    >
                      <option value="all">Tất cả</option>
                      <option value="under15">Dưới 15 triệu</option>
                      <option value="15to25">15-25 triệu</option>
                      <option value="25to40">25-40 triệu</option>
                      <option value="over40">Trên 40 triệu</option>
                    </select>
                  </div>

                  {/* Level filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trình độ</label>
                    <select
                      className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-[#2E7D32] focus:border-[#2E7D32] sm:text-sm rounded-md"
                      value={tempFilters.level}
                      onChange={(e) => setTempFilters({ ...tempFilters, level: e.target.value })}
                    >
                      <option value="all">Tất cả</option>
                      <option value="junior">Junior</option>
                      <option value="middle">Middle</option>
                      <option value="senior">Senior</option>
                      <option value="quản lý">Quản lý</option>
                    </select>
                  </div>

                  {/* Location filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Địa điểm</label>
                    <select
                      className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-[#2E7D32] focus:border-[#2E7D32] sm:text-sm rounded-md"
                      value={tempFilters.location}
                      onChange={(e) => setTempFilters({ ...tempFilters, location: e.target.value })}
                    >
                      <option value="all">Tất cả</option>
                      <option value="TP.HCM">TP.HCM</option>
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="Đà Nẵng">Đà Nẵng</option>
                    </select>
                  </div>
                </div>

                <div className="sticky bottom-0 bg-white p-4 border-t border-gray-100">
                  <button
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2E7D32] hover:bg-[#2E7D32]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2E7D32] transition-colors"
                    onClick={() => {
                      setFilters({
                        ...filters,
                        position: tempFilters.position,
                        salary: tempFilters.salary,
                        level: tempFilters.level,
                        location: tempFilters.location,
                      })
                      applyFilters(false, {
                        ...filters,
                        position: tempFilters.position,
                        salary: tempFilters.salary,
                        level: tempFilters.level,
                        location: tempFilters.location,
                      })
                      setShowFilterPopup(false)
                    }}
                  >
                    Áp dụng
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Active filters display */}
          {(filters.position !== "all" ||
            filters.salary !== "all" ||
            filters.level !== "all" ||
            filters.location !== "all") && (
            <div className="flex flex-wrap gap-2 mb-3">
              {filters.position !== "all" && (
                <div className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full flex items-center">
                  <span>Vị trí: {filters.position}</span>
                  <button className="ml-1" onClick={() => handleFilterChange("position", "all")}>
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              {filters.salary !== "all" && (
                <div className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full flex items-center">
                  <span>
                    Lương:{" "}
                    {filters.salary === "under15"
                      ? "Dưới 15tr"
                      : filters.salary === "15to25"
                        ? "15-25tr"
                        : filters.salary === "25to40"
                          ? "25-40tr"
                          : "Trên 40tr"}
                  </span>
                  <button className="ml-1" onClick={() => handleFilterChange("salary", "all")}>
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              {filters.level !== "all" && (
                <div className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full flex items-center">
                  <span>Trình độ: {filters.level}</span>
                  <button className="ml-1" onClick={() => handleFilterChange("level", "all")}>
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              {filters.location !== "all" && (
                <div className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full flex items-center">
                  <span>Địa điểm: {filters.location}</span>
                  <button className="ml-1" onClick={() => handleFilterChange("location", "all")}>
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          )}
        </header>

        {/* Main Content - Job Listings */}
        <main className="p-4">
          {/* Results count and sort */}
          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {filteredJobs.length} {showSavedOnly ? "việc làm đã lưu" : "việc làm phù hợp"}
            </p>
            <div className="flex items-center">
              <select
                className="text-sm border-none bg-transparent focus:ring-0 p-0 pr-4 text-right"
                value={filters.sort}
                onChange={(e) => {
                  const newValue = e.target.value
                  setFilters((prev) => {
                    const newFilters = { ...prev, sort: newValue }
                    // Áp dụng bộ lọc sau khi cập nhật state
                    requestAnimationFrame(() => {
                      applyFilters(false, newFilters)
                    })
                    return newFilters
                  })
                }}
              >
                <option value="newest" className="text-right">
                  Mới nhất
                </option>
                <option value="salary" className="text-right">
                  Mức lương
                </option>
                <option value="commission" className="text-right">
                  Hoa hồng cao nhất
                </option>
              </select>
            </div>
          </div>

          {/* Job cards */}
          {loading && filteredJobs.length === 0 ? (
            renderSkeletons()
          ) : filteredJobs.length > 0 ? (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <Link href={`/jobs/${job.id}`} key={job.id}>
                  <div className="bg-white rounded-xl shadow-md p-4 transition-transform hover:scale-[1.01] active:scale-[0.99]">
                    {/* Job header with tags */}
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-lg font-semibold text-gray-800 pr-2 flex-1">{job.title}</h2>
                      <div className="flex flex-wrap gap-1 justify-end min-w-[80px]">
                        {job.isBookmarked && (
                          <span className="bg-[#2E7D32]/10 text-[#2E7D32] text-xs px-2 py-0.5 rounded-full flex items-center whitespace-nowrap">
                            <BookmarkCheck className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span className="truncate">Đã lưu</span>
                          </span>
                        )}
                        {job.isHot && (
                          <span className="bg-[#D32F2F] text-white text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
                            Hot
                          </span>
                        )}
                        {job.isUrgent && (
                          <span className="bg-[#FFC107] text-gray-800 text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
                            Gấp
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Job details */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-gray-500 mr-1 flex-shrink-0" />
                        <span className="text-sm text-gray-700 truncate">{job.salary}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-500 mr-1 flex-shrink-0" />
                        <span className="text-sm text-gray-700 truncate">{job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-[#FFC107] mr-1 flex-shrink-0" />
                        <span className="text-sm font-medium text-[#FFC107]">{job.commission}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-500 mr-1 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{job.deadline}</span>
                      </div>
                    </div>

                    {/* Bottom section */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getLevelBadgeColor(job.level)}`}>
                          {job.level}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">
                          <Clock className="h-3 w-3 inline mr-1" />
                          {job.postedDate}
                        </span>
                      </div>
                      <div className="text-[#1565C0] text-sm font-medium">Xem chi tiết</div>
                    </div>
                  </div>
                </Link>
              ))}

              {/* Loading more indicator */}
              {loading && filteredJobs.length > 0 && (
                <div className="flex justify-center py-4">
                  <RefreshCw className="h-6 w-6 text-[#2E7D32] animate-spin" />
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Briefcase className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-1">
                {showSavedOnly ? "Không có việc làm đã lưu" : "Không tìm thấy việc làm phù hợp"}
              </h3>
              <p className="text-sm text-gray-500 text-center mb-4">
                {showSavedOnly
                  ? "Bạn chưa lưu việc làm nào. Hãy lưu việc làm yêu thích để xem lại sau."
                  : "Vui lòng thử điều chỉnh bộ lọc hoặc tìm kiếm với từ khóa khác"}
              </p>
              <button
                className="px-4 py-2 bg-[#2E7D32] text-white rounded-md text-sm font-medium hover:bg-[#2E7D32]/90 transition-colors"
                onClick={resetFilters}
              >
                {showSavedOnly ? "Xem tất cả việc làm" : "Đặt lại bộ lọc"}
              </button>
            </div>
          )}
        </main>
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
