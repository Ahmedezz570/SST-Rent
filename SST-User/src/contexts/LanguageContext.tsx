import { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  // On mount, read the preferred language from localStorage or default to English
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
      document.documentElement.setAttribute("dir", savedLanguage === "ar" ? "rtl" : "ltr");
      document.documentElement.setAttribute("lang", savedLanguage);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", lang);
  };

  // Translations object
  const translations = {
    en: {
      // Auth
      "app.title": " SST -LabRent",
      "auth.login": "Login",
      "auth.register": "Register",
      "auth.email": "Email",
      "auth.password": "Password",
      "auth.confirmPassword": "Confirm Password",
      "auth.fullName": "Full Name",
      "auth.studentId": "Student ID",
      "auth.forgotPassword": "Forgot Password?",
      "auth.noAccount": "Don't have an account?",
      "auth.hasAccount": "Already have an account?",
      
      // Dashboard
      "dashboard.title": "Dashboard",
      "dashboard.welcome": "Welcome",
      "dashboard.equipment": "Equipment",
      "dashboard.requests": "Requests",
      "dashboard.profile": "Profile",
      "dashboard.logout": "Logout",
      
      // Equipment
      "equipment.title": "Available Equipment",
      "equipment.search": "Search equipment",
      "equipment.status": "Status",
      "equipment.available": "Available",
      "equipment.rented": "Rented",
      "equipment.maintenance": "Under Maintenance",
      "equipment.request": "Request Rental",
      "equipment.details": "View Details",
      
      // Requests
      "requests.title": "My Requests",
      "requests.new": "New Request",
      "requests.status": "Status",
      "requests.pending": "Pending",
      "requests.approved": "Approved",
      "requests.rejected": "Rejected",
      "requests.from": "From",
      "requests.to": "To",
      "requests.equipment": "Equipment",
      
      // Admin
      "admin.title": "Admin Dashboard",
      "admin.requests": "Rental Requests",
      "admin.approve": "Approve",
      "admin.reject": "Reject",
      "admin.addEquipment": "Add Equipment",
      
      // Misc
      "loading": "Loading",
      "cancel": "Cancel",
      "submit": "Submit",
      "save": "Save",
      "delete": "Delete",
      "darkMode": "Dark Mode",
      "lightMode": "Light Mode",
      "language": "Language",
      "english": "English",
      "arabic": "العربية",
    },
    ar: {
      // Auth
      "app.title": "تأجير معدات",
      "auth.login": "تسجيل الدخول",
      "auth.register": "إنشاء حساب",
      "auth.email": "البريد الإلكتروني",
      "auth.password": "كلمة المرور",
      "auth.confirmPassword": "تأكيد كلمة المرور",
      "auth.fullName": "الاسم الكامل",
      "auth.studentId": "رقم الطالب",
      "auth.forgotPassword": "نسيت كلمة المرور؟",
      "auth.noAccount": "ليس لديك حساب؟",
      "auth.hasAccount": "لديك حساب بالفعل؟",
      
      // Dashboard
      "dashboard.title": "لوحة التحكم",
      "dashboard.welcome": "مرحبًا",
      "dashboard.equipment": "المعدات",
      "dashboard.requests": "الطلبات",
      "dashboard.profile": "الملف الشخصي",
      "dashboard.logout": "تسجيل الخروج",
      
      // Equipment
      "equipment.title": "المعدات المتاحة",
      "equipment.search": "بحث عن معدات",
      "equipment.status": "الحالة",
      "equipment.available": "متاح",
      "equipment.rented": "مؤجر",
      "equipment.maintenance": "تحت الصيانة",
      "equipment.request": "طلب استئجار",
      "equipment.details": "عرض التفاصيل",
      
      // Requests
      "requests.title": "طلباتي",
      "requests.new": "طلب جديد",
      "requests.status": "الحالة",
      "requests.pending": "قيد الانتظار",
      "requests.approved": "تمت الموافقة",
      "requests.rejected": "مرفوض",
      "requests.from": "من",
      "requests.to": "إلى",
      "requests.equipment": "المعدات",
      
      // Admin
      "admin.title": "لوحة تحكم المسؤول",
      "admin.requests": "طلبات الإيجار",
      "admin.approve": "الموافقة",
      "admin.reject": "رفض",
      "admin.addEquipment": "إضافة معدات",
      
      // Misc
      "loading": "جاري التحميل",
      "cancel": "إلغاء",
      "submit": "إرسال",
      "save": "حفظ",
      "delete": "حذف",
      "darkMode": "الوضع المظلم",
      "lightMode": "الوضع المضيء",
      "language": "اللغة",
      "english": "English",
      "arabic": "العربية",
    },
  };

  // Translation function
  const t = (key: string) => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
