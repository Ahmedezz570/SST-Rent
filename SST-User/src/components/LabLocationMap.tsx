
import { MapPin, ExternalLink, Building2, Phone, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LabLocationMap = () => {
  // Cairo University Faculty of Engineering coordinates
  const labLocation = {
    lat: 30.0254,
    lng: 31.2085,
    name: 'Aerospace Engineering Lab',
    address: 'Faculty of Engineering, Cairo University',
    city: 'Giza Governorate, Egypt',
    phone: '+20 2 3567 4321',
    hours: 'Sunday - Thursday: 8:00 AM - 4:00 PM'
  };

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${labLocation.lat},${labLocation.lng}&zoom=16`;
    window.open(url, '_blank');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Lab Location
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Interactive Map Display */}
          <div 
            className="relative w-full h-64 rounded-lg overflow-hidden bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-emerald-900 dark:to-blue-900 border border-border cursor-pointer hover:shadow-lg transition-all duration-300 group"
            onClick={openInGoogleMaps}
          >
            {/* Map Grid Background */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" className="text-muted-foreground" />
              </svg>
            </div>

            {/* Location Marker */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-primary/20 rounded-full animate-pulse" />
              </div>
            </div>

            {/* Roads/Paths */}
            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 300">
              <path d="M0 150 Q100 120 200 150 T400 150" stroke="currentColor" strokeWidth="3" fill="none" className="text-muted-foreground" />
              <path d="M200 0 Q180 100 200 150 Q220 200 200 300" stroke="currentColor" strokeWidth="3" fill="none" className="text-muted-foreground" />
            </svg>

            {/* Click to open indicator */}
            <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ExternalLink className="h-4 w-4 text-primary" />
            </div>

            {/* Location label */}
            <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
              <p className="text-sm font-medium text-foreground">Cairo University</p>
              <p className="text-xs text-muted-foreground">Faculty of Engineering</p>
            </div>
          </div>

          {/* Location Details */}
          <div className="space-y-4">
            <div className="grid gap-3">
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">{labLocation.name}</p>
                  <p className="text-sm text-muted-foreground">{labLocation.address}</p>
                  <p className="text-sm text-muted-foreground">{labLocation.city}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{labLocation.phone}</p>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{labLocation.hours}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LabLocationMap;
