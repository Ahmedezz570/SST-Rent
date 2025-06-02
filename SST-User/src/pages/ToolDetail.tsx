import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, MapPin, AlertTriangle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import RentalForm from "../components/RentalForm";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import EquipmentHistoryComponent from "@/components/EquipmentHistory";
const ToolDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  useEffect(() => {
    const fetchTool = async () => {
      try {
        const response = await fetch(`https://core-production-71d5.up.railway.app/api/tools/${id}`);
        if (!response.ok) {
          throw new Error("Tool not found");
        }
        const data = await response.json();
        setTool(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTool();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !tool) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4">Tool Not Found</h1>
        <p className="text-gray-500 mb-6">
          The tool you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/equipment"
          className="text-primary font-medium hover:underline flex items-center justify-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Catalog
        </Link>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-500";
      case "In Use":
        return "bg-blue-500";
      case "Maintenance":
        return "bg-orange-500";
      case "Calibration":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
     <Layout
          isAuthenticated={true}
          userRole={user?.role}
          userName={user?.name}
        >
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/equipment"
        className="inline-flex items-center text-gray-600 hover:text-primary mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Catalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="w-full md:w-1/3">
              <div className="relative bg-gray-200 aspect-square rounded-md overflow-hidden">
                <img
                  src={tool.imageUrl || "/placeholder.svg"}
                  alt={tool.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge className={`${getStatusColor(tool.status)} text-white`}>
                    {tool.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/3">
              <h1 className="text-3xl font-bold mb-2">{tool.name}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="bg-muted/50">
                  {tool.category}
                </Badge>
                <Badge variant="outline" className="bg-muted/50">
                  ID: {tool._id}
                </Badge>
              </div>
              <p className="text-gray-700 mb-6">{tool.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-gray-600">{tool.location}</p>
                  </div>
                </div>

                {tool.calibrationDate && (
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">Last Calibration</p>
                      <p className="text-sm text-gray-600">{tool.calibrationDate}</p>
                    </div>
                  </div>
                )}

                {tool.maintenanceDate && (
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">Last Maintenance</p>
                      <p className="text-sm text-gray-600">{tool.maintenanceDate}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Card>
            {/* <CardHeader>
              <CardTitle>Specifications</CardTitle>
            </CardHeader> */}
            {/* <CardContent>
              <ul className="space-y-2">
                {tool.specifications.map((spec, index) => (
                  <li
                    key={index}
                    className="flex items-center py-2 border-b border-gray-100 last:border-0"
                  >
                    <span className="text-gray-800">{spec}</span>
                  </li>
                ))}
              </ul>
             
            </CardContent> */}
            {user?.role === "admin" && (<EquipmentHistoryComponent toolId={id}/>)}
             
          </Card>
        </div>

        <div>
        { user?.role == "student" &&tool && <RentalForm tool={tool} />}

        </div>
      </div>
    </div>
    </Layout>
  );
};

export default ToolDetail;
