
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { equipment, Equipment, users, User } from "@/data/dummyData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminEquipment from "@/components/AdminEquipment";
import AdminUsers from "@/components/AdminUsers";
import { useToast } from "@/hooks/use-toast";

export default function AdminPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [equipmentList, setEquipmentList] = useState<Equipment[]>(equipment);
  const [usersList, setUsersList] = useState<User[]>(users);
  const { toast } = useToast();
  
  const handleAddEquipment = (newEquipment: Equipment) => {
    // Add history entry for creation
    const equipWithHistory: Equipment = {
      ...newEquipment,
      history: [
        {
          id: '1',
          userId: user?.id || '1',
          action: 'created',
          timestamp: new Date().toISOString(),
          notes: 'Equipment added to inventory'
        }
      ]
    };
    
    setEquipmentList(prev => [...prev, equipWithHistory]);
    
    // Update the global equipment array (in a real app, this would be an API call)
    equipment.push(equipWithHistory);
    
    toast({
      title: t("admin.equipmentAdded"),
      description: t("admin.equipmentAddedDesc"),
    });
  };
  
  const handleDeleteEquipment = (id: string) => {
    setEquipmentList(prev => prev.filter(item => item.id !== id));
    
    // Update the global equipment array (in a real app, this would be an API call)
    const index = equipment.findIndex(e => e.id === id);
    if (index !== -1) {
      equipment.splice(index, 1);
    }
    
    toast({
      title: t("admin.equipmentDeleted"),
      description: t("admin.equipmentDeletedDesc"),
    });
  };
  
  const handleUpdateEquipment = (updatedEquipment: Equipment) => {
    // Preserve the existing history
    const existingEquip = equipmentList.find(item => item.id === updatedEquipment.id);
    const history = existingEquip?.history || [];
    
    // Add history entry for update
    const newHistoryEntry = {
      id: `${history.length + 1}`,
      userId: user?.id || '1',
      action: 'maintenance' as const,
      timestamp: new Date().toISOString(),
      notes: 'Equipment updated'
    };
    
    const equipWithHistory = {
      ...updatedEquipment,
      history: [...history, newHistoryEntry]
    };
    
    setEquipmentList(prev => 
      prev.map(item => item.id === updatedEquipment.id ? equipWithHistory : item)
    );
    
    // Update the global equipment array (in a real app, this would be an API call)
    const index = equipment.findIndex(e => e.id === updatedEquipment.id);
    if (index !== -1) {
      equipment[index] = equipWithHistory;
    }
    
    toast({
      title: t("admin.equipmentUpdated"),
      description: t("admin.equipmentUpdatedDesc"),
    });
  };
  
  const handleAddUser = (newUser: User) => {
    // Add creation date
    const userWithDate = {
      ...newUser,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setUsersList(prev => [...prev, userWithDate]);
    
    // Update the global users array (in a real app, this would be an API call)
    users.push(userWithDate);
    
    toast({
      title: t("admin.userAdded"),
      description: t("admin.userAddedDesc"),
    });
  };
  
  const handleUpdateUser = (updatedUser: User) => {
    setUsersList(prev => 
      prev.map(item => item.id === updatedUser.id ? updatedUser : item)
    );
    
    // Update the global users array (in a real app, this would be an API call)
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
    }
    
    toast({
      title: t("admin.userUpdated"),
      description: t("admin.userUpdatedDesc"),
    });
  };
  
  const handleDeleteUser = (id: string) => {
    setUsersList(prev => prev.filter(item => item.id !== id));
    
    // Update the global users array (in a real app, this would be an API call)
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      users.splice(index, 1);
    }
    
    toast({
      title: t("admin.userDeleted"),
      description: t("admin.userDeletedDesc"),
    });
  };
  
  return (
    <Layout 
      isAuthenticated={true}
      userRole={user?.role}
      userName={user?.name}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">
          {t("admin.title")}
        </h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>
      
      <Tabs defaultValue="equipment" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="equipment">{t("manageEquipment")}</TabsTrigger>
          <TabsTrigger value="users">{t("manageUsers")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="equipment">
          <AdminEquipment 
            equipment={equipmentList} 
            onAdd={handleAddEquipment}
            onDelete={handleDeleteEquipment}
            onUpdate={handleUpdateEquipment}
          />
        </TabsContent>
        
        <TabsContent value="users">
          <AdminUsers 
            users={usersList}
            onAdd={handleAddUser}
            onUpdate={handleUpdateUser}
            onDelete={handleDeleteUser}
          />
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
