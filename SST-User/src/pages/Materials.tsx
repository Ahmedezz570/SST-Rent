
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, FileText, Calendar, User } from "lucide-react";
import { materials } from "@/data/dummyData";
import Footer from "./Footer";
import { ArrowLeft} from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
export default function Materials() {
  const { user } = useAuth();
  const { t } = useLanguage();
   const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredMaterials = selectedType === "all" 
    ? materials 
    : materials.filter(material => material.type === selectedType);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getTypeBadgeColor = (type: string) => {
    switch(type) {
      case 'video':
        return 'bg-red-500 hover:bg-red-600';
      case 'document':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'tutorial':
        return 'bg-green-500 hover:bg-green-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <Layout 
      isAuthenticated={!!user}
      userRole={user?.role}
      userName={user?.name}
    >
         <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="mb-6"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
      <div className="container mx-auto px-4 py-8">
         
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Learning Materials</h1>
          <p className="text-muted-foreground text-lg">
            Access educational content, tutorials, and resources for aerospace engineering.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={selectedType === "all" ? "default" : "outline"}
            onClick={() => setSelectedType("all")}
          >
            All Materials
          </Button>
          {/* <Button
            variant={selectedType === "video" ? "default" : "outline"}
            onClick={() => setSelectedType("video")}
          >
            Videos
          </Button> */}
          {/* <Button
            variant={selectedType === "document" ? "default" : "outline"}
            onClick={() => setSelectedType("document")}
          >
            Documents
          </Button>
          <Button
            variant={selectedType === "tutorial" ? "default" : "outline"}
            onClick={() => setSelectedType("tutorial")}
          >
            Tutorials
          </Button> */}
        </div>

        {/* Materials Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredMaterials.map((material) => (
            <Card key={material.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
              {material.type === 'video' && (
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  {material.youtubeUrl ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeVideoId(material.youtubeUrl)}`}
                      title={material.title}
                      className="w-full h-full"
                      frameBorder="0"
                      allowFullScreen
                    />
                  ) : material.videoFile ? (
                    <video
                      src={material.videoFile}
                      controls
                      className="w-full h-full object-cover"
                      poster={material.thumbnail}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <Play className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                  <Badge 
                    className={`absolute top-3 right-3 ${getTypeBadgeColor(material.type)} text-white border-0`}
                  >
                    {material.type.charAt(0).toUpperCase() + material.type.slice(1)}
                  </Badge>
                </div>
              )}
              
              {material.type !== 'video' && (
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <FileText className="w-16 h-16 text-blue-400" />
                  <Badge 
                    className={`absolute top-3 right-3 ${getTypeBadgeColor(material.type)} text-white border-0`}
                  >
                    {material.type.charAt(0).toUpperCase() + material.type.slice(1)}
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-3">
                <CardTitle className="line-clamp-2 text-xl font-bold group-hover:text-primary transition-colors">
                  {material.title}
                </CardTitle>
                <CardDescription className="line-clamp-3 text-base">
                  {material.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4 text-primary" />
                    <span>{formatDate(material.createdAt)}</span>
                  </div>
                  {/* <div className="flex items-center text-sm text-muted-foreground">
                    <User className="mr-2 h-4 w-4 text-primary" />
                    <span>{material.author}</span>
                  </div> */}
                </div>

                <div className="mt-6 pt-4 border-t">
                  {material.fileUrl && (
                    <Button asChild className="w-full">
                      <a href={material.fileUrl} target="_blank" rel="noopener noreferrer">
                        {material.type === 'video' ? 'Watch Video' : 'Download Material'}
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMaterials.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">No Materials Found</h3>
            <p className="text-gray-600 dark:text-gray-400">No materials match the selected filter.</p>
          </div>
        )}
      </div>
      
      {/* <Footer /> */}
    </Layout>
  );
}