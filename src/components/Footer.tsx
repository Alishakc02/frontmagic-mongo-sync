import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-accent" />
              <span className="font-display font-bold text-lg">CrimeWatch</span>
            </div>
            <p className="text-sm text-primary-foreground/70">
              Empowering communities and law enforcement to work together for a safer society.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
              <Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link>
              <Link to="/about" className="hover:text-primary-foreground transition-colors">About System</Link>
              <Link to="/analytics" className="hover:text-primary-foreground transition-colors">Statistics</Link>
              <Link to="/contact" className="hover:text-primary-foreground transition-colors">Contact</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3">Legal</h4>
            <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
              <span className="cursor-pointer hover:text-primary-foreground transition-colors">Privacy Policy</span>
              <span className="cursor-pointer hover:text-primary-foreground transition-colors">Terms of Service</span>
              <span className="cursor-pointer hover:text-primary-foreground transition-colors">Data Protection</span>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3">Emergency</h4>
            <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
              <span>Police: 100</span>
              <span>Ambulance: 102</span>
              <span>Fire: 101</span>
              <span>Women Helpline: 1091</span>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} CrimeWatch. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
