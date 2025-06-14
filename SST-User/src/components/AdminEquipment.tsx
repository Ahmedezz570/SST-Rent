
import { useState , useEffect} from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Equipment } from "@/data/dummyData";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 , FileSpreadsheet } from "lucide-react";
import EquipmentFormDialog from "@/components/EquipmentFormDialog";
  import { useForm } from "react-hook-form";
  import { useToast } from "@/hooks/use-toast";
  import { Input } from "@/components/ui/input";
interface AdminEquipmentProps {
  equipment: Equipment[];
  onAdd: (newEquipment: Equipment) => void;
  onDelete: (id: string) => void;
  onUpdate: (updatedEquipment: Equipment) => void;
}
interface EquipmentFormData {
  name: string;
  description: string;
  category: string;
  status: 'Available' | 'In Use' | 'Maintenance';
  image: string;
  quantity: number;
}

export default function AdminEquipment({
  equipment,
  onAdd,
  onDelete,
  onUpdate,
}: AdminEquipmentProps) {
  
  const { t } = useLanguage();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
    const [recentTools, setRecentTools] = useState([]);
    const [loadingRecent, setLoadingRecent] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
     const { toast } = useToast();
    useEffect(() => {
      const fetchRecentTools = async () => {
        try {
          const res = await fetch("https://core-production-71d5.up.railway.app/api/tools/all"); 
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
     const editForm = useForm<EquipmentFormData>({
          defaultValues: {
            name: "",
            description: "",
            category: "",
            status: "Available",
            image: "/placeholder.svg",
            quantity: 1,
          }
        });
             const addForm = useForm<EquipmentFormData>({
          defaultValues: {
            name: "",
            description: "",
            category: "",
            status: "Available",
            image: "/placeholder.svg",
            quantity: 1,
          }
        });
  const handleOpenAddDialog = () => {
     addForm.reset({
        name: "",
        description: "",
        category: "",
        status: "Available",
        image: "/placeholder.svg",
        quantity: 1,
      });
    setIsAddDialogOpen(true);
  };
  
  const handleOpenEditDialog = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setIsEditDialogOpen(true);
  };
  
  const handleAddEquipment = async (data: EquipmentFormData) => {
    if (!onAdd) return;
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token);   
        const response = await fetch("https://core-production-71d5.up.railway.app/api/tools/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        const newEqu = await response.json();
        onAdd(newEqu); // Handle adding the user to the state
        setIsAddDialogOpen(false);
      } catch (error) {
        console.error("Error adding user:", error);
      }
    setIsAddDialogOpen(false);
  };
  
  const handleUpdateEquipment = (updatedEquipment: Equipment) => {
    onUpdate(updatedEquipment);
    setIsEditDialogOpen(false);
  };
  
  
  const handleExcelUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const excelData = await parseEquipmentExcel(file);
      
      excelData.forEach((item, index) => {
        const newEquipment: Equipment = {
          id: `${equipment.length + index + 1}`,
          name: item.name,
          description: item.description,
          category: item.category,
          status: (item.status as any) || 'available',
          imageUrl: '/placeholder.svg',
          quantity: item.quantity,
          specifications: {
            power: item.specifications?.power || '',
            weight: item.specifications?.weight || '',
            dimensions: item.specifications?.dimensions || '',
          },
          history: [{
            id: `${Date.now()}-${index}`,
            userId: '1',
            action: 'created',
            timestamp: new Date().toISOString().split('T')[0],
            notes: 'Equipment imported from Excel'
          }]
        };
        onAdd(newEquipment);
      });

      toast({
        title: "Excel Import Successful",
        description: `${excelData.length} equipment items imported successfully.`,
      });
    } catch (error) {
      toast({
        title: "Import Failed",
        description: "Failed to parse Excel file. Please check the format.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };
  const getStatusBadgeColor = (status: string) => {
    switch(status) {
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
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{t("admin.equipmentList")}</h2>
        {/* <Button onClick={handleOpenAddDialog}>
          <Plus className="mr-2 h-4 w-4" />
          {t("admin.addEquipment")}
        </Button> */}
        <div className="flex gap-2">
          <div className="relative">
            <Input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleExcelUpload}
              disabled={isUploading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Button variant="outline" disabled={isUploading}>
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              {isUploading ? "Uploading..." : "Import Excel"}
            </Button>
          </div>
          <Button onClick={handleOpenAddDialog}>
            <Plus className="mr-2 h-4 w-4" />
            {t("admin.addEquipment")}
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("name")}</TableHead>
              <TableHead>{t("category")}</TableHead>
              <TableHead className="w-[150px]">{t("status")}</TableHead>
              <TableHead className="text-right">{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTools.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeColor(item.status)}>
                    {getStatusTranslation(item.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleOpenEditDialog(item)}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">{t("common.edit")}</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                    <span className="sr-only">{t("common.delete")}</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {equipment.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  {t("admin.noEquipment")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <EquipmentFormDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddEquipment}
        title={t("admin.addEquipment")}
        description={t("admin.addEquipmentDesc")}
      />
      
      {selectedEquipment && (
        <EquipmentFormDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSubmit={handleUpdateEquipment}
          title={t("admin.editEquipment")}
          description={t("admin.editEquipmentDesc")}
          equipment={selectedEquipment}
        />
      )}
    </div>
  );
}
