
import { useState , useEffect} from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { equipment, RentalRequest, Equipment, RequestStatus, Users } from "@/data/dummyData";
import { 
  User, 
  Mail, 
  Building, 
  ShieldCheck, 
  Package, 
  History, 
  Check,
  X,
  ArrowUpRight
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
export default function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [requests, setRequests] = useState<[]>([]);
      const [equipments, setEquipments] = useState<Equipment[]>([]);
      useEffect(() => {
      // Fetch users data from API when the component mounts
      const fetchReq = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/rent/requests');
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
          const data = await response.json();
          console.log(data); 
          setRequests(data); 
        } catch (error) {
          // setError(error.message); 
          console.error('Error fetching rental requests:', error);
        } 
        // finally {
        //   setLoading(false);
        // }
      };
       const fetchEquipments = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/tools/all'); 
        if (!response.ok) throw new Error('Failed to fetch equipments');
        const data = await response.json();
        setEquipments(data);
        console.log(data); 
      } catch (error) {
        console.error(error);
      }
    };
      fetchReq();
      fetchEquipments();
       }, []);
  console.log(user);
  const filterForUser = requests.filter((r) => {
  return String(r.userId) === String(user?.id);
});
 const getEquipmentById = (id: string): Equipment | undefined => {
 
    return equipments.find(eq => eq._id === id);
  };
  const handleSave = () => {
    // In a real app, this would call an API to update the user's profile
    setIsEditing(false);
    
    toast({
      title: t("profile.updated"),
      description: t("profile.updatedDesc"),
    });
  };
  
  if (!user) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-full">
          <p>{t("common.loading")}</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout 
      isAuthenticated={true}
      userRole={user.role}
      userName={user.name}
    >
      {/* <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">
          {t("profile.title")}
        </h1>
        <p className="text-muted-foreground">{t("profile.subtitle")}</p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{t("profile.personalInfo")}</CardTitle>
                <CardDescription>{t("profile.personalInfoDesc")}</CardDescription>
              </div>
              <Badge variant={user.role === "admin" ? "default" : "outline"}>
                {user.role === "admin" ? t("user.admin") : t("user.student")}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t("user.name")}</Label>
              {isEditing ? (
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                />
              ) : (
                <div className="p-2 border rounded-md bg-muted/30">{user.name}</div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">{t("user.email")}</Label>
              {isEditing ? (
                <Input 
                  id="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              ) : (
                <div className="p-2 border rounded-md bg-muted/30">{user.email}</div>
              )}
            </div>
            
            {user.role === "student" && (
              <div className="space-y-2">
                <Label htmlFor="studentId">{t("user.studentId")}</Label>
                <div className="p-2 border rounded-md bg-muted/30">
                  {user.studentId || "-"}
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-end">
            {isEditing ? (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(false)} 
                  className="mr-2"
                >
                  {t("common.cancel")}
                </Button>
                <Button onClick={handleSave}>{t("common.save")}</Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>{t("common.edit")}</Button>
            )}
          </CardFooter>
        </Card>
      </div> */}
      <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8 w-full max-w-md">
          <TabsTrigger value="profile" className="flex-1">User Profile</TabsTrigger>
          <TabsTrigger value="rentals" className="flex-1">My Rentals</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>User Information</CardTitle>
                  <CardDescription>Your personal details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center mb-6">
                    <div className="bg-secondary text-white rounded-full w-20 h-20 flex items-center justify-center text-2xl mb-4">
                      {/* {currentUser.name.charAt(0)} */}
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <h2 className="text-xl font-semibold">{user.name }</h2>
                    <p className="text-gray-500">{user.name }</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-gray-600">{user.email }</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Building className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">ID</p>
                        <p className="text-gray-600">{user.studentId}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <ShieldCheck className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Role</p>
                        <p className="text-gray-600">{user.role }</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Package className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Active Rentals</p>
                        <p className="text-gray-600">{user.name ? user.name.charAt(0).toUpperCase() : "U"} tools</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Account Summary</CardTitle>
                  <CardDescription>Details about your account and activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-muted rounded-md p-4">
                      <h3 className="font-semibold mb-2 flex items-center">
                        <Package className="h-4 w-4 mr-2" /> 
                        Rental Statistics
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span>Total Rentals:</span>
                          <span>{user.name ? user.name.charAt(0).toUpperCase() : "U"}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Active Rentals:</span>
                          <span>{user.name ? user.name.charAt(0).toUpperCase() : "U"}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Returned Items:</span>
                          <span>{user.name ? user.name.charAt(0).toUpperCase() : "U"}</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-muted rounded-md p-4">
                      <h3 className="font-semibold mb-2 flex items-center">
                        <ShieldCheck className="h-4 w-4 mr-2" /> 
                        Permissions
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span>Request Tools:</span>
                          <Check className="h-4 w-4 text-green-500" />
                        </li>
                        <li className="flex justify-between">
                          <span>Extended Rentals:</span>
                          <Check className="h-4 w-4 text-green-500" />
                        </li>
                        <li className="flex justify-between">
                          <span>Admin Access:</span>
                          {user?.role === "Admin"  ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <X className="h-4 w-4 text-red-500" />
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center">
                      <History className="h-4 w-4 mr-2" /> 
                      Recent Activity
                    </h3>
                    
                    {filterForUser.length > 0 ? (
                      <div className="space-y-4">
                        {filterForUser.slice(0, 2).map(rental => {
                          const tool = getEquipmentById(rental.toolId);
                          return (
                            <div key={rental.id} className="flex justify-between items-center border-b pb-3">
                              <div>
                                <p className="font-medium">{tool?.name}</p>
                                <p className="text-sm text-gray-500">
                                  {rental.status === "Returned" 
                                    ? `Returned on ${rental.actualReturnDate}` 
                                    : `Checked out on ${rental.checkoutDate}`}
                                </p>
                              </div>
                              <Badge 
                                className={
                                  rental.status === "Returned" 
                                    ? "bg-green-100 text-green-800" 
                                    : "bg-blue-100 text-blue-800"
                                }
                              >
                                {rental.status}
                              </Badge>
                            </div>
                          );
                        })}
                        
                        <div className="pt-2">
                          <Link 
                            to="#"
                            onClick={() => setActiveTab("rentals")}
                            className="text-primary hover:underline text-sm flex items-center"
                          >
                            View all activity <ArrowUpRight className="ml-1 h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-4">
                        No rental activity yet
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="rentals">
          <div className="grid grid-cols-1 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Active Rentals</CardTitle>
                <CardDescription>Tools currently checked out to you</CardDescription>
              </CardHeader>
              <CardContent>
                {filterForUser.length > 0 ? (
                  <div className="space-y-6">
                    {filterForUser.map(rental => {
                      const tool = getEquipmentById(rental.toolId);
                      return (
                        <div key={rental.id} className="flex flex-col md:flex-row gap-4 border-b pb-6 last:border-0">
                          <div className="h-24 w-24 bg-gray-200 flex-shrink-0">
                            <img
                              src={tool?.imageUrl}
                              alt={tool?.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold">
                                  <Link to={`/tools/${tool?._id}`} className="hover:text-primary">
                                    {tool?.name}
                                  </Link>
                                </h3>
                                <p className="text-sm text-gray-500">{tool?.category}</p>
                              </div>
                              <Badge className="bg-blue-500 text-white">
                                {rental.status}
                              </Badge>
                            </div>
                            <div className="mt-2 text-sm">
                              <p><span className="text-gray-500">Checkout Date:</span> {rental.checkoutDate}</p>
                              <p><span className="text-gray-500">Expected Return:</span> {rental.expectedReturnDate}</p>
                              <p className="mt-2 text-gray-700">{rental.purpose}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Package className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Active Rentals</h3>
                    <p className="text-gray-500 mb-4">
                      You don't have any tools checked out at the moment.
                    </p>
                    <Link
                      to="/catalog"
                      className="text-primary hover:underline"
                    >
                      Browse Tools Catalog
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rental History</CardTitle>
                <CardDescription>Previously returned tools</CardDescription>
              </CardHeader>
              <CardContent>
                {filterForUser.length > 0 ? (
                  <div className="space-y-6">
                    {filterForUser.map(rental => {
                      const tool = getEquipmentById(rental.toolId);
                      return (
                        <div key={rental.id} className="flex flex-col md:flex-row gap-4 border-b pb-6 last:border-0">
                          <div className="h-24 w-24 bg-gray-200 flex-shrink-0">
                            <img
                              src={"/placeholder.svg"}
                              alt={"/placeholder.svg"}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold">
                                  <Link to={`/tools/${tool?._id}`} className="hover:text-primary">
                                    {tool?.name}
                                  </Link>
                                </h3>
                                <p className="text-sm text-gray-500">{tool?.category}</p>
                              </div>
                              <Badge className="bg-green-500 text-white">
                                {rental.status}
                              </Badge>
                            </div>
                            <div className="mt-2 text-sm">
                              <p><span className="text-gray-500">Checkout Date:</span> {rental.checkoutDate}</p>
                              <p><span className="text-gray-500">Returned Date:</span> {rental.actualReturnDate}</p>
                              <p className="mt-2 text-gray-700">{rental.reason}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <History className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Rental History</h3>
                    <p className="text-gray-500">
                      Your rental history will appear here once you've returned items.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
    </Layout>
  );
}
