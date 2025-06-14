import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { equipment, Equipment, rentalRequests } from "@/data/dummyData";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import EquipmentDialog from "@/components/EquipmentDialog";
import RentalRequestForm, { RentalFormData } from "@/components/RentalRequestForm";
import { Link } from "react-router-dom"; 
import { usePagination } from "../hooks/usePagination"; 

export default function EquipmentPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rentalFormOpen, setRentalFormOpen] = useState(false);
  const { toast } = useToast();
  const [loadingRecent, setLoadingRecent] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); 

  useEffect(() => {
    const fetchRecentTools = async () => {
      try {
        const res = await fetch("https://core-production-71d5.up.railway.app/api/tools/all"); 
        const data = await res.json();
        setEquipmentList(data);
      } catch (err) {
        console.error("Failed to fetch recent tools:", err);
      } finally {
        setLoadingRecent(false);
      }
    };

    fetchRecentTools();
  }, []);

  const {
    items: paginatedItems,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  } = usePagination<Equipment>({
    items: equipmentList,
    itemsPerPage: 6,
    currentPage,
    sortByDate: (item) => item.createdAt || "", 
  });

  const openEquipmentDialog = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setDialogOpen(true);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-500';
      case 'In Use':
        return 'bg-orange-500';
      case 'Maintenance':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusTranslation = (status: string) => {
    if (status === "Available") return t("equipment.available");
    if (status === "In Use") return t("equipment.rented");
    if (status === "Maintenance") return t("equipment.maintenance");
    return status;
  };

  const handleRentRequest = (equipment: Equipment) => {
    if (equipment.status !== 'available') {
      toast({
        title: t("equipment.notAvailable"),
        description: t("equipment.cannotRent"),
        variant: "destructive",
      });
      return;
    }

    setSelectedEquipment(equipment);
    setDialogOpen(false);
    setRentalFormOpen(true);
  };

  const handleRentalFormSubmit = (data: RentalFormData) => {
    if (!selectedEquipment || !user) return;

    const newId = `${rentalRequests.length + 1}`;
    const startDateString = data.startDate.toISOString().split('T')[0];
    const endDateString = data.endDate.toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];

    const newRequest = {
      id: newId,
      equipmentId: selectedEquipment.id,
      userId: user.id,
      startDate: startDateString,
      endDate: endDateString,
      status: 'pending' as const,
      requestDate: today,
      comments: data.comments,
      timeSlot: data.timeSlot
    };

    rentalRequests.push(newRequest);

    toast({
      title: t("equipment.requestSent"),
      description: t("equipment.requestSentDesc"),
    });

    setRentalFormOpen(false);
  };

  return (
    <Layout
      isAuthenticated={true}
      userRole={user?.role}
      userName={user?.name}
    >
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">
          {t("equipment.title")}
        </h1>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {paginatedItems.map((item) => (
          <Card key={item._id} className="overflow-hidden">
            <div className="h-48 bg-gray-200 relative">
              <img
                src={"/placeholder.svg"}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <Badge
                className={`absolute top-2 right-2 ${getStatusBadgeColor(item.status)}`}
              >
                {getStatusTranslation(item.status)}
              </Badge>
              <Badge
                className="absolute bottom-2 right-2 bg-blue-500"
                variant="secondary"
              >
                {t("equipment.quantityAvailable")}: {item.quantity}
              </Badge>
            </div>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              <p className="text-sm font-medium mt-2">{t("Category")}: {item.category}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link
                to={`/tools/${item._id}`}
                className="text-primary text-sm font-medium hover:underline"
              >
                {t("equipment.details")}
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <Button 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={!hasPreviousPage}
        >
          Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button 
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={!hasNextPage}
        >
          Next
        </Button>
      </div>

      {selectedEquipment && (
        <>
          <EquipmentDialog
            equipment={selectedEquipment}
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            onRentRequest={handleRentRequest}
          />

          <RentalRequestForm
            equipment={selectedEquipment}
            open={rentalFormOpen}
            onOpenChange={setRentalFormOpen}
            onSubmit={handleRentalFormSubmit}
          />
        </>
      )}
    </Layout>
  );
}
