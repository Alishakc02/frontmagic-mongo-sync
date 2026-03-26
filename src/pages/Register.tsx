import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accepted) { toast({ title: "Error", description: "Please accept the privacy policy", variant: "destructive" }); return; }
    if (!firstName || !email || !password) { toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" }); return; }
    if (password !== confirmPassword) { toast({ title: "Error", description: "Passwords do not match", variant: "destructive" }); return; }
    if (password.length < 6) { toast({ title: "Error", description: "Password must be at least 6 characters", variant: "destructive" }); return; }
    setLoading(true);
    try {
      await signUp(email, password, { full_name: `${firstName} ${lastName}`.trim(), phone, address });
      toast({ title: "Account Created", description: "You can now log in." });
      navigate("/login");
    } catch {
      toast({ title: "Registration Failed", description: "Something went wrong", variant: "destructive" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <Shield className="h-8 w-8 text-accent" />
            <span className="font-display font-bold text-2xl text-primary-foreground">CrimeWatch</span>
          </Link>
          <p className="text-primary-foreground/60 text-sm">Create your citizen account</p>
        </div>

        <form onSubmit={handleRegister} className="bg-card rounded-xl p-8 card-shadow space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>First Name *</Label><Input placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} /></div>
            <div className="space-y-2"><Label>Last Name</Label><Input placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} /></div>
          </div>
          <div className="space-y-2"><Label>Email *</Label><Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div className="space-y-2"><Label>Phone</Label><Input type="tel" placeholder="+977-9800000000" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
          <div className="space-y-2"><Label>Address</Label><Input placeholder="City, District" value={address} onChange={(e) => setAddress(e.target.value)} /></div>
          <div className="space-y-2">
            <Label>Password *</Label>
            <div className="relative">
              <Input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div className="space-y-2"><Label>Confirm Password *</Label><Input type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></div>
          <div className="flex items-center gap-2">
            <Checkbox id="privacy" checked={accepted} onCheckedChange={(v) => setAccepted(v === true)} />
            <label htmlFor="privacy" className="text-sm text-muted-foreground">I accept the <span className="text-accent cursor-pointer">Privacy Policy</span></label>
          </div>
          <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-alert-light" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-accent hover:underline font-medium">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
