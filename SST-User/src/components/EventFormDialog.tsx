
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Event } from "@/data/dummyData";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Upload, X, Image } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type EventFormData = {
  title: string;
  description: string;
  date: string;
  location: string;
  type: 'competition' | 'update' | 'workshop' | 'announcement';
  imageUrl: string;
  photos: string[];
};

interface EventFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event?: Event | null;
  onSubmit: (data: EventFormData) => void;
}

export default function EventFormDialog({
  open,
  onOpenChange,
  event,
  onSubmit,
}: EventFormDialogProps) {
  const { t } = useLanguage();
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [mainPhoto, setMainPhoto] = useState<string>("/placeholder.svg");
  console.log("EventFormDialog rendered with event:", event);
  const form = useForm<EventFormData>({
    defaultValues: {
      title: "",
      description: "",
      date: "",
      location: "",
      type: "announcement",
      imageUrl: "/placeholder.svg",
      photos: [],
    },
  });
  
  useEffect(() => {
    if (event && open) {
      form.reset({
        title: event.title,
        description: event.description,
        date: event.date,
        location: event.location,
        type: event.type,
        imageUrl: event.imageUrl,
        photos: (event as any).photos || [],
      });
      setSelectedPhotos((event as any).photos || []);
      setMainPhoto(event.imageUrl);
    } else {
      form.reset({
        title: "",
        description: "",
        date: "",
        location: "",
        type: "announcement",
        imageUrl: "/placeholder.svg",
        photos: [],
      });
      setSelectedPhotos([]);
      setMainPhoto("/placeholder.svg");
    }
  }, [event, form, open]);

  const uploadToCloudinary = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "SSTRent");

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/dlgzjfjlb/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.secure_url;
  } catch (err) {
    console.error("Cloudinary upload error", err);
    return null;
  }
};
const handleMainPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const url = await uploadToCloudinary(file);
    if (url) {
      setMainPhoto(url);
      form.setValue("imageUrl", url);
    }
  }
};


 const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = Array.from(e.target.files || []);
  const uploadedUrls: string[] = [];

  for (const file of files) {
    const url = await uploadToCloudinary(file);
    if (url) uploadedUrls.push(url);
  }

  const updatedPhotos = [...selectedPhotos, ...uploadedUrls];
  setSelectedPhotos(updatedPhotos);
  form.setValue("photos", updatedPhotos);
};


  const removePhoto = (index: number) => {
    const newPhotos = selectedPhotos.filter((_, i) => i !== index);
    setSelectedPhotos(newPhotos);
    form.setValue("photos", newPhotos);
  };

const handleSubmit = async (values: EventFormData) => {
  const eventData = {
    ...values,
    imageUrl: mainPhoto,
    photos: selectedPhotos,
  };

  try {
    const res = await fetch("http://localhost:3000/api/events/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error adding event:", errorData);
      return;
    }

    const result = await res.json();
    console.log("Event added:", result);

    // Reset form and UI
    onOpenChange(false);
    form.reset();
    setSelectedPhotos([]);
    setMainPhoto("/placeholder.svg");

  } catch (error) {
    console.error("Submit error:", error);
  }
};


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {event ? "Edit Event" : "Add New Event"}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event title" {...field} />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter event description"
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="competition">Competition</SelectItem>
                        <SelectItem value="update">Lab Update</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="announcement">Announcement</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-4">
              <FormLabel>Main Event Photo</FormLabel>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <Image className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label htmlFor="main-photo-upload" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        Upload main photo from your device
                      </span>
                      <input
                        id="main-photo-upload"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleMainPhotoUpload}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
              
              {mainPhoto !== "/placeholder.svg" && (
                <div className="mt-4">
                  <img
                    src={mainPhoto}
                    alt="Main event photo"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <FormLabel>Additional Event Photos</FormLabel>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        Upload additional photos from your device
                      </span>
                      <input
                        id="photo-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        className="sr-only"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    PNG, JPG, GIF up to 10MB each
                  </p>
                </div>
              </div>
              
              {selectedPhotos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedPhotos.map((photo, index) => (
                    <Card key={index} className="relative">
                      <CardContent className="p-2">
                        <img
                          src={photo}
                          alt={`Event photo ${index + 1}`}
                          className="w-full h-24 object-cover rounded"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1 h-6 w-6 p-0"
                          onClick={() => removePhoto(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {event ? "Update Event" : "Add Event"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
