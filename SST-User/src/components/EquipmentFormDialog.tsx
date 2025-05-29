import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Equipment } from "@/data/dummyData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

type EquipmentFormValues = {
  name: string;
  description: string;
  category: string;
  status: 'Available' | 'In Use' | 'Maintenance';
  imageUrl: string;
  quantity: number;
};

interface EquipmentFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (equipment: Equipment) => void;
  title: string;
  description: string;
  equipment?: Equipment;
}

export default function EquipmentFormDialog({
  open,
  onOpenChange,
  onSubmit,
  title,
  description,
  equipment,
}: EquipmentFormDialogProps) {
  const { t } = useLanguage();
  
  const form = useForm<EquipmentFormValues>({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      status: "Available",
      imageUrl: "/placeholder.svg",
      quantity: 1,
    },
  });
  
  useEffect(() => {
    if (equipment) {
      form.reset({
        name: equipment.name,
        description: equipment.description,
        category: equipment.category,
        status: equipment.status,
        imageUrl: equipment.imageUrl,
        quantity: equipment.quantity,
      });
    } else {
      form.reset({
        name: "",
        description: "",
        category: "",
        status: "Available",
        imageUrl: "/placeholder.svg",
        quantity: 1,
      });
    }
  }, [equipment, form, open]);
  
  const handleSubmit = (values: EquipmentFormValues) => {
    if (equipment) {
      onSubmit({ 
        ...equipment, 
        name: values.name,
        description: values.description,
        category: values.category,
        status: values.status,
        imageUrl: values.imageUrl,
        quantity: values.quantity
      });
    } else {
      // For new equipment, create empty history array
      onSubmit({
        ...values,
        id: `${Date.now()}`, // Generate a unique ID
        history: [] // Initialize with empty history array
      } as Equipment);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("equipment.name")}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t("equipment.namePlaceholder")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("equipment.description")}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t("equipment.descriptionPlaceholder")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("equipment.category")}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t("equipment.categoryPlaceholder")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("equipment.quantity")}</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1"
                      {...field}
                      onChange={e => field.onChange(Math.max(1, parseInt(e.target.value) || 1))}
                      placeholder={t("equipment.quantityPlaceholder")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("equipment.status")}</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    >
                      <option value="available">{t("equipment.available")}</option>
                      <option value="rented">{t("equipment.rented")}</option>
                      <option value="maintenance">{t("equipment.maintenance")}</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="submit">{equipment ? t("common.update") : t("common.add")}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
