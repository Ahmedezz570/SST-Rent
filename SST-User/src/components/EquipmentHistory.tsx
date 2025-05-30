import React, { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { History } from "lucide-react";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface EquipmentHistory {
  _id: string;
  timestamp: string;
  action: string;
  notes?: string;
  admin ?: User; // admin who performed the action
  user: User; // populated user object
}

interface EquipmentHistoryProps {
  toolId: string;
}

export default function EquipmentHistoryComponent({ toolId }: EquipmentHistoryProps) {
  const { t, language } = useLanguage();
  const [history, setHistory] = useState<EquipmentHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHistory() {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/api/history/${toolId}/history`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data: EquipmentHistory[] = await res.json();
        setHistory(data);
      } catch (err) {
        setError(err.message || "An error occurred while fetching history.");
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, [toolId]);

  const getActionBadgeColor = (action: string) => {
    switch(action) {
      case 'pending':
        return 'bg-blue-500';
      case 'returned':
        return 'bg-green-500';
      case 'Maintenance':
        return 'bg-orange-500';
      case 'created':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getActionTranslation = (action: string) => {
    if (action === "rented") return t("equipment.rented");
    if (action === "returned") return t("equipment.returned");
    if (action === "maintenance") return t("equipment.maintenance");
    if (action === "created") return t("equipment.created");
    return action;
  };

  if (loading) {
    return <p className="text-center py-4">{t("loading") || "جاري التحميل..."}</p>;
  }

  if (error) {
    return <p className="text-center py-4 text-red-600">{error}</p>;
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <History className="h-5 w-5" />
          {t("history")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {history.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("date")}</TableHead>
                <TableHead>{t("action")}</TableHead>
                <TableHead>{t("user")}</TableHead>
                <TableHead>{t("admin")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
                    {new Date(item.date).toLocaleDateString(
                      language === 'ar' ? 'ar-EG' : 'en-US'
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={getActionBadgeColor(item.action)}>
                      {getActionTranslation(item.action)}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.user?.name || t("common.unknownUser")}</TableCell>
                  <TableCell>{item.admin?.name || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center text-muted-foreground py-4">
            {t("equipment.noHistory")}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
