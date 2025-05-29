import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // Add useNavigate
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext"; // Add useAuth
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Globe, 
  LogOut, 
  User, 
  LayoutDashboard, 
  Package, 
  ClipboardCheck
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
  isAuthenticated?: boolean;
  userRole?: "student" | "admin";
  userName?: string;
}

export default function Layout({ 
  children,
  isAuthenticated = false,
  userRole = "student", 
  userName = ""
}: LayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { toast } = useToast();
 const {user} = useAuth();
  const handleLogout = () => {
    logout();
    toast({
      title: t("auth.logoutSuccess"),
      description: t("auth.logoutMessage"),
    });
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4 md:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 md:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          
          <div className="flex items-center gap-2 font-semibold">
          <div
  className="cursor-pointer"
  onClick={() => navigate("/")}
>
  <img
    src="/LOGOO.png"
    alt="Logo"
    className="h-12 w-12 mr-2"
  />
</div>
 <span
   className="hidden md:inline-block cursor-pointer no-underline hover:no-underline"
  onClick={() => navigate("/")}
>
  {t("app.title")}
</span>

</div>

          
          <div className="flex-1"></div>
          
          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="mr-2"
                title={t("auth.logout")}
              >
                <LogOut className="h-5 w-5" />
                <span className="sr-only">{t("auth.logout")}</span>
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => changeLanguage(language === "en" ? "ar" : "en")}
              title={language === "en" ? "العربية" : "English"}
            >
              <Globe className="h-5 w-5" />
              <span className="sr-only">{t("language")}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              title={theme === "light" ? t("darkMode") : t("lightMode")}
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span className="sr-only">
                {theme === "light" ? t("darkMode") : t("lightMode")}
              </span>
            </Button>
          </div>
        </div>
      </header>
      
      <div className="flex h-[calc(100vh-3.5rem)]">
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={toggleSidebar}
          >
            <div
              className={`absolute inset-y-0 ${language === "ar" ? "right-0" : "left-0"} w-64 bg-sidebar border-r p-0`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex h-14 items-center border-b px-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-2"
                  onClick={toggleSidebar}
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close Menu</span>
                </Button>
                <span className="font-semibold">
                  {isAuthenticated ? t("dashboard.title") : t("app.title")}
                </span>
              </div>
              {renderSidebarContent(isAuthenticated, userRole)}
            </div>
          </div>
        )}
        
        {!isMobile && (
          <div className={`hidden md:block w-64 bg-sidebar border-r p-0 ${language === "ar" ? "border-l" : "border-r"}`}>
            {renderSidebarContent(isAuthenticated, userRole)}
          </div>
        )}
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {isAuthenticated && (
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight">
                {t("dashboard.welcome")}{userName ? `, ${userName}` : ''}
              </h1>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
  
  function renderSidebarContent(isAuthenticated: boolean, userRole: "student" | "admin") {
    if (!isAuthenticated) {
      return (
        <div className="flex flex-col gap-2 p-4">
          <Link to="/login">
            <Button variant="outline" className="w-full justify-start">
              {t("auth.login")}
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="outline" className="w-full justify-start">
              {t("auth.register")}
            </Button>
          </Link>
        </div>
      );
    }
    
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid gap-1 px-2">
            <Link to="/dashboard" className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent">
              <LayoutDashboard className="h-5 w-5" />
              <span>{t("dashboard.title")}</span>
            </Link>
            <Link to="/equipment" className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent">
              <Package className="h-5 w-5" />
              <span>{t("dashboard.equipment")}</span>
            </Link>
            <Link to="/requests" className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent">
              <ClipboardCheck className="h-5 w-5" />
              <span>{t("dashboard.requests")}</span>
            </Link>
            {userRole === "student" && (
               <Link to="/profile" className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent">
              <User className="h-5 w-5" />
              <span>{t("dashboard.profile")}</span>
            </Link>
            )}
           
            {userRole === "admin" && (
              <Link to="/admin" className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent">
                <User className="h-5 w-5" />
                <span>{t("admin.title")}</span>
              </Link>
            )}
          </nav>
        </div>
        
        <div className="mt-auto border-t p-4">
          <div className="flex items-center gap-3 py-2">
            <User className="h-5 w-5" />
            <span className="text-sm font-medium">
              {/* {userRole === "admin" ? "Admin" : "cgvhgvh"} */}
              {user.name}
            </span>
          </div>
          <Link to="/logout">
            <Button variant="ghost" className="w-full justify-start mt-2">
              <LogOut className="h-5 w-5 mr-2" />
              <span>{t("dashboard.logout")}</span>
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}
