import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { equipment, RentalRequest, Equipment, RequestStatus, Users } from "@/data/dummyData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Clock, User, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
 import { Label } from "@/components/ui/label";
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
export default function RequestsPage() {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [requests, setRequests] = useState<RentalRequest[]>([]);
   const [equipments, setEquipments] = useState<Equipment[]>([]);
   const [userFetch , setuserFetch ] = useState<Users[]>([]); 
     const [filterTool, setFilterTool] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
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
        const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users/users'); 
        if (!response.ok) throw new Error('Failed to fetch equipments');
        const data = await response.json();
        setuserFetch(data);
        console.log(data); 
      } catch (error) {
        console.error(error);
      }
    };
    

    fetchReq();
    fetchEquipments();
    fetchUsers();
  }, []);
  // useEffect(() => {
  //   // Filter requests based on user role
  //   if (user?.role === 'admin') {
  //     setRequests(rentalRequests);
  //   } else if (user?.role === 'student') {
  //     const userRequests = rentalRequests.filter(req => req.userId === user.id);
  //     setRequests(userRequests);
  //   }
  // }, [user]);
const filterForUser = requests.filter((r) => {
  return String(r.userId) === String(user?.id);
});

const baseRequests = user?.role === "admin" ? requests : filterForUser;

const filteredRequests = baseRequests.filter((r) => {
  const toolMatch = filterTool ? r.toolId === filterTool : true;
  const statusMatch = filterStatus ? r.status === filterStatus : true;
  return toolMatch && statusMatch;
});


