
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { equipment, Equipment, rentalRequests, RentalRequest } from "@/data/dummyData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { ArrowRight, ListFilter } from "lucide-react";
import ToolCard from "@/pages/ToolCard";
export default function Dashboard() {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const [userEquipment, setUserEquipment] = useState<Equipment[]>([]);
  const [userRequests, setUserRequests] = useState<RentalRequest[]>([]);
  
  // Stats
  const [availableCount, setAvailableCount] = useState(0);
  const [rentedCount, setRentedCount] = useState(0);
  const [maintenanceCount, setMaintenanceCount] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);
  
  useEffect(() => {
    // Calculate equipment stats
    const available = equipment.filter(item => item.status === "available").length;
    const rented = equipment.filter(item => item.status === "rented").length;
    const maintenance = equipment.filter(item => item.status === "maintenance").length;
    
    setAvailableCount(available);
    setRentedCount(rented);
    setMaintenanceCount(maintenance);
    
    // Get user-specific data
    if (user) {
      if (user.role === "student") {
        // Get requests made by this user
        const userReqs = rentalRequests.filter(req => req.userId === user.id);
        setUserRequests(userReqs);
        
        // Get equipment rented by this user
        const rentedEquipmentIds = userReqs
          .filter(req => req.status === "approved")
          .map(req => req.equipmentId);
        
        const userEq = equipment.filter(eq => 
          rentedEquipmentIds.includes(eq.id)
        );
        setUserEquipment(userEq);
      } else if (user.role === "admin") {
        // Admins see pending requests
        const pending = rentalRequests.filter(req => req.status === "pending").length;
        setPendingRequests(pending);
      }
    }
  }, [user]);
  
  const totalEquipment = equipment.length;
  const [recentTools, setRecentTools] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(true);
  useEffect(() => {
    const fetchRecentTools = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/tools/all"); 
        const data = await res.json();
        setRecentTools(data);
      } catch (err) {
        console.error("Failed to fetch recent tools:", err);
      } finally {
        setLoadingRecent(false);
      }
    };

    fetchRecentTools();
  }, []);
  const getStatusTranslation = (status: string) => {
    if (status === "available") return t("equipment.available");
    if (status === "rented") return t("equipment.rented");
    if (status === "maintenance") return t("equipment.maintenance");
    if (status === "pending") return t("requests.pending");
    if (status === "approved") return t("requests.approved");
    if (status === "rejected") return t("requests.rejected");
    return status;
  };
  const popularCategories = [
    { name: "Control", count: recentTools.filter(t => t.category === "Control").length },
    { name: "PCB", count: recentTools.filter(t => t.category === "PCB").length },
    { name: "Structure", count: recentTools.filter(t => t.category === "Structure").length },
    // { name: "Diagnostic", count: tools.filter(t => t.category === "Diagnostic").length }
  ].sort((a, b) => b.count - a.count);
  return (
    <Layout 
      isAuthenticated={true}
      userRole={user?.role}
      userName={user?.name}
    >
      <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {/* Equipment Stats */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{t("equipment.title")}</CardTitle>
            <CardDescription>
              {t("equipment.status")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <span>{t("equipment.available")}</span>
                  </div>
                  <span>{availableCount} / {totalEquipment}</span>
                </div>
                <Progress value={(availableCount / totalEquipment) * 100} className="h-2 bg-muted" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-orange-500 mr-2"></div>
                    <span>{t("equipment.rented")}</span>
                  </div>
                  <span>{rentedCount} / {totalEquipment}</span>
                </div>
                <Progress value={(rentedCount / totalEquipment) * 100} className="h-2 bg-muted" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                    <span>{t("equipment.maintenance")}</span>
                  </div>
                  <span>{maintenanceCount} / {totalEquipment}</span>
                </div>
                <Progress value={(maintenanceCount / totalEquipment) * 100} className="h-2 bg-muted" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Student: My Equipment */}
        {user?.role === "student" && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>{t("dashboard.equipment")}</CardTitle>
              <CardDescription>
                {t("equipment.rented")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {userEquipment.length > 0 ? (
                <div className="space-y-3">
                  {userEquipment.map(eq => (
                    <div 
                      key={eq.id}
                      className="flex items-center justify-between p-3 border rounded-md"
                    >
                      <div>
                        <div className="font-medium">{eq.name}</div>
                        <div className="text-sm text-muted-foreground">{eq.category}</div>
                      </div>
                      <Badge className="bg-orange-500">
                        {t("equipment.rented")}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center text-muted-foreground">
                  <p>{t("equipment.request")}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
        
        {/* Student: My Requests */}
        {user?.role === "student" && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>{t("requests.title")}</CardTitle>
              <CardDescription>
                {t("requests.status")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {userRequests.length > 0 ? (
                <div className="space-y-3">
                  {userRequests.map(req => {
                    const eq = equipment.find(e => e.id === req.equipmentId);
                    return (
                      <div 
                        key={req.id}
                        className="flex items-center justify-between p-3 border rounded-md"
                      >
                        <div>
                          <div className="font-medium">{eq?.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(req.requestDate).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US')}
                          </div>
                        </div>
                        <Badge className={
                          req.status === "approved" ? "bg-green-500" :
                          req.status === "rejected" ? "bg-red-500" :
                          "bg-orange-500"
                        }>
                          {getStatusTranslation(req.status)}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-6 text-center text-muted-foreground">
                  <p>{t("requests.new")}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
        
        {/* Admin: Pending Requests */}
        {user?.role === "admin" && (
           <>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>{t("admin.requests")}</CardTitle>
              <CardDescription>
                {t("requests.pending")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingRequests}</div>
              <p className="mt-2 text-sm text-muted-foreground">
                {pendingRequests > 0
                  ? `${pendingRequests} ${t("requests.pending")}`
                  : "No pending requests"}
              </p>
            </CardContent>
          </Card>
           {/* <div>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Popular Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {popularCategories.map(category => (
                      <div key={category.name} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <ListFilter className="h-4 w-4 text-muted-foreground mr-2" />
                          <span>{category.name}</span>
                        </div>
                        <Badge variant="outline">{category.count} tools</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div> */}
           </>
          
        )}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Recent Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingRecent ? (
                    <p>Loading recent tools...</p>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {recentTools.slice(0, 4).map(tool => (
                          <ToolCard key={tool.id} tool={tool} />
                        ))}
                      </div>
                      {/* <div className="mt-4 text-center">
                        <Link
                          to="/catalog"
                          className="text-primary hover:underline inline-flex items-center"
                        >
                          View all tools <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div> */}
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
  { user?.role === "student" && (
    <div>
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Popular Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {popularCategories.map((category) => (
            <div key={category.name} className="flex items-center justify-between">
              <div className="flex items-center">
                <ListFilter className="h-4 w-4 text-muted-foreground mr-2" />
                <span>{category.name}</span>
              </div>
              <Badge variant="outline">{category.count} tools</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
  )}
          
          </div>
          
          {user?.role === "admin" && (
  <div>
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Popular Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {popularCategories.map((category) => (
            <div key={category.name} className="flex items-center justify-between">
              <div className="flex items-center">
                <ListFilter className="h-4 w-4 text-muted-foreground mr-2" />
                <span>{category.name}</span>
              </div>
              <Badge variant="outline">{category.count} tools</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
)}

     </Layout>
  );
}
