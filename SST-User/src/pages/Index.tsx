
import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Package, BookOpen, Shield , Calendar , MapPin , Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { events } from "@/data/dummyData";
import { Badge } from "@/components/ui/badge";
import About from "./About";
import Footer from "./Footer";
export default function Index() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [allEvents, setAllEvents] = useState([]);
   useEffect(() => {
        const fetchRecentEvents = async () => {
          try {
            const res = await fetch("http://localhost:3000/api/events/"); 
            const data = await res.json();
            setAllEvents(data);
            console.log("Fetched events:", data);
          } catch (err) {
            console.error(" ", err);
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
// const latestEvents = [...allEvents].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);

  const handleEventClick = (eventId: string) => {
    navigate(`/events/${eventId}`); 
  };
  return (
    <Layout >
      {/* Hero Section */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {t("app.title")}  
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Access and manage SST Lab equipments rentals for project and research at Aerospace department
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                {/* <Button 
                  onClick={() => navigate("/register")} 
                  size="lg"
                >
                  {t("auth.register")}
                </Button> */}
                <Button 
                  onClick={() => navigate("/login")} 
                  variant="outline" 
                  size="lg"
                >
                  {t("auth.login")}
                </Button>
                <Button 
                  onClick={() => navigate("/how-to-use")} 
                  variant="outline" 
                  size="lg"
                >
                  <Info className="mr-2 h-4 w-4" />
                  How to Use Our Platform
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-[4/3] rounded-lg overflow-hidden bg-muted animate-float">
                {/* <svg
                  className="w-full h-full"
                  viewBox="0 0 400 300"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M200 50L250 150L300 100L350 200H50L100 150L150 250L200 50Z"
                    fill="currentColor"
                    className="text-primary/20"
                  />
                  <path
                    d="M200 80L240 160L280 120L320 200H80L120 160L160 240L200 80Z"
                    fill="currentColor"
                    className="text-primary/40"
                  />
                  <path
                    d="M210 20L310 220H110L210 20Z"
                    fill="currentColor"
                    className="text-primary/60"
                  />
                </svg> */}
                <img src="/LOGOO.png" alt="Hero" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
       <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center mb-16">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
                ✨ Latest Events
              </div>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                Stay Updated
              </h2>
              <p className="max-w-3xl text-lg text-muted-foreground leading-relaxed">
                Discover upcoming competitions, workshops, and lab updates. Join our community and never miss an important event.
              </p>
            </div>
          </div>
          
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {[...allEvents].slice(-6).reverse().map((event) => (
              <Card 
                key={event.id} 
                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:scale-[1.02] hover:-translate-y-1"
                onClick={() => handleEventClick(event._id)}
              >
                <div className="relative h-564 overflow-hidden">
                  <img
                    src={event.imageUrl || event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <Badge 
                    className={`absolute top-4 right-4 ${getEventTypeBadgeColor(event.type)} text-white border-0 shadow-lg transition-all duration-300`}
                  >
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </Badge>
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="line-clamp-2 text-xl font-bold group-hover:text-primary transition-colors duration-300">
                    {event.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3 text-base leading-relaxed">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      <Calendar className="mr-3 h-4 w-4 text-primary" />
                      <span className="font-medium">{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      <MapPin className="mr-3 h-4 w-4 text-primary" />
                      <span className="font-medium">{event.location}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary">Learn More</span>
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {allEvents.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">No Events Yet</h3>
              <p className="text-gray-600 dark:text-gray-400">Check back soon for upcoming events and announcements.</p>
            </div>
          )}
        </div>
      </section>
      {/* Features Section */}
     
     <About />
     {/* <Footer /> */}
    </Layout>
  );
}