console.log("filterForUser", filterForUser);
console.log("Id user", user?.id);

 const getEquipmentById = (id: string): Equipment | undefined => {
 
    return equipments.find(eq => eq._id === id);
  };
  
  const getUserById = (id: string) => {
    return userFetch.find(u => u._id === id);
  };
  
  const getStatusBadgeColor = (status: RequestStatus) => {
    switch(status) {
      case 'approved':
        return 'bg-green-500';
      case 'rejected':
        return 'bg-red-500';
      case 'pending':
      default:
        return 'bg-orange-500';
    }
  };
  
  const getStatusTranslation = (status: string) => {
    if (status === "pending") return t("requests.pending");
    if (status === "approved") return t("requests.approved");
    if (status === "rejected") return t("requests.rejected");
    return status;
  };
  
 const handleApproveRequest = async (request: RentalRequest) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`https://core-production-71d5.up.railway.app/api/rent/approve/${request._id}`, {
      method: 'POST',  
      headers: {
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` }),
      },
    });
    if (!res.ok) throw new Error('Failed to approve request');
    
    setRequests(prev => prev.map(r =>
      r._id === request._id ? { ...r, status: 'approved' } : r
    ));
    
    toast({
      title: t("requests.requestApproved"),
      description: t("requests.requestApprovedDesc"),
    });
  } catch (error) {
    console.error(error);
  }
};


  
 const handleRejectRequest = async (request: RentalRequest) => {
  try {
    const res = await fetch(`http://localhost:3000/api/rent/reject/${request._id}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
    });
    
    if (!res.ok) throw new Error('Failed to reject request');
    
    setRequests(prev => prev.map(r =>
      r._id === request._id ? { ...r, status: 'rejected' } : r
    ));
    
    toast({
      title: t("requests.requestRejected"),
      description: t("requests.requestRejectedDesc"),
    });
  } catch (error) {
    console.error(error);
  }
};

  
  return (
    <Layout 
      isAuthenticated={true}
      userRole={user?.role}
      userName={user?.name}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">
          {t("requests.title")}
        </h1>
        {/* <p className="text-muted-foreground">{t("Requests")}</p> */}
      </div>
      
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
         <div>
           {/* <Label>{t("filters.tool")}</Label> */}
           <Select onValueChange={(val) => setFilterTool(val)}>
             <SelectTrigger>
               <SelectValue placeholder={t("SelectTool")} />
             </SelectTrigger>
             <SelectContent>
               {equipments.map((e) => (
                 <SelectItem key={e._id} value={e._id}>
                   {e.name}
                 </SelectItem>
               ))}
             </SelectContent>
           </Select>
         </div>
          <div>
          <Select onValueChange={(val) => setFilterStatus(val)}>
            <SelectTrigger>
              <SelectValue placeholder={t("SelectStatus")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
            </SelectContent>
          </Select>
        </div>
         </div>

                
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        { filteredRequests.map(request => {
          const equip = getEquipmentById(request.toolId);
          
          const requestUser = getUserById(request.userId);
      
          return (
            <Card key={request._id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">
                    {equip?.name || t("equipment.unknown")}
                  </CardTitle>
                  <Badge className={getStatusBadgeColor(request.status)}>
                    {getStatusTranslation(request.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {user?.role === 'admin' && (
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground mr-2">{t("Name")}:</span>
                      <span className="font-medium">{requestUser?.name}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground mr-2">{t("RequestDate")}:</span>
                    <span className="font-medium">
                      {new Date(request.createdAt).toLocaleDateString(
                        language === 'ar' ? 'ar-EG' : 'en-US'
                      )}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground mr-2">{t("StartDate")}:</span>
                    <span className="font-medium">
                      {new Date(request.startDate).toLocaleDateString(
                        language === 'ar' ? 'ar-EG' : 'en-US'
                      )}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground mr-2">{t("EndDate")}:</span>
                    <span className="font-medium">
                      {new Date(request.expectedReturnDate).toLocaleDateString(
                        language === 'ar' ? 'ar-EG' : 'en-US'
                      )}
                    </span>
                  </div>
                  
                  {request.timeSlot && (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground mr-2">{t("equipment.timeSlot")}:</span>
                      <span className="font-medium">{request.timeSlot}</span>
                    </div>
                  )}
                  
                  {request.reason && (
                    <div className="mt-3 pt-2 border-t">
                      <span className="text-muted-foreground block mb-1">{t("Comments")}:</span>
                      <p className="italic">{request.reason}</p>
                    </div>
                  )}
                  
                  {user?.role === 'admin' && request.status === 'pending' && (
                    <div className="pt-3 flex justify-end space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600"
                        onClick={() => handleApproveRequest(request)}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        {t("Approve")}
                      </Button>
                      
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                        onClick={() => handleRejectRequest(request)}
                      >
                        <X className="h-4 w-4 mr-1" />
                        {t("Reject")}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
        
        {/* { requests.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="py-6 text-center">
              <p className="text-muted-foreground">
                {user?.role === 'admin' 
                  ? t("admin.noRequests") 
                  : t("requests.noRequests")}
              </p>
            </CardContent>
          </Card>
        )} */}
                {/* {filteredRequests.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground py-10">
            {t("requests.noRequests")}
          </div>
        )} */}

      
      
        
        {/* { requests.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="py-6 text-center">
              <p className="text-muted-foreground">
                {user?.role === 'admin' 
                  ? t("admin.noRequests") 
                  : t("requests.noRequests")}
              </p>
            </CardContent>
          </Card>
        )} */}
                {/* {filteredRequests.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground py-10">
            {t("requests.noRequests")}
          </div>
        )} */}
      </div>
    </Layout>
  );
}


// import { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useAuth } from "@/contexts/AuthContext";
// import { useLanguage } from "@/contexts/LanguageContext";
// import Layout from "@/components/Layout";
// import { equipment, RentalRequest, Equipment, RequestStatus, Users } from "@/data/dummyData";
// export default function RequestsPage() {
//   const { t } = useLanguage();
//   const [requests, setRequests] = useState<Request[]>([]);
//   const [equipments, setEquipments] = useState<Equipment[]>([]);
//   const [users, setUsers] = useState<Users[]>([]);

//   const [filterTool, setFilterTool] = useState<string>("");
//   const [filterStatus, setFilterStatus] = useState<string>("");

//   useEffect(() => {
//     const fetchData = async () => {
//       const [requestRes, equipmentRes, userRes] = await Promise.all([
//         fetch("http://localhost:3000/api/rent/requests").then(res => res.json()),
//         fetch("http://localhost:3000/api/tools/all").then(res => res.json()),
//         fetch("http://localhost:3000/api/users/users").then(res => res.json())
//       ]);
//       setRequests(requestRes);
//       setEquipments(equipmentRes);
//       setUsers(userRes);
//     };
//     fetchData();
//   }, []);

 
// const { user } = useAuth();
//   return (
//     <Layout title={t("nav.requests")}
//      isAuthenticated={true}
//       userRole={user?.role}
//       userName={user?.name}
//     >
//       {/* الفلاتر */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//         <div>
//           <Label>{t("filters.tool")}</Label>
//           <Select onValueChange={(val) => setFilterTool(val)}>
//             <SelectTrigger>
//               <SelectValue placeholder={t("filters.selectTool")} />
//             </SelectTrigger>
//             <SelectContent>
//               {equipments.map((e) => (
//                 <SelectItem key={e._id} value={e._id}>
//                   {e.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

      //   <div>
      //     <Label>{t("filters.status")}</Label>
      //     <Select onValueChange={(val) => setFilterStatus(val)}>
      //       <SelectTrigger>
      //         <SelectValue placeholder={t("filters.selectStatus")} />
      //       </SelectTrigger>
      //       <SelectContent>
      //         <SelectItem value="pending">Pending</SelectItem>
      //         <SelectItem value="Reject">Reject</SelectItem>
      //         <SelectItem value="Accept">Accept</SelectItem>
      //       </SelectContent>
      //     </Select>
      //   </div>
      // </div>

//       {/* عرض الطلبات */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {filteredRequests.map((request) => {
//           const equipment = equipments.find((e) => e._id === request.equipmentId);
//           const user = users.find((u) => u._id === request.userId);

//           return (
//             <Card key={request._id}>
//               <CardContent className="space-y-2 p-4">
//                 <p className="font-semibold">{equipment?.name}</p>
//                 <p>{t("requests.user")}: {user?.name}</p>
//                 <p>{t("requests.startDate")}: {request.startDate}</p>
//                 <p>{t("requests.endDate")}: {request.endDate}</p>
//                 <p>{t("requests.time")}: {request.time}</p>
//                 <p>{t("requests.reason")}: {request.reason}</p>
//                 <p>{t("requests.status")}: {request.status}</p>
//               </CardContent>
//             </Card>
//           );
//         })}

      //   {filteredRequests.length === 0 && (
      //     <div className="col-span-full text-center text-muted-foreground py-10">
      //       {t("requests.noRequests")}
      //     </div>
      //   )}
      // </div>
//     </Layout>
//   );
// }
