import { useState } from "react";
import { LayoutDashboard, FileText, Bell, User, PlusCircle } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { label: "Dashboard", href: "/citizen", icon: LayoutDashboard },
  { label: "Report Crime", href: "/citizen/report", icon: PlusCircle },
  { label: "My Reports", href: "/citizen/reports", icon: FileText },
  { label: "Notifications", href: "/citizen/notifications", icon: Bell },
  { label: "Profile", href: "/citizen/profile", icon: User },
];

const statusColors: Record<string, string> = {
  Pending: "bg-warning/10 text-warning border-warning/20",
  Approved: "bg-info/10 text-info border-info/20",
  "Under Investigation": "bg-info/10 text-info border-info/20",
  Resolved: "bg-success/10 text-success border-success/20",
  Rejected: "bg-accent/10 text-accent border-accent/20",
};

const crimeTypes = ["Theft", "Fraud", "Assault", "Vandalism", "Cybercrime", "Drug Offense", "Robbery", "Other"];

const initialReports = [
  { id: "1", crime_id: "CR-2025-001", crime_type: "Theft", location: "Kathmandu", status: "Pending", description: "Wallet stolen at bus stop", created_at: "2025-01-15T10:00:00Z", updated_at: "2025-01-15T10:00:00Z" },
  { id: "2", crime_id: "CR-2025-002", crime_type: "Fraud", location: "Pokhara", status: "Under Investigation", description: "Online shopping fraud", created_at: "2025-01-20T14:00:00Z", updated_at: "2025-01-22T09:00:00Z" },
  { id: "3", crime_id: "CR-2025-003", crime_type: "Vandalism", location: "Lalitpur", status: "Resolved", description: "Car window smashed", created_at: "2025-02-01T08:00:00Z", updated_at: "2025-02-10T16:00:00Z" },
];

const CitizenDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { toast } = useToast();
  const { user, profile, updateProfile } = useAuth();

  const [reports, setReports] = useState(initialReports);
  const [crimeType, setCrimeType] = useState("");
  const [crimeLocation, setCrimeLocation] = useState("");
  const [crimeDate, setCrimeDate] = useState("");
  const [crimeDescription, setCrimeDescription] = useState("");
  const [suspectName, setSuspectName] = useState("");
  const [suspectDescription, setSuspectDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [profileName, setProfileName] = useState(profile?.full_name || "");
  const [profileEmail, setProfileEmail] = useState(profile?.email || "");
  const [profilePhone, setProfilePhone] = useState(profile?.phone || "");
  const [profileAddress, setProfileAddress] = useState(profile?.address || "");

  if (!user) { navigate("/login"); return null; }

  const getView = () => {
    if (currentPath === "/citizen/report") return "report";
    if (currentPath === "/citizen/reports") return "reports";
    if (currentPath === "/citizen/notifications") return "notifications";
    if (currentPath === "/citizen/profile") return "profile";
    return "dashboard";
  };
  const view = getView();

  const resetForm = () => { setCrimeType(""); setCrimeLocation(""); setCrimeDate(""); setCrimeDescription(""); setSuspectName(""); setSuspectDescription(""); };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!crimeType) { toast({ title: "Validation Error", description: "Please select a crime type.", variant: "destructive" }); return; }
    if (!crimeDescription.trim()) { toast({ title: "Validation Error", description: "Please provide a description.", variant: "destructive" }); return; }
    setSubmitting(true);
    const newReport = {
      id: String(reports.length + 1),
      crime_id: `CR-2025-${String(reports.length + 1).padStart(3, "0")}`,
      crime_type: crimeType,
      location: crimeLocation || "Not specified",
      status: "Pending",
      description: crimeDescription,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setReports([newReport, ...reports]);
    resetForm();
    toast({ title: "Report Submitted", description: "Your crime report has been submitted and is pending review." });
    setSubmitting(false);
    navigate("/citizen");
  };

  const handleSaveProfile = () => {
    if (!profileName.trim() || !profileEmail.trim()) { toast({ title: "Validation Error", description: "Name and email are required.", variant: "destructive" }); return; }
    updateProfile({ full_name: profileName, email: profileEmail, phone: profilePhone, address: profileAddress });
    toast({ title: "Profile Updated", description: "Your profile has been saved." });
  };

  const totalReports = reports.length;
  const underInvestigation = reports.filter(r => r.status === "Under Investigation" || r.status === "Approved").length;
  const resolved = reports.filter(r => r.status === "Resolved").length;

  const ReportsTable = ({ data }: { data: typeof reports }) => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead><tr className="border-b border-border">
          <th className="text-left p-4 font-medium text-muted-foreground">Case ID</th>
          <th className="text-left p-4 font-medium text-muted-foreground">Type</th>
          <th className="text-left p-4 font-medium text-muted-foreground">Location</th>
          <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
          <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
        </tr></thead>
        <tbody>
          {data.map((r) => (
            <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
              <td className="p-4 font-medium text-foreground">{r.crime_id}</td>
              <td className="p-4 text-muted-foreground">{r.crime_type}</td>
              <td className="p-4 text-muted-foreground">{r.location}</td>
              <td className="p-4 text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</td>
              <td className="p-4"><Badge variant="outline" className={statusColors[r.status] || ""}>{r.status}</Badge></td>
            </tr>
          ))}
          {data.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No reports found</td></tr>}
        </tbody>
      </table>
    </div>
  );

  if (view === "report") {
    return (
      <DashboardLayout role="citizen" navItems={navItems}>
        <h1 className="text-2xl font-display font-bold mb-6 text-foreground">Report a Crime</h1>
        <form onSubmit={handleSubmitReport} className="max-w-2xl space-y-6">
          <div className="bg-card rounded-lg p-6 card-shadow space-y-4">
            <h3 className="font-display font-semibold text-foreground">Basic Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Crime Type *</Label>
                <Select value={crimeType} onValueChange={setCrimeType}>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>{crimeTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Date & Time</Label><Input type="datetime-local" value={crimeDate} onChange={e => setCrimeDate(e.target.value)} /></div>
            </div>
            <div className="space-y-2"><Label>Location</Label><Input placeholder="Enter location" value={crimeLocation} onChange={e => setCrimeLocation(e.target.value)} /></div>
            <div className="space-y-2"><Label>Description *</Label><Textarea placeholder="Describe the incident..." rows={4} value={crimeDescription} onChange={e => setCrimeDescription(e.target.value)} /></div>
          </div>
          <div className="bg-card rounded-lg p-6 card-shadow space-y-4">
            <h3 className="font-display font-semibold text-foreground">Suspect Information (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Suspect Name</Label><Input placeholder="If known" value={suspectName} onChange={e => setSuspectName(e.target.value)} /></div>
              <div className="space-y-2"><Label>Description</Label><Input placeholder="Physical features, clothing..." value={suspectDescription} onChange={e => setSuspectDescription(e.target.value)} /></div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/80" disabled={submitting}>{submitting ? "Submitting..." : "Submit Report"}</Button>
            <Button type="button" variant="outline" onClick={() => navigate("/citizen")}>Cancel</Button>
          </div>
        </form>
      </DashboardLayout>
    );
  }

  if (view === "reports") {
    return (
      <DashboardLayout role="citizen" navItems={navItems}>
        <h1 className="text-2xl font-display font-bold mb-6 text-foreground">My Reports</h1>
        <div className="bg-card rounded-lg card-shadow"><ReportsTable data={reports} /></div>
      </DashboardLayout>
    );
  }

  if (view === "notifications") {
    return (
      <DashboardLayout role="citizen" navItems={navItems}>
        <h1 className="text-2xl font-display font-bold mb-6 text-foreground">Notifications</h1>
        <div className="space-y-4">
          {reports.filter(r => r.status !== "Pending").map(r => (
            <div key={r.id} className={`bg-card rounded-lg p-5 card-shadow border-l-4 ${r.status === "Resolved" ? "border-success" : r.status === "Rejected" ? "border-accent" : "border-info"}`}>
              <p className="font-medium text-foreground">Case {r.crime_id} — {r.status}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {r.status === "Approved" ? "Your case has been approved and assigned." : r.status === "Resolved" ? "Your case has been resolved." : r.status === "Rejected" ? "Your report was rejected." : `Status: ${r.status}`}
              </p>
              <p className="text-xs text-muted-foreground mt-2">{new Date(r.updated_at).toLocaleString()}</p>
            </div>
          ))}
          {reports.filter(r => r.status !== "Pending").length === 0 && (
            <div className="bg-card rounded-lg p-8 card-shadow text-center text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-3 opacity-40" />
              <p>No notifications yet.</p>
            </div>
          )}
        </div>
      </DashboardLayout>
    );
  }

  if (view === "profile") {
    return (
      <DashboardLayout role="citizen" navItems={navItems}>
        <h1 className="text-2xl font-display font-bold mb-6 text-foreground">My Profile</h1>
        <div className="max-w-2xl bg-card rounded-lg p-6 card-shadow space-y-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
              <User className="h-8 w-8 text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-display font-semibold text-foreground">{profileName || "Your Name"}</h3>
              <p className="text-sm text-muted-foreground">Citizen • {profileAddress || "Nepal"}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Full Name *</Label><Input value={profileName} onChange={e => setProfileName(e.target.value)} /></div>
            <div className="space-y-2"><Label>Email *</Label><Input value={profileEmail} onChange={e => setProfileEmail(e.target.value)} /></div>
            <div className="space-y-2"><Label>Phone</Label><Input value={profilePhone} onChange={e => setProfilePhone(e.target.value)} /></div>
            <div className="space-y-2"><Label>Address</Label><Input value={profileAddress} onChange={e => setProfileAddress(e.target.value)} /></div>
          </div>
          <Button onClick={handleSaveProfile} className="bg-accent text-accent-foreground hover:bg-accent/80 mt-4">Save Changes</Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="citizen" navItems={navItems}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Citizen Dashboard</h1>
        <Link to="/citizen/report"><Button className="bg-accent text-accent-foreground hover:bg-accent/80"><PlusCircle className="mr-2 h-4 w-4" /> Report Crime</Button></Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <StatCard icon={FileText} value={String(totalReports)} label="Total Reports" />
        <StatCard icon={Bell} value={String(underInvestigation)} label="Under Investigation" variant="warning" />
        <StatCard icon={FileText} value={String(resolved)} label="Resolved" variant="success" />
      </div>
      <div className="bg-card rounded-lg card-shadow">
        <div className="p-5 border-b border-border"><h2 className="font-display font-semibold text-foreground">Recent Reports</h2></div>
        <ReportsTable data={reports.slice(0, 10)} />
      </div>
    </DashboardLayout>
  );
};

export default CitizenDashboard;
