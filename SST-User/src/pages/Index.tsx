
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Package, BookOpen, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Index() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
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
                <Button 
                  onClick={() => navigate("/register")} 
                  size="lg"
                >
                  {t("auth.register")}
                </Button>
                <Button 
                  onClick={() => navigate("/login")} 
                  variant="outline" 
                  size="lg"
                >
                  {t("auth.login")}
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
      
      {/* Features Section */}
      <section className="py-12 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Everything You Need
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform provides all the tools necessary for efficient equipment management.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 lg:gap-12">
            <Card>
              <CardHeader className="pb-2">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Equipment Catalog</CardTitle>
                <CardDescription>
                  Browse and search the entire inventory of available aerospace equipment.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Real-time availability status</li>
                  <li>Detailed equipment specifications</li>
                  <li>Categorized browsing</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Easy Rental Process</CardTitle>
                <CardDescription>
                  Simple workflow for equipment rental requests and management.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>One-click rental requests</li>
                  <li>Request status tracking</li>
                  <li>Rental history management</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Admin Controls</CardTitle>
                <CardDescription>
                  Comprehensive tools for administrators to manage inventory.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Request approval workflow</li>
                  <li>Equipment status management</li>
                  <li>Usage analytics</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
