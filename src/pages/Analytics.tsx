import { useState } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const crimeTypeData = [
  { name: "Theft", count: 320 }, { name: "Fraud", count: 210 }, { name: "Assault", count: 180 },
  { name: "Cybercrime", count: 150 }, { name: "Vandalism", count: 90 }, { name: "Drug Offense", count: 75 }, { name: "Robbery", count: 60 },
];

const trendData = [
  { month: "Jan", cases: 120 }, { month: "Feb", cases: 145 }, { month: "Mar", cases: 130 },
  { month: "Apr", cases: 160 }, { month: "May", cases: 140 }, { month: "Jun", cases: 175 },
  { month: "Jul", cases: 155 }, { month: "Aug", cases: 190 }, { month: "Sep", cases: 170 },
  { month: "Oct", cases: 185 }, { month: "Nov", cases: 160 }, { month: "Dec", cases: 200 },
];

const statusData = [
  { name: "Resolved", value: 58, color: "hsl(152, 56%, 42%)" },
  { name: "Under Investigation", value: 27, color: "hsl(207, 90%, 54%)" },
  { name: "Pending", value: 15, color: "hsl(38, 92%, 50%)" },
];

const allCrimes = [
  { id: "CR-2025-001", type: "Theft", status: "Resolved", date: "2025-01-05", location: "Kathmandu", investigator: "Inv. Sharma", suspect: "Unknown", priority: "Medium" },
  { id: "CR-2025-002", type: "Fraud", status: "Under Investigation", date: "2025-01-10", location: "Pokhara", investigator: "Inv. Thapa", suspect: "Ram K.", priority: "High" },
  { id: "CR-2025-003", type: "Assault", status: "Resolved", date: "2025-01-15", location: "Lalitpur", investigator: "Inv. Gurung", suspect: "Hari B.", priority: "High" },
  { id: "CR-2025-004", type: "Cybercrime", status: "Pending", date: "2025-01-20", location: "Bhaktapur", investigator: "Unassigned", suspect: "Unknown", priority: "Medium" },
  { id: "CR-2025-005", type: "Robbery", status: "Under Investigation", date: "2025-02-01", location: "Kathmandu", investigator: "Inv. Sharma", suspect: "Shyam G.", priority: "High" },
  { id: "CR-2025-006", type: "Vandalism", status: "Resolved", date: "2025-02-05", location: "Biratnagar", investigator: "Inv. Thapa", suspect: "Unknown", priority: "Low" },
];

const statusColors: Record<string, string> = {
  Pending: "bg-warning/10 text-warning border-warning/20",
  "Under Investigation": "bg-info/10 text-info border-info/20",
  Resolved: "bg-success/10 text-success border-success/20",
};

const priorityColors: Record<string, string> = {
  High: "bg-accent/10 text-accent border-accent/20",
  Medium: "bg-warning/10 text-warning border-warning/20",
  Low: "bg-muted text-muted-foreground border-border",
};

const Analytics = () => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredCrimes = allCrimes.filter((c) => {
    const matchSearch = !search || c.id.toLowerCase().includes(search.toLowerCase()) || c.suspect.toLowerCase().includes(search.toLowerCase()) || c.location.toLowerCase().includes(search.toLowerCase());
    const matchType = !filterType || c.type === filterType;
    const matchStatus = !filterStatus || c.status === filterStatus;
    const matchPriority = !filterPriority || c.priority === filterPriority;
    return matchSearch && matchType && matchStatus && matchPriority;
  });

  const clearFilters = () => { setSearch(""); setFilterType(""); setFilterStatus(""); setFilterPriority(""); };
  const hasActiveFilters = search || filterType || filterStatus || filterPriority;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-display font-bold mb-8 text-foreground">Crime Analytics & Filtering</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            <div className="bg-card rounded-lg p-5 card-shadow lg:col-span-2">
              <h3 className="font-display font-semibold mb-4 text-foreground">Crime Trend Over Time</h3>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 88%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                  <Tooltip />
                  <Line type="monotone" dataKey="cases" stroke="hsl(355, 72%, 56%)" strokeWidth={2} dot={{ fill: "hsl(355, 72%, 56%)" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-card rounded-lg p-5 card-shadow">
              <h3 className="font-display font-semibold mb-4 text-foreground">Case Status</h3>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={statusData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                    {statusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card rounded-lg p-5 card-shadow mb-10">
            <h3 className="font-display font-semibold mb-4 text-foreground">Crime Type Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={crimeTypeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 88%)" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(220, 70%, 15%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card rounded-lg card-shadow">
            <div className="p-5 border-b border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="font-display font-semibold text-foreground">Crime Records</h2>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search ID, suspect, location..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}><Filter className="h-4 w-4" /></Button>
                {hasActiveFilters && <Button variant="ghost" size="sm" onClick={clearFilters}><X className="h-4 w-4 mr-1" /> Clear</Button>}
              </div>
            </div>
            {showFilters && (
              <div className="p-5 border-b border-border bg-muted/30 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs">Crime Type</Label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger><SelectValue placeholder="All types" /></SelectTrigger>
                    <SelectContent>{["Theft", "Fraud", "Assault", "Cybercrime", "Robbery", "Vandalism"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Status</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger><SelectValue placeholder="All statuses" /></SelectTrigger>
                    <SelectContent>{["Pending", "Under Investigation", "Resolved"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Priority</Label>
                  <Select value={filterPriority} onValueChange={setFilterPriority}>
                    <SelectTrigger><SelectValue placeholder="All priorities" /></SelectTrigger>
                    <SelectContent>{["High", "Medium", "Low"].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border">
                  {["Case ID", "Type", "Status", "Priority", "Date", "Location", "Investigator", "Suspect"].map(h => <th key={h} className="text-left p-4 font-medium text-muted-foreground whitespace-nowrap">{h}</th>)}
                </tr></thead>
                <tbody>
                  {filteredCrimes.map(c => (
                    <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="p-4 font-medium text-foreground">{c.id}</td>
                      <td className="p-4 text-muted-foreground">{c.type}</td>
                      <td className="p-4"><Badge variant="outline" className={statusColors[c.status]}>{c.status}</Badge></td>
                      <td className="p-4"><Badge variant="outline" className={priorityColors[c.priority]}>{c.priority}</Badge></td>
                      <td className="p-4 text-muted-foreground">{c.date}</td>
                      <td className="p-4 text-muted-foreground">{c.location}</td>
                      <td className="p-4 text-muted-foreground">{c.investigator}</td>
                      <td className="p-4 text-muted-foreground">{c.suspect}</td>
                    </tr>
                  ))}
                  {filteredCrimes.length === 0 && <tr><td colSpan={8} className="p-8 text-center text-muted-foreground">No records match your filters</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Analytics;
