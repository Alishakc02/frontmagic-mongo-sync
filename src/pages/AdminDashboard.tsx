import { useState } from "react";
import { LayoutDashboard, CheckCircle, FileText, Users, Shield, BarChart3, Settings, AlertTriangle, MessageSquare } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Verify Reports", href: "/admin/verify", icon: CheckCircle },
  { label: "All Crimes", href: "/admin/crimes", icon: FileText },
  { label: "Investigators", href: "/admin/investigators", icon: Users },
  { label: "Evidence Logs", href: "/admin/evidence", icon: Shield },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

const statusColors: Record<string, string> = {
  Pending: "bg-warning/10 text-warning border-warning/20",
  Approved: "bg-info/10 text-info border-info/20",
  Rejected: "bg-accent/10 text-accent border-accent/20",
  Resolved: "bg-success/10 text-success border-success/20",
  "Under Investigation": "bg-info/10 text-info border-info/20",
};

const priorityColors: Record<string, string> = {
  High: "bg-accent/10 text-accent border-accent/20",
  Medium: "bg-warning/10 text-warning border-warning/20",
  Low: "bg-muted text-muted-foreground border-border",
};

const mockReports = [
  { id: "1", crime_id: "CR-2025-001", crime_type: "Theft", location: "Kathmandu", status: "Pending", priority: "High", description: "Wallet stolen", created_at: "2025-01-15T10:00:00Z", assigned_investigator_id: null },
  { id: "2", crime_id: "CR-2025-002", crime_type: "Fraud", location: "Pokhara", status: "Under Investigation", priority: "Medium", description: "Online fraud", created_at: "2025-01-20T14:00:00Z", assigned_investigator_id: "inv-1" },
  { id: "3", crime_id: "CR-2025-003", crime_type: "Assault", location: "Lalitpur", status: "Resolved", priority: "High", description: "Physical assault", created_at: "2025-02-01T08:00:00Z", assigned_investigator_id: "inv-2" },
  { id: "4", crime_id: "CR-2025-004", crime_type: "Cybercrime", location: "Bhaktapur", status: "Pending", priority: "Medium", description: "Hacking attempt", created_at: "2025-02-05T12:00:00Z", assigned_investigator_id: null },
  { id: "5", crime_id: "CR-2025-005", crime_type: "Robbery", location: "Biratnagar", status: "Approved", priority: "High", description: "Armed robbery", created_at: "2025-02-10T16:00:00Z", assigned_investigator_id: null },
];

const mockInvestigators = [
  { id: "inv-1", user_id: "inv-1", full_name: "Inv. Sharma", email: "sharma@police.np", phone: "+977-9801111111", avatar_url: "" },
  { id: "inv-2", user_id: "inv-2", full_name: "Inv. Thapa", email: "thapa@police.np", phone: "+977-9802222222", avatar_url: "" },
  { id: "inv-3", user_id: "inv-3", full_name: "Inv. Gurung", email: "gurung@police.np", phone: "+977-9803333333", avatar_url: "" },
];

const mockEvidence = [
  { id: "ev-1", report_id: "1", file_name: "evidence_photo.jpg", file_type: "image/jpeg", created_at: "2025-01-16T10:00:00Z" },
  { id: "ev-2", report_id: "2", file_name: "transaction_log.pdf", file_type: "application/pdf", created_at: "2025-01-21T14:00:00Z" },
];

