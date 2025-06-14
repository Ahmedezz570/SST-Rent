
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail, User, Users, Building } from "lucide-react";

export default function ManagementSection() {
  const departmentInfo = {
    name: "Space System Technology Laboratory",
    university: "Cairo University",
    department: "Aerospace Engineering Faculty",
    established: "2020",
    linkedinUrl: "https://linkedin.com/company/sst-lab-cairo-university"
  };

  const admins = [
    {
      id: "1",
      name: "Dr. Ayman",
      title: "Lab Supervisor",
      department: "Aerospace Engineering",
      email: "ahmed.hassan@cu.edu.eg",
      linkedinUrl: "https://linkedin.com/in/ahmed-hassan-aerospace",
      avatar: "/images/avatars/ahmed.jpg"
    },
    // {
    //   id: "2", 
    //   name: "Prof. Sarah Ahmed",
    //   title: "Research Coordinator",
    //   department: "Mechanical Engineering",
    //   email: "sarah.ahmed@cu.edu.eg",
    //   linkedinUrl: "https://linkedin.com/in/sarah-ahmed-research",
    //   avatar: "/images/avatars/sarah.jpg"
    // },
    {
      id: "3",
      name: "Dr. Diaa",
      title: "Lab Supervisor",
      department: "Electrical Engineering", 
      email: "mohamed.ali@cu.edu.eg",
      linkedinUrl: "https://linkedin.com/in/mohamed-ali-tech",
      avatar: "/images/avatars/mohamed.jpg"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4 md:px-6">
        {/* <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter mb-4">
            Department Management
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Meet our dedicated team of researchers and administrators who make the SST Lab a premier aerospace engineering research facility.
          </p>
        </div> */}

        {/* Department Info Card */}
        {/* <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              {departmentInfo.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">University</p>
                <p className="font-medium">{departmentInfo.university}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Faculty</p>
                <p className="font-medium">{departmentInfo.department}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Established</p>
                <p className="font-medium">{departmentInfo.established}</p>
              </div>
              <div className="text-center">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-blue-500 text-blue-500 hover:bg-blue-50"
                  onClick={() => window.open(departmentInfo.linkedinUrl, '_blank')}
                >
                  <Linkedin className="h-4 w-4 mr-1" />
                  Follow Lab
                </Button>
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* Admins Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Users className="h-6 w-6" />
            Lab Administration Team
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols- lg:grid-cols-3 gap-6">
            {admins.map((admin) => (
              <Card 
  key={admin.id} 
  className="w-500px] h-[400px] hover:shadow-lg transition-shadow"
>

                <CardHeader className="text-center">
                  <Avatar className="h-40 w-40 mx-auto mb-4">
                    <AvatarImage src={admin.avatar} alt={admin.name} />
                    {/* <AvatarFallback className="text-lg">
                      {admin.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback> */}
                    <img src="https://picsum.photos/400/300" alt="Random" />

                  </Avatar>
                  <CardTitle className="flex items-center justify-center gap-2 text-center space-y-3">{admin.name}</CardTitle>
                  {/* <Badge variant="secondary" className="mx-auto text-center space-y-3">
                    {admin.title}
                  </Badge> */}
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    {/* <User className="h-4 w-4" /> */}
                    <span>{admin.title}</span>
                  </div>
{/*                   
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{admin.email}</span>
                  </div> */}
                  
                  <div className="flex gap-2 justify-center pt-2">
                    {/* <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(`mailto:${admin.email}`)}
                    >
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button> */}
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-blue-500 text-blue-500 hover:bg-blue-50"
                      onClick={() => window.open(admin.linkedinUrl, '_blank')}
                    >
                      <Linkedin className="h-4 w-4 mr-1" />
                      LinkedIn
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
