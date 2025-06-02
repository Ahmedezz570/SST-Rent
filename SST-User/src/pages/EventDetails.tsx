import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ArrowLeft, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { events } from "@/data/dummyData";
export default function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    const fetchRecentEvents = async () => {
      try {
        const res = await fetch("https://core-production-71d5.up.railway.app/api/events");
        const data = await res.json();
        setAllEvents(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecentEvents();
  }, []);

  const event = events.find(event => event._id === id);

  if (!event) {
    return (
      <Layout
        isAuthenticated={!!user}
        userRole={user?.role}
        userName={user?.name}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const getEventTypeBadgeColor = (type: string) => {
    switch (type) {
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
      day: 'numeric',
      weekday: 'long'
    });
  };

  return (
    <Layout
      isAuthenticated={!!user}
      userRole={user?.role}
      userName={user?.name}
    >
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

      
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">

         
          <div className="flex-1">
            <Card className="overflow-hidden">
              <div className="h-66 bg-gray-200 relative">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <Badge
                  className={`absolute top-4 right-4 ${getEventTypeBadgeColor(event.type)}`}
                >
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </Badge>
              </div>

              <CardHeader>
                <CardTitle className="text-3xl">{event.title}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center text-lg">
                      <Calendar className="mr-3 h-5 w-5 text-primary" />
                      <span>{formatDate(event.date)}</span>
                    </div>

                    <div className="flex items-center text-lg">
                      <MapPin className="mr-3 h-5 w-5 text-primary" />
                      <span>{event.location}</span>
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground">
                      <User className="mr-2 h-4 w-4" />
                      <span>Created on {new Date(event.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Event Type</h3>
                    <Badge
                      className={`${getEventTypeBadgeColor(event.type)} text-lg px-4 py-2`}
                    >
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Description</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {event.description}
                  </p>
                </div>
              </CardContent>
            </Card>

         
            {event.type === 'competition' && (
              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg mt-6 px-4">
                <h3 className="text-xl font-semibold mb-2 text-purple-700 dark:text-purple-300">
                  Competition Details
                </h3>
                <p className="text-purple-600 dark:text-purple-400">
                  This is a competitive event. Make sure to register and prepare accordingly.
                </p>
              </div>
            )}

            {event.type === 'workshop' && (
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mt-6 px-4">
                <h3 className="text-xl font-semibold mb-2 text-green-700 dark:text-green-300">
                  Workshop Information
                </h3>
                <p className="text-green-600 dark:text-green-400">
                  This is a hands-on workshop. Limited seats available - register early!
                </p>
              </div>
            )}
          </div>

         
          {event.photos && event.photos.length > 0 && (
  <div className="w-full lg:w-96">
    <h3 className="text-xl font-semibold mb-4">Event Photos</h3>
    <div className="grid grid-cols-2 gap-4">
      {event.photos.map((photo, index) => (
        <div
          key={index}
          className="aspect-[8/9] overflow-hidden rounded-lg bg-transparent"
        >
         <img
  src={photo}
  alt={`Event photo ${index + 1}`}
  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300 cursor-pointer"
  onClick={() => window.open(photo, '_blank')}
/>

        </div>
      ))}
    </div>
  </div>
)}

        </div>
      </div>
    </Layout>
  );
}