const mockMessages = [
  { id: "msg-1", subject: "Emergency Report", sender_name: "Ram K.", sender_email: "ram@mail.com", content: "I need help with my case urgently.", is_read: false, created_at: "2025-02-12T08:00:00Z" },
  { id: "msg-2", subject: "Case Follow-up", sender_name: "Sita D.", sender_email: "sita@mail.com", content: "When can I expect an update on my case?", is_read: true, created_at: "2025-02-10T14:00:00Z" },
];

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { toast } = useToast();
  const { user } = useAuth();

  const [reports, setReports] = useState(mockReports);
  const [messages, setMessages] = useState(mockMessages);
  const [filterStatus, setFilterStatus] = useState("");
  const [reportDeadline, setReportDeadline] = useState("72");

  if (!user) { navigate("/login"); return null; }

  const handleApprove = (reportId: string) => {
    setReports(reports.map(r => r.id === reportId ? { ...r, status: "Approved" } : r));
    toast({ title: "Report Approved", description: "Report status updated." });
  };

  const handleReject = (reportId: string) => {
    setReports(reports.map(r => r.id === reportId ? { ...r, status: "Rejected" } : r));
    toast({ title: "Report Rejected", description: "Report status updated." });
  };

  const handleAssign = (reportId: string, investigatorId: string) => {
    setReports(reports.map(r => r.id === reportId ? { ...r, assigned_investigator_id: investigatorId, status: "Under Investigation" } : r));
    toast({ title: "Investigator Assigned", description: "Case is now under investigation." });
  };

  const handleMarkRead = (msgId: string) => {
    setMessages(messages.map(m => m.id === msgId ? { ...m, is_read: true } : m));
  };

  const handleSaveSettings = () => {
    toast({ title: "Settings Saved", description: "System settings updated." });
  };

  const getView = () => {
    if (currentPath === "/admin/verify") return "verify";
    if (currentPath === "/admin/crimes") return "crimes";
    if (currentPath === "/admin/investigators") return "investigators";
    if (currentPath === "/admin/evidence") return "evidence";
    if (currentPath === "/admin/messages") return "messages";
    if (currentPath === "/admin/settings") return "settings";
    return "dashboard";
  };
  const view = getView();

  const pendingReports = reports.filter(r => r.status === "Pending");
  const filteredCrimes = filterStatus && filterStatus !== "all" ? reports.filter(r => r.status === filterStatus) : reports;
  const totalReports = reports.length;
  const resolvedReports = reports.filter(r => r.status === "Resolved").length;

  if (view === "verify") {
    return (
      <DashboardLayout role="admin" navItems={navItems}>
        <h1 className="text-2xl font-display font-bold mb-6 text-foreground">Verify Reports</h1>
        <div className="bg-card rounded-lg card-shadow">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h2 className="font-display font-semibold text-foreground">Pending Verification</h2>
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">{pendingReports.length} pending</Badge>
          </div>
          <div className="divide-y divide-border">
            {pendingReports.map(report => (
              <div key={report.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-muted/30 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-medium text-foreground">{report.crime_id}</span>
                    <Badge variant="outline" className={priorityColors[report.priority]}>{report.priority}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{report.crime_type} • {report.location} • {new Date(report.created_at).toLocaleDateString()}</p>
                  {report.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{report.description}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <Select onValueChange={(val) => handleAssign(report.id, val)}>
                    <SelectTrigger className="w-40"><SelectValue placeholder="Assign to..." /></SelectTrigger>
                    <SelectContent>{mockInvestigators.map(inv => <SelectItem key={inv.user_id} value={inv.user_id}>{inv.full_name}</SelectItem>)}</SelectContent>
                  </Select>
                  <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90" onClick={() => handleApprove(report.id)}>Approve</Button>
                  <Button size="sm" variant="outline" className="text-accent border-accent/30 hover:bg-accent/10" onClick={() => handleReject(report.id)}>Reject</Button>
                </div>
              </div>
            ))}
            {pendingReports.length === 0 && <p className="p-8 text-center text-muted-foreground">No pending reports</p>}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (view === "crimes") {
    return (
      <DashboardLayout role="admin" navItems={navItems}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-display font-bold text-foreground">All Crimes</h1>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48"><SelectValue placeholder="Filter by status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Under Investigation">Under Investigation</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="bg-card rounded-lg card-shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">
              {["Case ID", "Type", "Status", "Priority", "Location", "Date"].map(h => <th key={h} className="text-left p-4 font-medium text-muted-foreground">{h}</th>)}
            </tr></thead>
            <tbody>
              {filteredCrimes.map(c => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="p-4 font-medium text-foreground">{c.crime_id}</td>
                  <td className="p-4 text-muted-foreground">{c.crime_type}</td>
                  <td className="p-4"><Badge variant="outline" className={statusColors[c.status]}>{c.status}</Badge></td>
                  <td className="p-4"><Badge variant="outline" className={priorityColors[c.priority]}>{c.priority}</Badge></td>
                  <td className="p-4 text-muted-foreground">{c.location}</td>
                  <td className="p-4 text-muted-foreground">{new Date(c.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {filteredCrimes.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No records</td></tr>}
            </tbody>
          </table>
        </div>
      </DashboardLayout>
    );
  }

  if (view === "investigators") {
    return (
      <DashboardLayout role="admin" navItems={navItems}>
        <h1 className="text-2xl font-display font-bold mb-6 text-foreground">Investigators</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockInvestigators.map(inv => (
            <div key={inv.id} className="bg-card rounded-lg p-6 card-shadow text-center">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-foreground">{inv.full_name}</h3>
              <p className="text-sm text-muted-foreground">Investigator</p>
              <p className="text-xs text-muted-foreground mt-1">{inv.email}</p>
              {inv.phone && <p className="text-xs text-muted-foreground">{inv.phone}</p>}
            </div>
          ))}
        </div>
      </DashboardLayout>
    );
  }

  if (view === "evidence") {
    return (
      <DashboardLayout role="admin" navItems={navItems}>
        <h1 className="text-2xl font-display font-bold mb-6 text-foreground">Evidence Logs</h1>
        <div className="bg-card rounded-lg card-shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">
              {["ID", "Report", "File", "Type", "Date"].map(h => <th key={h} className="text-left p-4 font-medium text-muted-foreground">{h}</th>)}
            </tr></thead>
            <tbody>
              {mockEvidence.map(ev => (
                <tr key={ev.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="p-4 font-medium text-foreground">{ev.id}</td>
                  <td className="p-4 text-muted-foreground">{ev.report_id}</td>
                  <td className="p-4 text-muted-foreground">{ev.file_name}</td>
                  <td className="p-4"><Badge variant="outline">{ev.file_type || "File"}</Badge></td>
                  <td className="p-4 text-muted-foreground">{new Date(ev.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardLayout>
    );
  }

  if (view === "messages") {
    return (
      <DashboardLayout role="admin" navItems={navItems}>
        <h1 className="text-2xl font-display font-bold mb-6 text-foreground">Contact Messages</h1>
        <div className="space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`bg-card rounded-lg p-5 card-shadow border-l-4 ${msg.is_read ? "border-muted" : "border-accent"}`}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-medium text-foreground">{msg.subject}</h3>
                  <p className="text-xs text-muted-foreground">{msg.sender_name} • {msg.sender_email}</p>
                </div>
                <div className="flex items-center gap-2">
                  {!msg.is_read && <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">New</Badge>}
                  <span className="text-xs text-muted-foreground">{new Date(msg.created_at).toLocaleString()}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{msg.content}</p>
              {!msg.is_read && <Button size="sm" variant="ghost" className="mt-2" onClick={() => handleMarkRead(msg.id)}>Mark as Read</Button>}
            </div>
          ))}
        </div>
      </DashboardLayout>
    );
  }

  if (view === "settings") {
    return (
      <DashboardLayout role="admin" navItems={navItems}>
        <h1 className="text-2xl font-display font-bold mb-6 text-foreground">System Settings</h1>
        <div className="max-w-lg bg-card rounded-lg p-6 card-shadow space-y-4">
          <div className="space-y-2">
            <Label>Report Investigation Deadline (hours)</Label>
            <Input type="number" value={reportDeadline} onChange={e => setReportDeadline(e.target.value)} />
            <p className="text-xs text-muted-foreground">Maximum time for investigators to complete a report.</p>
          </div>
          <Button onClick={handleSaveSettings} className="bg-accent text-accent-foreground hover:bg-accent/80">Save Settings</Button>
        </div>
      </DashboardLayout>
    );
  }

  // Dashboard
  return (
    <DashboardLayout role="admin" navItems={navItems}>
      <h1 className="text-2xl font-display font-bold mb-6 text-foreground">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard icon={FileText} value={String(totalReports)} label="Total Reports" />
        <StatCard icon={AlertTriangle} value={String(pendingReports.length)} label="Pending Verification" variant="alert" />
        <StatCard icon={Users} value={String(mockInvestigators.length)} label="Investigators" variant="success" />
        <StatCard icon={CheckCircle} value={String(resolvedReports)} label="Resolved Cases" variant="success" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg card-shadow">
          <div className="p-5 border-b border-border"><h2 className="font-display font-semibold text-foreground">Recent Reports</h2></div>
          <div className="divide-y divide-border">
            {reports.slice(0, 5).map(r => (
              <div key={r.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                <div>
                  <p className="font-medium text-foreground text-sm">{r.crime_id}</p>
                  <p className="text-xs text-muted-foreground">{r.crime_type} • {r.location}</p>
                </div>
                <Badge variant="outline" className={statusColors[r.status]}>{r.status}</Badge>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card rounded-lg card-shadow">
          <div className="p-5 border-b border-border"><h2 className="font-display font-semibold text-foreground">Recent Messages</h2></div>
          <div className="divide-y divide-border">
            {messages.map(msg => (
              <div key={msg.id} className="p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground text-sm">{msg.subject}</p>
                  {!msg.is_read && <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20 text-xs">New</Badge>}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{msg.sender_name} • {new Date(msg.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
