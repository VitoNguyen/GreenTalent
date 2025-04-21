"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Check, Eye, EyeOff, Loader2, Mail, Lock, User, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function LoginPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"login" | "register">("login")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
    fullName: "",
    username: "",
    confirmPassword: "",
    agreeTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [notification, setNotification] = useState<{
    show: boolean
    message: string
    type: "success" | "error"
  }>({ show: false, message: "", type: "success" })

  // Add these to the existing state declarations
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false)
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("")
  const [forgotPasswordError, setForgotPasswordError] = useState("")
  const [forgotPasswordSubmitting, setForgotPasswordSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }

    // Calculate password strength
    if (name === "password") {
      calculatePasswordStrength(value)
    }
  }

  const calculatePasswordStrength = (password: string) => {
    let strength = 0
    if (password.length > 6) strength += 1
    if (password.match(/[A-Z]/)) strength += 1
    if (password.match(/[0-9]/)) strength += 1
    if (password.match(/[^A-Za-z0-9]/)) strength += 1
    setPasswordStrength(strength)
  }

  const validateLoginForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = "Email là bắt buộc"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ"
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateRegisterForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName) {
      newErrors.fullName = "Họ và tên là bắt buộc"
    }

    if (!formData.email) {
      newErrors.email = "Email là bắt buộc"
    } else if (!/\S+@company\.com$/.test(formData.email)) {
      newErrors.email = "Vui lòng sử dụng email công ty (@company.com)"
    }

    if (!formData.username) {
      newErrors.username = "Tên đăng nhập là bắt buộc"
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc"
    } else if (formData.password.length < 8) {
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp"
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "Bạn phải đồng ý với điều khoản sử dụng"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateLoginForm()) {
      setLoading(true)

      // Simulate API call
      setTimeout(() => {
        setLoading(false)
        setNotification({
          show: true,
          message: "Đăng nhập thành công!",
          type: "success",
        })

        // Navigate to home page after successful login
        setTimeout(() => {
          window.location.href = "/home"
        }, 1000)
      }, 1500)
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateRegisterForm()) {
      setLoading(true)

      // Simulate API call
      setTimeout(() => {
        setLoading(false)
        setNotification({
          show: true,
          message: "Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản.",
          type: "success",
        })
      }, 1500)
    }
  }

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate email
    if (!forgotPasswordEmail) {
      setForgotPasswordError("Email là bắt buộc")
      return
    } else if (!/\S+@\S+\.\S+/.test(forgotPasswordEmail)) {
      setForgotPasswordError("Email không hợp lệ")
      return
    }

    setForgotPasswordError("")
    setForgotPasswordSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setForgotPasswordSubmitting(false)
      setShowForgotPasswordModal(false)
      setForgotPasswordEmail("")

      // Show success notification
      setNotification({
        show: true,
        message: "Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn",
        type: "success",
      })
    }, 1500)
  }

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ ...notification, show: false })
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex flex-col items-center pt-10 pb-6">
        <div className="w-24 h-24 mb-4 relative">
          {/* Logo grid design */}
          <div className="absolute grid grid-cols-3 grid-rows-3 gap-0.5 w-full h-full">
            <div className="bg-[#1565C0] rounded-sm"></div>
            <div className="bg-[#1565C0] rounded-sm"></div>
            <div className="bg-transparent"></div>
            <div className="bg-[#2E7D32] rounded-sm"></div>
            <div className="bg-[#D32F2F] rounded-sm"></div>
            <div className="bg-[#2E7D32] rounded-sm"></div>
            <div className="bg-transparent"></div>
            <div className="bg-[#FFC107] rounded-sm"></div>
            <div className="bg-[#FFC107] rounded-sm"></div>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-[#2E7D32]">GreenTalent</h1>
        <p className="text-sm text-[#757575] font-medium mt-1">Kết nối nhân tài, phát triển tương lai</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 px-6">
        <button
          className={cn(
            "flex-1 py-3 font-medium text-sm relative",
            activeTab === "login" ? "text-[#2E7D32]" : "text-gray-500 hover:text-gray-700",
          )}
          onClick={() => setActiveTab("login")}
        >
          Đăng nhập
          {activeTab === "login" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2E7D32]"></div>}
        </button>
        <button
          className={cn(
            "flex-1 py-3 font-medium text-sm relative",
            activeTab === "register" ? "text-[#1565C0]" : "text-gray-500 hover:text-gray-700",
          )}
          onClick={() => setActiveTab("register")}
        >
          Đăng ký
          {activeTab === "register" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1565C0]"></div>}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 pb-6">
        {/* Login Form */}
        {activeTab === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email / Tên đăng nhập
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={cn(
                    "block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-[#2E7D32] focus:border-[#2E7D32] sm:text-sm",
                    errors.email ? "border-[#D32F2F]" : "border-gray-300",
                  )}
                  placeholder="email@company.com"
                />
              </div>
              {errors.email && (
                <p className="text-[#D32F2F] text-xs mt-1 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={cn(
                    "block w-full pl-10 pr-10 py-2 border rounded-md shadow-sm focus:ring-[#2E7D32] focus:border-[#2E7D32] sm:text-sm",
                    errors.password ? "border-[#D32F2F]" : "border-gray-300",
                  )}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-[#D32F2F] text-xs mt-1 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#2E7D32] focus:ring-[#2E7D32] border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                  Ghi nhớ đăng nhập
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-[#1565C0] hover:text-[#1565C0]/80"
                  onClick={(e) => {
                    e.preventDefault()
                    setShowForgotPasswordModal(true)
                  }}
                >
                  Quên mật khẩu?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2E7D32] hover:bg-[#2E7D32]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2E7D32] transition-colors overflow-hidden relative"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Đăng nhập"}
                <span className="absolute inset-0 overflow-hidden rounded-md">
                  <span className="absolute inset-0 rounded-md pointer-events-none bg-white/10 opacity-0 hover:opacity-100 transition-opacity"></span>
                </span>
              </button>
            </div>
          </form>
        )}

        {/* Register Form */}
        {activeTab === "register" && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Họ và tên đầy đủ
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={cn(
                    "block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-[#1565C0] focus:border-[#1565C0] sm:text-sm",
                    errors.fullName ? "border-[#D32F2F]" : "border-gray-300",
                  )}
                  placeholder="Nguyễn Văn A"
                />
              </div>
              {errors.fullName && (
                <p className="text-[#D32F2F] text-xs mt-1 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.fullName}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="registerEmail" className="block text-sm font-medium text-gray-700">
                Email công ty
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="registerEmail"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={cn(
                    "block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-[#1565C0] focus:border-[#1565C0] sm:text-sm",
                    errors.email ? "border-[#D32F2F]" : "border-gray-300",
                  )}
                  placeholder="email@company.com"
                />
              </div>
              {errors.email && (
                <p className="text-[#D32F2F] text-xs mt-1 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Tên đăng nhập
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={cn(
                    "block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-[#1565C0] focus:border-[#1565C0] sm:text-sm",
                    errors.username ? "border-[#D32F2F]" : "border-gray-300",
                  )}
                  placeholder="username"
                />
              </div>
              {errors.username && (
                <p className="text-[#D32F2F] text-xs mt-1 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.username}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="registerPassword" className="block text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="registerPassword"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={cn(
                    "block w-full pl-10 pr-10 py-2 border rounded-md shadow-sm focus:ring-[#1565C0] focus:border-[#1565C0] sm:text-sm",
                    errors.password ? "border-[#D32F2F]" : "border-gray-300",
                  )}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-[#D32F2F] text-xs mt-1 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.password}
                </p>
              )}

              {/* Password strength meter */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Độ mạnh mật khẩu:</span>
                    <span className="text-xs font-medium">
                      {passwordStrength === 0 && "Yếu"}
                      {passwordStrength === 1 && "Trung bình"}
                      {passwordStrength === 2 && "Khá"}
                      {passwordStrength === 3 && "Mạnh"}
                      {passwordStrength === 4 && "Rất mạnh"}
                    </span>
                  </div>
                  <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full transition-all duration-300",
                        passwordStrength === 0 && "w-1/4 bg-[#D32F2F]",
                        passwordStrength === 1 && "w-2/4 bg-[#FFC107]",
                        passwordStrength === 2 && "w-3/4 bg-[#FFC107]",
                        passwordStrength === 3 && "w-4/4 bg-[#2E7D32]",
                        passwordStrength === 4 && "w-4/4 bg-[#2E7D32]",
                      )}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={cn(
                    "block w-full pl-10 pr-10 py-2 border rounded-md shadow-sm focus:ring-[#1565C0] focus:border-[#1565C0] sm:text-sm",
                    errors.confirmPassword ? "border-[#D32F2F]" : "border-gray-300",
                  )}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-[#D32F2F] text-xs mt-1 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreeTerms"
                  name="agreeTerms"
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#1565C0] focus:ring-[#1565C0] border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreeTerms" className="font-medium text-gray-700">
                  Tôi đồng ý với{" "}
                  <a href="#" className="text-[#1565C0]">
                    điều khoản sử dụng
                  </a>
                </label>
                {errors.agreeTerms && (
                  <p className="text-[#D32F2F] text-xs mt-1 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.agreeTerms}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1565C0] hover:bg-[#1565C0]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1565C0] transition-colors overflow-hidden relative"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Đăng ký"}
                <span className="absolute inset-0 overflow-hidden rounded-md">
                  <span className="absolute inset-0 rounded-md pointer-events-none bg-white/10 opacity-0 hover:opacity-100 transition-opacity"></span>
                </span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto py-4 text-center text-xs text-gray-500">
        <p>Powered by Green Speed</p>
        <p className="mt-1">v1.0.0</p>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Quên mật khẩu</h3>
              <p className="text-sm text-gray-500 mt-1">Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu</p>
            </div>

            <form onSubmit={handleForgotPassword} className="p-4">
              <div className="space-y-2">
                <label htmlFor="forgotPasswordEmail" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="forgotPasswordEmail"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-[#1565C0] focus:border-[#1565C0] sm:text-sm ${
                      forgotPasswordError ? "border-[#D32F2F]" : "border-gray-300"
                    }`}
                    placeholder="email@example.com"
                  />
                </div>
                {forgotPasswordError && (
                  <p className="text-[#D32F2F] text-xs mt-1 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {forgotPasswordError}
                  </p>
                )}
              </div>

              <div className="mt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  onClick={() => {
                    setShowForgotPasswordModal(false)
                    setForgotPasswordEmail("")
                    setForgotPasswordError("")
                  }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={forgotPasswordSubmitting}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#1565C0] hover:bg-[#1565C0]/90 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1565C0] flex items-center"
                >
                  {forgotPasswordSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Gửi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification.show && (
        <div
          className={cn(
            "fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md shadow-lg text-white text-xs sm:text-sm flex items-center animate-fade-in max-w-[90%] sm:max-w-md",
            notification.type === "success" ? "bg-[#2E7D32]" : "bg-[#D32F2F]",
          )}
        >
          {notification.type === "success" ? (
            <Check className="h-4 w-4 min-w-4 mr-2 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 min-w-4 mr-2 flex-shrink-0" />
          )}
          <span className="truncate">{notification.message}</span>
        </div>
      )}
    </div>
  )
}
