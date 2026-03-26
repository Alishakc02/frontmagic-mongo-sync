import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const officers = [
  { name: "SP Rajesh Kumar Thapa", position: "Chief Investigator", department: "National Investigation Department", phone: "+977-01-4412345", email: "chief.investigator@crimewatch.gov.np", location: "NID Headquarters, Kathmandu", role: "Oversees all national-level criminal investigations.", initials: "RT" },
  { name: "DSP Sita Devi Sharma", position: "Deputy Superintendent of Police", department: "Metropolitan Crime Division", phone: "+977-01-4423456", email: "dsp.sharma@crimewatch.gov.np", location: "Metropolitan Police Office, Ranipokhari", role: "Manages metropolitan crime investigations.", initials: "SS" },
  { name: "Inspector Bikash Gurung", position: "Police Inspector", department: "District Police Office, Kaski", phone: "+977-061-520123", email: "inspector.gurung@crimewatch.gov.np", location: "DPO Kaski, Pokhara", role: "Handles district-level crime cases and evidence collection.", initials: "BG" },
  { name: "Er. Anish Adhikari", position: "System Administrator", department: "CrimeWatch IT Division", phone: "+977-01-4456789", email: "admin@crimewatch.gov.np", location: "IT Centre, Singh Durbar, Kathmandu", role: "Maintains the CrimeWatch platform and ensures data security.", initials: "AA" },
];

const Contact = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({ title: "Validation Error", description: "Name, email, and message are required.", variant: "destructive" });
      return;
    }
    toast({ title: "Message Sent!", description: "Thank you for contacting us. We'll respond within 24 hours." });
    setName(""); setEmail(""); setSubject(""); setMessage("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-primary-foreground/70">Reach out to our team for assistance, inquiries, or emergencies</p>
        </div>
      </section>

      <section className="py-6 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Shield className="h-5 w-5" />
          <span className="font-semibold">Emergency? Call Nepal Police:</span>
          <a href="tel:100" className="font-bold text-lg underline">100</a>
          <span className="hidden sm:inline">|</span>
          <span>Women Helpline: <a href="tel:1145" className="font-bold underline">1145</a></span>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4 text-center">Our Officers & Team</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-xl mx-auto">Key personnel managing the CrimeWatch system across Nepal</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {officers.map((o) => (
              <div key={o.name} className="bg-card rounded-lg p-6 card-shadow hover:card-shadow-hover transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <span className="text-primary-foreground font-display font-bold text-lg">{o.initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-foreground text-lg">{o.name}</h3>
                    <p className="text-sm font-medium text-accent">{o.position}</p>
                    <p className="text-sm text-muted-foreground">{o.department}</p>
                    <p className="text-xs text-muted-foreground mt-2 italic">{o.role}</p>
                    <div className="space-y-1.5 text-sm text-muted-foreground mt-3">
                      <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-accent" /><span>{o.phone}</span></div>
                      <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-accent" /><span className="truncate">{o.email}</span></div>
                      <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-accent" /><span>{o.location}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8 text-center">Send Us a Message</h2>
          <form className="bg-card rounded-lg p-8 card-shadow space-y-4" onSubmit={handleSendMessage}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Full Name *</Label><Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} /></div>
              <div className="space-y-2"><Label>Email *</Label><Input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            </div>
            <div className="space-y-2"><Label>Subject</Label><Input placeholder="How can we help?" value={subject} onChange={(e) => setSubject(e.target.value)} /></div>
            <div className="space-y-2"><Label>Message *</Label><Textarea placeholder="Write your message here..." rows={5} value={message} onChange={(e) => setMessage(e.target.value)} /></div>
            <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/80 w-full">Send Message</Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
