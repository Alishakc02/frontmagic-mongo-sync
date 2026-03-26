import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Search, Shield, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatCard from "@/components/StatCard";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }} />
        <div className="absolute inset-0 bg-hero-gradient opacity-80" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
            <Shield className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">Trusted by Law Enforcement</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-gradient-hero mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Report Crime. Track Justice.
            <br />
            Ensure Safety.
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-in text-primary-foreground/70" style={{ animationDelay: "0.2s" }}>
            A comprehensive crime detection and investigation management system connecting citizens, investigators, and administrators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/register">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-alert-light px-8 text-base">
                <FileText className="mr-2 h-5 w-5" />
                Report a Crime
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 text-base">
                <Search className="mr-2 h-5 w-5" />
                Track Your Case
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-10 text-foreground">Crime Statistics Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard icon={FileText} value="12,458" label="Total Cases" />
            <StatCard icon={Clock} value="3,241" label="Under Investigation" variant="warning" />
            <StatCard icon={CheckCircle} value="8,892" label="Cases Resolved" variant="success" />
            <StatCard icon={AlertTriangle} value="325" label="High Priority Alerts" variant="alert" />
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-4 text-foreground">How It Works</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">Three simple steps to report and track crime effectively</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Report", desc: "Citizens submit crime reports with evidence and suspect details through a secure form." },
              { step: "02", title: "Investigate", desc: "Admins verify reports, assign investigators, and track case progress in real-time." },
              { step: "03", title: "Resolve", desc: "Investigators update case status, upload evidence, and close cases upon resolution." },
            ].map((item) => (
              <div key={item.step} className="bg-card rounded-lg p-6 card-shadow hover:card-shadow-hover transition-all duration-300">
                <span className="text-4xl font-display font-bold text-accent/20">{item.step}</span>
                <h3 className="text-xl font-display font-semibold mt-2 mb-3 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
