
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Target, 
  Users, 
  Lightbulb, 
  ArrowRight, 
  UserPlus, 
  Search, 
  FileText, 
  CheckCircle,
  Package,
  BookOpen,
  Shield,
  Rocket,
  Satellite,
  Trophy,
  Wrench,
  Zap,
  Globe,
  Monitor,
  Cpu,  
  Camera,
  Navigation,
  ArrowLeft
} from "lucide-react";
import LabLocationSection from "@/sections/LabLocationSection";

export default function About() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const trainings = [
    {
      title: "Rovers Rumble Race (RRR)",
      description: "An in-house rover competition designed and organized by SST Lab for early-year students. It focuses on developing mechanical, electrical, and software integration skills through engaging challenges that simulate real-world rover applications.",
      icon: Package
    },
    {
      title: "Lean CubeSat",
      description: "This training focuses on the fundamentals of CubeSat technology and lean engineering principles. Students learn to design small, cost-effective satellites that perform valuable scientific and technological missions.",
      icon: Satellite
    },
    {
      title: "CanSat",
      description: "Students design, build, and launch miniature satellite models, gaining practical experience in satellite engineering. This program covers the entire lifecycle of a satellite mission, from initial design to post-launch analysis.",
      icon: Rocket
    }
  ];

  const competitions = [
    {
      title: "International Competition of the Military Technical College (ICMTC)",
      description: "ICMTC is a multidisciplinary engineering competition hosted in Egypt by the Military Technical College. It includes challenges in autonomous systems, drones, robotics, and smart technologies, fostering technical excellence and innovation among university teams worldwide."
    },
    {
      title: "Youth Leadership Forum (YLF)",
      description: "A national initiative that empowers students to engage in social innovation and leadership. Through team-based challenges, participants develop real-world problem-solving, communication, and planning skills."
    },
    {
      title: "AAKRUTI (Dassault Systèmes)",
      description: "Organized by Dassault Systèmes, AAKRUTI is a product design competition that invites students to solve real-world challenges through innovative design and simulation. It promotes creativity in fields like sustainability, healthcare, and smart infrastructure."
    },
    {
      title: "Mission Idea Contest (MIC)",
      description: "An international competition hosted by UNISEC where students propose mission concepts for micro/nano satellites or deep space applications—encouraging innovation in early-stage space systems design."
    },
    {
      title: "International Space Engineering Innovation Competition (ISEIC)",
      description: "A global platform where students propose advanced space engineering ideas aligned with current exploration trends. Projects may involve mission architecture, hardware subsystems, or full system designs."
    },
    {
      title: "A Rocket Launch for International Student Satellites (ARLISS)",
      description: "Held in Nevada's Black Rock Desert, USA, ARLISS challenges university teams to develop CanSats that are launched via high-power rockets. Teams test their satellite designs in real-world, open-air conditions."
    },
    {
      title: "Mars Rover Competition",
      description: "Teams design and build semi-autonomous planetary rovers to perform science and engineering tasks on simulated Martian terrain. Events often include URC, ERC, or IRC depending on regional participation."
    }
  ];

  const projects = [
    {
      title: "Aerial Airport Firefighting Quadcopter",
      description: "Students developed an autonomous drone system for airport emergency response, integrating thermal imaging, fire-extinguishing payloads, and wind-compensated navigation. Focus areas included embedded systems, robotics, and aviation safety.",
      icon: Camera
    },
    {
      title: "Airborne Ground System (VTOL Surveillance & Transport)",
      description: "A vertical takeoff/landing aircraft with toroidal propellers and dual surveillance/transport capabilities. Projects covered aerostructure optimization, PX4 flight control, and mission-specific payload integration.",
      icon: Navigation
    },
    {
      title: "3U CubeSat for Agricultural Monitoring",
      description: "A collaboration with EGSA to deploy IoT \"Internet of Things\" technologies, enabled satellite monitoring for farmland. Students worked on orbital data transmission, sensor networks, and predictive analytics for crop management.",
      icon: Satellite
    },
    {
      title: "Open-Source Satellite Tracker",
      description: "A ground station for LEO satellite communication (NOAA 18), emphasizing orbital mechanics, antenna tracking systems, and real-time data decoding.",
      icon: Monitor
    },
    {
      title: "Attitude Determination and Control System (ADCS)",
      description: "ADCS projects involve developing systems for the orientation control of satellites and spacecraft. Students gain experience in sensor integration, control algorithm development, and hardware implementation.",
      icon: Cpu
    },
    {
      title: "NOVA Exploration Rover",
      description: "A compact lunar rover prototype with terrain-adaptive mobility, LabView data acquisition, and SolidWorks-optimized mechanical systems for space exploration scenarios.",
      icon: Wrench
    }
  ];

  const additionalTrainings = [
    "1D Ball Balance",
    "Differential Wheel Robot", 
    "3D Robotic Arm",
    "Other in-house initiatives"
  ];

  const steps = [
    {
      icon: Users,
      title: "Log In",
      description: "Log in to your account as a student or admin to get started with the platform",
      color: "bg-blue-500"
    },
    {
      icon: Search,
      title: "Browse Equipment",
      description: "Explore our comprehensive catalog of aerospace engineering equipment with detailed specifications.",
      color: "bg-green-500"
    },
    {
      icon: FileText,
      title: "Make a Request",
      description: "Submit rental requests for the equipment you need for your projects or research.",
      color: "bg-purple-500"
    },
    {
      icon: CheckCircle,
      title: "Get Approved",
      description: "Wait for admin approval and receive your equipment for the specified duration.",
      color: "bg-orange-500"
    }
  ];

  return (
    // <Layout>
    <>
   {/* <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button> */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-6">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              About SST Lab
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
              Space System Technology Laboratory
            </h1>
            <p className="max-w-4xl mx-auto text-lg text-muted-foreground leading-relaxed">
              The Space System Technology Laboratory (SST Lab) is a student-based research facility within the Aerospace Engineering Department at Cairo University. We are a passionate community of undergraduate researchers and innovators dedicated to advancing aerospace systems through hands-on training, collaborative engineering, and competitive project development.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Who We Are
            </h2>

<div className="flex items-center justify-center w-full h-full">
<img
  src={"https://sstl.surge.sh/IMG_1482.JPG"}
  alt=""
  style={{ width: "700px", height: "500px" }}
  className="object-cover transition-transform duration-300 group-hover:scale-110"
/>

</div>





            <p className="max-w-4xl mx-auto text-lg text-muted-foreground leading-relaxed">
              At SST Lab, students engage in a wide range of technical domains—from space systems and robotics to drones, rovers, and satellite technology. Our members participate in practical trainings such as CanSat, Lean CubeSat, and other specialized programs to build a solid foundation in aerospace and embedded systems technologies.
            </p>
            <p className="max-w-4xl mx-auto text-lg text-muted-foreground leading-relaxed">
              Our trainings and competitions are designed to be inclusive, allowing most students—especially those in their early academic years—to participate, gain experience, and develop their skills through hands-on, project-based learning.
            </p>
          </div>

          {/* <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-6 text-center">Additional Training Programs</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {additionalTrainings.map((training, index) => (
                <Card key={index} className="border-0 shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <Zap className="h-4 w-4 text-primary" />
                      </div>
                      <p className="font-medium text-sm">{training}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div> */}
        </div>
      </section>

<LabLocationSection/>
     
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">
                  <Target className="h-8 w-8 text-blue-500" />
                </div>
                <CardTitle className="text-xl text-center">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Our mission is to create a vibrant community where students can explore their intellectual curiosity, develop practical skills, and collaborate with peers to solve real world challenges. We aim to inspire innovation, critical thinking, and a lifelong passion for learning by providing opportunities for hands-on experimentation, research, and project-based learning. By fostering a supportive and inclusive environment, we empower students to reach their full potential and become well-rounded individuals prepared for the demands of the modern workforce.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10">
                  <Lightbulb className="h-8 w-8 text-purple-500" />
                </div>
                <CardTitle className="text-xl text-center">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  We envision a future where our students are at the forefront of technological advancement, driving innovation and shaping the world around them. We strive to create a legacy of excellence, where our graduates are sought-after by top employers for their technical expertise, problem-solving skills, and entrepreneurial spirit. By fostering a culture of collaboration, creativity, and continuous improvement, we will equip our students with the tools and knowledge they need to succeed in their academic and professional endeavors.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

     
      <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-6 mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Training Programs
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Trainings & Competition Initiatives
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {trainings.map((training, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <training.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-center">{training.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    {training.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

    
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-6 mb-16">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500/10">
              <Trophy className="h-8 w-8 text-yellow-500" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Competitions
            </h2>
            <p className="max-w-4xl mx-auto text-lg text-muted-foreground">
              We proudly represent Cairo University in a variety of national and international competitions, where we share our projects, ideas, and solutions with a global audience:
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {competitions.map((competition, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-start space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/10 flex-shrink-0">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                    </div>
                    <CardTitle className="text-lg leading-tight">{competition.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {competition.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-6 mb-16">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
              <Wrench className="h-8 w-8 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Our Projects
            </h2>
            <p className="max-w-4xl mx-auto text-lg text-muted-foreground">
              Innovative projects that showcase our students' technical expertise and creativity:
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {projects.map((project, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-start space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 flex-shrink-0">
                      <project.icon className="h-5 w-5 text-green-500" />
                    </div>
                    <CardTitle className="text-lg leading-tight">{project.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

    
      {/* <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-6 mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Getting Started
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              How to Use Our Platform
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
              Follow these simple steps to get started with equipment rentals and make the most of our platform.
            </p>
          </div>

          <div className="grid gap-8 md:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center gap-8">
                <div className={`flex-shrink-0 w-20 h-20 rounded-full ${step.color} flex items-center justify-center order-1 md:order-${index % 2 === 0 ? '1' : '2'}`}>
                  <step.icon className="h-10 w-10 text-white" />
                </div>
                
                <div className={`flex-1 text-center md:text-left order-2 md:order-${index % 2 === 0 ? '2' : '1'}`}>
                  <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Step {index + 1}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                    {step.description}
                  </p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block order-3">
                    <ArrowRight className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div> 
      </section>*/}

     
     
      </>
    // </Layout>
  );
}