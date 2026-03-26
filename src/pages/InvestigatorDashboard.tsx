import { useState } from "react";
import { LayoutDashboard, FileText, CheckCircle, Upload, StickyNote, User } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { label: "Assigned Cases", href: "/investigator", icon: LayoutDashboard },
  { label: "Ongoing", href: "/investigator/ongoing", icon: FileText },
  { label: "Completed", href: "/investigator/completed", icon: CheckCircle },
  { label: "Evidence Upload", href: "/investigator/evidence", icon: Upload },
  { label: "Notes", href: "/investigator/notes", icon: StickyNote },
  { label: "Profile", href: "/investigator/profile", icon: User },
];

const statusColors: Record<string, string> = {
  "Under Investigation": "bg-warning/10 text-warning border-warning/20",
  Approved: "bg-info/10 text-info border-info/20",
  Resolved: "bg-success/10 text-success border-success/20",
};

const mockCases = [
  { id: "1", crime_id: "CR-2025-002", crime_type: "Fraud", location: "Pokhara", status: "Under Investigation", priority: "Medium", description: "Online fraud case", created_at: "2025-01-20T14:00:00Z" },
  { id: "2", crime_id: "CR-2025-005", crime_type: "Robbery", location: "Kathmandu", status: "Approved", priority: "High", description: "Armed robbery at market", created_at: "2025-02-10T16:00:00Z" },
  { id: "3", crime_id: "CR-2025-003", crime_type: "Assault", location: "Lalitpur", status: "Resolved", priority: "High", description: "Physical assault case", created_at: "2025-02-01T08:00:00Z" },
];

const InvestigatorDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { toast } = useToast();
  const { user, profile, updateProfile } = useAuth();

  const [cases, setCases] = useState(mockCases);
  const [notes, setNotes] = useState<{ id: string; content: string; created_at: string }[]>([]);
  const [noteText, setNoteText] = useState("");
  const [noteCase, setNoteCase] = useState("");
  const [evidenceCase, setEvidenceCase] = useState("");
  const [evidenceDesc, setEvidenceDesc] = useState("");

  const [profileName, setProfileName] = useState(profile?.full_name || "");
  const [profileEmail, setProfileEmail] = useState(profile?.email || "");
  const [profilePhone, setProfilePhone] = useState(profile?.phone || "");
  const [profileAddress, setProfileAddress] = useState(profile?.address || "");

  if (!user) { navigate("/login"); return null; }

  const getView = () => {
    if (currentPath === "/investigator/ongoing") return "ongoing";
    if (currentPath === "/investigator/completed") return "completed";
    if (currentPath === "/investigator/evidence") return "evidence";
    if (currentPath === "/investigator/notes") return "notes";
    if (currentPath === "/investigator/profile") return "profile";
    return "dashboard";
  };
  const view = getView();

  const ongoingCases = cases.filter(c => c.status !== "Resolved");
  const completedCases = cases.filter(c => c.status === "Resolved");

  const handleUpdateStatus = (caseId: string, newStatus: string) => {
    setCases(cases.map(c => c.id === caseId ? { ...c, status: newStatus } : c));
    toast({ title: "Status Updated", description: `Case status changed to ${newStatus}.` });
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteCase || !noteText.trim()) { toast({ title: "Validation Error", description: "Select a case and enter note.", variant: "destructive" }); return; }
    setNotes([{ id: String(notes.length + 1), content: noteText, created_at: new Date().toISOString() }, ...notes]);
    setNoteText(""); setNoteCase("");
    toast({ title: "Note Added", description: "Note saved successfully." });
  };

  const handleEvidenceUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evidenceCase) { toast({ title: "Validation Error", description: "Select a case.", variant: "destructive" }); return; }
    toast({ title: "Evidence Uploaded", description: "Evidence saved and linked to case." });
    setEvidenceCase(""); setEvidenceDesc("");
  };

  const handleSaveProfile = () => {
    if (!profileName.trim()) return;
    updateProfile({ full_name: profileName, email: profileEmail, phone: profilePhone, address: profileAddress });
    toast({ title: "Profile Updated", description: "Profile saved." });
  };

  const CaseCard = ({ c, showStatusUpdate }: { c: typeof mockCases[0]; showStatusUpdate?: boolean }) => (
    <div className="bg-card rounded-lg card-shadow p-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="font-display font-semibold text-foreground">{c.crime_id}</h3>
            <Badge variant="outline" className={statusColors[c.status] || "bg-muted text-muted-foreground"}>{c.status}</Badge>
            <Badge variant="outline" className={c.priority === "High" ? "bg-accent/10 text-accent border-accent/20" : "bg-muted text-muted-foreground"}>{c.priority}</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{c.crime_type} • {c.location} • {new Date(c.created_at).toLocaleDateString()}</p>
          {c.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{c.description}</p>}
        </div>
        {showStatusUpdate && c.status !== "Resolved" && (
          <Select onValueChange={(val) => handleUpdateStatus(c.id, val)}>
            <SelectTrigger className="w-48"><SelectValue placeholder="Update Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Under Investigation">Under Investigation</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );

  if (view === "ongoing") {
    return (
      <DashboardLayout role="investigator" navItems={navItems}>
        <h1 className="text-2xl font-display font-bold mb-6 text-foreground">Ongoing Cases</h1>
        <div className="space-y-4">
          {ongoingCases.length > 0 ? ongoingCases.map(c => <CaseCard key={c.id} c={c} showStatusUpdate />) : <p className="text-center text-muted-foreground p-8">No ongoing cases.</p>}
        </div>
      </DashboardLayout>
    );
  }

  if (view === "completed") {
    return (
      <DashboardLayout role="investigator" navItems={navItems}>
        <h1 className="text-2xl font-display font-bold mb-6 text-foreground">Completed Cases</h1>
        <div className="space-y-4">
          {completedCases.length > 0 ? completedCases.map(c => <CaseCard key={c.id} c={c} />) : <p className="text-center text-muted-foreground p-8">No completed cases yet.</p>}
        </div>
      </DashboardLayout>
    );
  }

  if (view === "evidence") {
    return (
      <DashboardLayout role="investigator" navItems={navItems}>
        <h1 className="text-2xl font-display font-bold mb-6 text-foreground">Evidence Upload</h1>
        <form onSubmit={handleEvidenceUpload} className="max-w-2xl bg-card rounded-lg p-6 card-shadow space-y-4 mb-8">
          <h3 className="font-display font-semibold text-foreground">Upload New Evidence</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Case *</Label>
              <Select value={evidenceCase} onValueChange={setEvidenceCase}>
                <SelectTrigger><SelectValue placeholder="Select case" /></SelectTrigger>
                <SelectContent>{cases.map(c => <SelectItem key={c.id} value={c.id}>{c.crime_id}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>File *</Label><Input type="file" accept="image/*,video/*,.pdf,.doc,.docx" /></div>
          </div>
          <div className="space-y-2"><Label>Description</Label><Input value={evidenceDesc} onChange={e => setEvidenceDesc(e.target.value)} placeholder="Brief description of evidence" /></div>
          <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/80">Upload Evidence</Button>
        </form>
      </DashboardLayout>
    );
  }

  if (view === "notes") {
    return (
      <DashboardLayout role="investigator" navItems={navItems}>
        <h1 className="text-2xl font-display font-bold mb-6 text-foreground">Investigation Notes</h1>
        <form onSubmit={handleAddNote} className="max-w-2xl bg-card rounded-lg p-6 card-shadow space-y-4 mb-8">
          <h3 className="font-display font-semibold text-foreground">Add New Note</h3>
          <div className="space-y-2">
            <Label>Case *</Label>
            <Select value={noteCase} onValueChange={setNoteCase}>
              <SelectTrigger><SelectValue placeholder="Select case" /></SelectTrigger>
              <SelectContent>{cases.map(c => <SelectItem key={c.id} value={c.id}>{c.crime_id}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2"><Label>Note *</Label><Textarea placeholder="Write your investigation note..." rows={3} value={noteText} onChange={e => setNoteText(e.target.value)} /></div>
          <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/80">Add Note</Button>
        </form>
        <div className="space-y-4">
          {notes.map(n => (
            <div key={n.id} className="bg-card rounded-lg p-5 card-shadow border-l-4 border-info">
              <span className="text-xs text-muted-foreground">{new Date(n.created_at).toLocaleString()}</span>
              <p className="text-sm text-foreground mt-1">{n.content}</p>
            </div>
          ))}
          {notes.length === 0 && <p className="text-center text-muted-foreground p-8">No notes yet.</p>}
        </div>
      </DashboardLayout>
    );
  }

  if (view === "profile") {
    return (
      <DashboardLayout role="investigator" navItems={navItems}>
        <h1 className="text-2xl font-display font-bold mb-6 text-foreground">My Profile</h1>
        <div className="max-w-2xl bg-card rounded-lg p-6 card-shadow space-y-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center"><User className="h-8 w-8 text-accent" /></div>
            <div>
              <h3 className="text-lg font-display font-semibold text-foreground">{profileName || "Your Name"}</h3>
              <p className="text-sm text-muted-foreground">Investigator</p>
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
    <DashboardLayout role="investigator" navItems={navItems}>
      <h1 className="text-2xl font-display font-bold mb-6 text-foreground">Investigator Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <StatCard icon={FileText} value={String(cases.length)} label="Assigned Cases" />
        <StatCard icon={FileText} value={String(ongoingCases.length)} label="Ongoing" variant="warning" />
        <StatCard icon={CheckCircle} value={String(completedCases.length)} label="Completed" variant="success" />
      </div>
      <div className="space-y-4">
        {cases.map(c => <CaseCard key={c.id} c={c} showStatusUpdate />)}
        {cases.length === 0 && <p className="text-center text-muted-foreground p-8">No cases assigned yet.</p>}
      </div>
    </DashboardLayout>
  );
};

export default InvestigatorDashboard;
