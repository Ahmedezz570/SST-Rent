
import LabLocationMap from "@/components/LabLocationMap";

export default function LabLocationSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
              📍 Find Us
            </div>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
              Visit Our Lab
            </h2>
            <p className="max-w-3xl text-lg text-muted-foreground leading-relaxed">
              Located at the heart of Cairo University's Faculty of Engineering, our aerospace lab provides state-of-the-art equipment and facilities for research and education.
            </p>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
           <LabLocationMap />
        </div>
      </div>
    </section>
  );
}
