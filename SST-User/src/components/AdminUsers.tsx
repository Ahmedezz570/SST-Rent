
  import { useState , useEffect} from "react";
  import { useLanguage } from "@/contexts/LanguageContext";
  import { Users } from "@/data/dummyData";
  import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
  } from "@/components/ui/table";
  import { Badge } from "@/components/ui/badge";
  import { Button } from "@/components/ui/button";
  import { 
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card";
  import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle,
    DialogDescription,
    DialogFooter
  } from "@/components/ui/dialog";
  import { 
    Form, 
    FormControl, 
    FormDescription, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { useForm } from "react-hook-form";
  import { Plus, Edit, Trash2, User as UserIcon } from "lucide-react";

  interface AdminUsersProps {
    users: Users[];
    onAdd?: (newUser: Users) => void;
    onUpdate?: (updatedUser: Users) => void;
    onDelete?: (id: string) => void;
  }

  interface UserFormData {
    name: string;
    email: string;
    password: string;
    role: 'student' | 'admin';
    studentId?: string;
  }

  export default function AdminUsers({ 
    users,
    onAdd,
    onUpdate,
    onDelete
  }: AdminUsersProps) {
    const { t } = useLanguage();
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    
    const addForm = useForm<UserFormData>({
      defaultValues: {
        name: "",
        email: "",
        password: "",
        role: "student",
        studentId: "",
      }
    });
    
    const editForm = useForm<UserFormData>({
      defaultValues: {
        name: "",
        email: "",
        password: "",
        role: "student",
        studentId: "",
      }
    });
    
    const handleOpenAddDialog = () => {
      addForm.reset({
        name: "",
        email: "",
        password: "",
        role: "student",
        studentId: "",
      });
      setIsAddDialogOpen(true);
    };
    
    const handleOpenEditDialog = (user: User) => {
      setSelectedUser(user);
      editForm.reset({
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        studentId: user.studentId || "",
      });
      setIsEditDialogOpen(true);
    };
    
    const handleAddUser = async (data: UserFormData) => {
      if (!onAdd) return;
      try {
        const response = await fetch("http://localhost:3000/api/users/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const newUser = await response.json();
        onAdd(newUser); // Handle adding the user to the state
        setIsAddDialogOpen(false);
      } catch (error) {
        console.error("Error adding user:", error);
      }
    };
    
    
    
    const handleUpdateUser = async (data: UserFormData) => {
      if (!onUpdate || !selectedUser) return;
    
      try {
        const response = await fetch(`http://localhost:3000/api/users/users/${selectedUser._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
    
        const updatedUser = await response.json();
        onUpdate(updatedUser); // Handle updating the user in the state
        setIsEditDialogOpen(false);
      } catch (error) {
        console.error("Error updating user:", error);
      }
    };
    
    
    const handleDeleteUser = async (id: string) => {
      if (!onDelete) return;
    
      try {
        const response = await fetch(`http://localhost:3000/api/users/users/${id}`, {
          method: "DELETE",
        });
    
        if (response.ok) {
          onDelete(id); // Handle removing the user from the state
        } else {
          console.error("Failed to delete user");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    };
    
    const [userss, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch users data from API when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        console.log(data); 
        setUsers(data); 
      } catch (error) {
        setError(error.message); 
      } finally {
        setLoading(false);
      }
    };
    

    fetchUsers();
  }, []);
  console.log(userss);
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{t("usersList")}</h2>
          {onAdd && (
            <Button onClick={handleOpenAddDialog}>
              <Plus className="mr-2 h-4 w-4" />
              {t("addUser")}
            </Button>
          )}
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("email")}</TableHead>
                <TableHead>{t("role")}</TableHead>
                <TableHead>{t("studentId")}</TableHead>
                <TableHead>{t("createdAt")}</TableHead>
                {(onUpdate || onDelete) && (
                  <TableHead className="text-right">{t("actions")}</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {userss.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <div className="flex items-center cursor-pointer">
                          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center mr-2">
                            <UserIcon className="h-4 w-4" />
                          </div>
                          {user.name}
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="flex justify-between space-x-4">
                          <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                            <UserIcon className="h-6 w-6" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold">{user.name}</h4>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <div className="flex items-center pt-1">
                              <Badge variant={user.role === 'admin' ? 'default' : 'outline'}>
                                {user.role === 'admin' ? t("user.admin") : t("user.student")}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'admin' ? 'default' : 'outline'}>
                      {user.role === 'admin' ? t("user.admin") : t("user.student")}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.studentId || "-"}</TableCell>
                  <TableCell>{user.createdAt}</TableCell>
                  {(onUpdate || onDelete) && (
                    <TableCell className="text-right space-x-2">
                      {onUpdate && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleOpenEditDialog(user)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">{t("common.edit")}</span>
                        </Button>
                      )}
                      {onDelete && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                          <span className="sr-only">{t("common.delete")}</span>
                        </Button>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Add User Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{t("admin.addUser")}</DialogTitle>
              <DialogDescription>{t("admin.addUserDesc")}</DialogDescription>
            </DialogHeader>
            
            <Form {...addForm}>
              <form onSubmit={addForm.handleSubmit(handleAddUser)} className="space-y-4">
                <FormField
                  control={addForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("user.name")}</FormLabel>
                      <FormControl>
                        <Input {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("user.email")}</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          {...field} 
                          required 
                          placeholder="user@example.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("user.password")}</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          {...field} 
                          required 
                          placeholder="********"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addForm.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("user.role")}</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("admin.selectRole")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="student">{t("user.student")}</SelectItem>
                          <SelectItem value="admin">{t("user.admin")}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addForm.control}
                  name="studentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("user.studentId")}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        {t("admin.studentIdDesc")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    {t("common.cancel")}
                  </Button>
                  <Button type="submit">
                    {t("common.save")}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        
        {/* Edit User Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{t("admin.editUser")}</DialogTitle>
              <DialogDescription>{t("admin.editUserDesc")}</DialogDescription>
            </DialogHeader>
            
            <Form {...editForm}>
              <form onSubmit={editForm.handleSubmit(handleUpdateUser)} className="space-y-4">
                <FormField
                  control={editForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("user.name")}</FormLabel>
                      <FormControl>
                        <Input {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={editForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("user.email")}</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          {...field} 
                          required 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={editForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("user.password")}</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          {...field} 
                          required 
                          placeholder="********"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={editForm.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("user.role")}</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("admin.selectRole")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="student">{t("user.student")}</SelectItem>
                          <SelectItem value="admin">{t("user.admin")}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={editForm.control}
                  name="studentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("user.studentId")}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        {t("admin.studentIdDesc")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsEditDialogOpen(false)}
                  >
                    {t("common.cancel")}
                  </Button>
                  <Button type="submit">
                    {t("common.save")}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
