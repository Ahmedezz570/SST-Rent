
import { useState , useEffect} from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { events, Event } from "@/data/dummyData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Calendar, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import EventFormDialog from "./EventFormDialog";

type EventFormData = {
  title: string;
  description: string;
  date: string;
  location: string;
  type: 'competition' | 'update' | 'workshop' | 'announcement';
  imageUrl: string;
};

export default function AdminEvents() {
  const { t } = useLanguage();
  const [eventsList, setEventsList] = useState<Event[]>(events);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const [allEvents, setAllEvents] = useState([]);
  
    useEffect(() => {
      const fetchRecentEvents = async () => {
        try {
          const res = await fetch("http://localhost:3000/api/events/");
          const data = await res.json();
          setAllEvents(data);
        } catch (err) {
          console.error(err);
        }
      };
  
      fetchRecentEvents();
    }, []);
  const getEventTypeBadgeColor = (type: string) => {
    switch(type) {
      case 'competition':
        return 'bg-purple-500';
      case 'update':
        return 'bg-blue-500';
      case 'workshop':
        return 'bg-green-500';
      case 'announcement':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setDialogOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setDialogOpen(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEventsList(prev => prev.filter(event => event.id !== eventId));
    
    // Remove from global events array
    const index = events.findIndex(event => event.id === eventId);
    if (index > -1) {
      events.splice(index, 1);
    }
    
    toast({
      title: "Event Deleted",
      description: "The event has been successfully deleted.",
    });
  };

  const handleFormSubmit = (data: EventFormData) => {
    if (selectedEvent) {
      // Update existing event
      const updatedEvent = {
        ...selectedEvent,
        ...data,
      };
      
      setEventsList(prev => 
        prev.map(event => 
          event.id === selectedEvent.id ? updatedEvent : event
        )
      );
      
      // Update global events array
      const index = events.findIndex(event => event.id === selectedEvent.id);
      if (index > -1) {
        events[index] = updatedEvent;
      }
      
      toast({
        title: "Event Updated",
        description: "The event has been successfully updated.",
      });
    } else {
      // Add new event
      const newEvent: Event = {
        id: `${eventsList.length + 1}`,
        ...data,
        createdAt: new Date().toISOString().split('T')[0],
      };
      
      setEventsList(prev => [...prev, newEvent]);
      events.push(newEvent);
      
      toast({
        title: "Event Added",
        description: "The new event has been successfully added.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Events</h2>
        <Button onClick={handleAddEvent}>
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {allEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <div className="h-66 bg-gray-200 relative">
              <img
                src={event.mainImage}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <Badge 
                className={`absolute top-2 right-2 ${getEventTypeBadgeColor(event.type)}`}
              >
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </Badge>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg line-clamp-2">{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {event.description}
              </p>
              <div className="space-y-1 mb-4">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="mr-1 h-3 w-3" />
                  {formatDate(event.date)}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <MapPin className="mr-1 h-3 w-3" />
                  {event.location}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditEvent(event)}
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <EventFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        event={selectedEvent}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
