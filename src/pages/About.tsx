import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Eye, Users, Lock, BarChart3, Globe } from "lucide-react";

const features = [
  { icon: Shield, title: "Secure Crime Reporting", desc: "Citizens can report crimes securely and anonymously through an encrypted platform, ensuring privacy and protection of sensitive information." },
  { icon: Eye, title: "Real-Time Case Tracking", desc: "Track the progress of filed reports in real-time with status updates from investigation initiation to case resolution." },
  { icon: Users, title: "Role-Based Access Control", desc: "Separate dashboards for Citizens, Investigators, and Administrators ensure that each user accesses only the information relevant to their role." },
  { icon: Lock, title: "Evidence Management", desc: "Tamper-proof evidence uploads with hash-based verification, audit trails, and secure storage for images, videos, and documents." },
  { icon: BarChart3, title: "Crime Analytics & Insights", desc: "Comprehensive analytics dashboard with crime distribution charts, trend analysis, and investigator performance metrics to aid decision-making." },
  { icon: Globe, title: "Accessible Across Nepal", desc: "Designed for all 7 provinces of Nepal, enabling citizens from Kathmandu to remote districts to report and track crime digitally." },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">About CrimeWatch Nepal</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-primary-foreground/70">
            A comprehensive Online Crime Reporting and Investigation Management System built to modernize law enforcement and empower citizens across Nepal.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6 text-center">Our Mission</h2>
          <div className="bg-card rounded-lg p-8 card-shadow text-muted-foreground leading-relaxed space-y-4">
            <p>CrimeWatch Nepal aims to bridge the gap between citizens and law enforcement by providing a digital platform where crimes can be reported, tracked, and investigated efficiently.</p>
            <p>Developed as a modern web-based solution, CrimeWatch supports Nepal Police, the National Investigation Department (NID), and local law enforcement agencies in streamlining case management.</p>
            <p>Whether you are a citizen in Kathmandu reporting a cybercrime, or a police inspector in Jumla tracking a theft case, CrimeWatch provides the tools you need — accessible from any device, anywhere in Nepal.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4 text-center">Key Features</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">Built with modern technology to serve Nepal's law enforcement needs</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-card rounded-lg p-6 card-shadow hover:card-shadow-hover transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4"><f.icon className="h-6 w-6 text-accent" /></div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8 text-center">Benefits for Nepal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Faster Response Times", desc: "Digital reports reach investigators instantly, eliminating delays caused by manual FIR processing." },
              { title: "Reduced Corruption", desc: "Transparent case tracking and audit logs reduce opportunities for mishandling or suppression of cases." },
              { title: "Data-Driven Policing", desc: "Analytics help identify crime hotspots and trends, enabling proactive resource deployment across districts." },
              { title: "Citizen Empowerment", desc: "Citizens can report crimes from home without visiting a police station, especially beneficial for women and marginalized communities." },
            ].map((b) => (
              <div key={b.title} className="bg-card rounded-lg p-6 card-shadow border-l-4 border-accent">
                <h3 className="font-display font-semibold text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
