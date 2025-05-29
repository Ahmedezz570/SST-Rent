
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Equipment, users } from "@/data/dummyData";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EquipmentHistoryComponent from "./EquipmentHistory";

interface EquipmentDialogProps {
  equipment: Equipment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRentRequest: (equipment: Equipment) => void;
}

export default function EquipmentDialog({
  equipment,
  open,
  onOpenChange,
  onRentRequest,
}: EquipmentDialogProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  
  const getStatusBadgeColor = (status: string) => {
    switch(status) {
      case 'available':
        return 'bg-green-500';
      case 'rented':
        return 'bg-orange-500';
      case 'maintenance':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusTranslation = (status: string) => {
    if (status === "available") return t("equipment.available");
    if (status === "rented") return t("equipment.rented");
    if (status === "maintenance") return t("equipment.maintenance");
    return status;
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{equipment.name}</DialogTitle>
          <DialogDescription>
            {t("equipment.details")}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="details">
          <TabsList className="mb-4">
            <TabsTrigger value="details">{t("equipment.details")}</TabsTrigger>
            <TabsTrigger value="history">{t("History")}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details">
            <div className="grid gap-4">
              <div className="h-48 bg-gray-200 rounded-md overflow-hidden">
                <img
                  src={equipment.imageUrl}
                  alt={equipment.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{t("Description")}</h3>
                <p className="text-sm text-muted-foreground mt-1">{equipment.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">{t("category")}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{equipment.category}</p>
                </div>
                <div>
                  <h3 className="font-medium">{t("status")}</h3>
                  <div className="mt-1">
                    <Badge className={getStatusBadgeColor(equipment.status)}>
                      {getStatusTranslation(equipment.status)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <EquipmentHistoryComponent history={equipment.history} users={users} />
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{t("common.close")}</Button>
          </DialogClose>
          {user?.role === 'student' && (
            <Button 
              disabled={equipment.status !== 'available'}
              onClick={() => onRentRequest(equipment)}
            >
              {t("equipment.rent")}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
