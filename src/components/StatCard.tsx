import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  variant?: "default" | "alert" | "success" | "warning";
}

const variantStyles = {
  default: "border-border",
  alert: "border-accent/30 bg-accent/5",
  success: "border-success/30 bg-success/5",
  warning: "border-warning/30 bg-warning/5",
};

const iconVariantStyles = {
  default: "text-primary bg-muted",
  alert: "text-accent bg-accent/10",
  success: "text-success bg-success/10",
  warning: "text-warning bg-warning/10",
};

const StatCard = ({ icon: Icon, value, label, variant = "default" }: StatCardProps) => {
  return (
    <div className={`bg-card rounded-lg border p-5 card-shadow hover:card-shadow-hover transition-all duration-300 animate-count-up ${variantStyles[variant]}`}>
      <div className="flex items-center gap-4">
        <div className={`rounded-lg p-3 ${iconVariantStyles[variant]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-2xl font-display font-bold text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
