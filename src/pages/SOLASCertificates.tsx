import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShieldCheck, AlertCircle } from "lucide-react";

const certificates = [
  {
    name: "Safety Construction Certificate",
    validity: "5 Years · Annual intermediate survey",
    authority: "Flag State / Authorised Class",
    focus: ["Watertight compartments", "Makine emniyeti", "Elektrik sistemleri"],
  },
  {
    name: "Safety Equipment Certificate",
    validity: "5 Years · Intermediate survey in years 2 and 3",
    authority: "Flag State / Authorised Class",
    focus: ["Can kurtarma araçları", "Fire systems", "Emergency communications"],
  },
  {
    name: "Safety Radio Certificate",
    validity: "1 Year",
    authority: "Flag or authorised GMDSS surveyors",
    focus: ["GMDSS equipment", "Batteries and power supplies", "Radio log records"],
  },
  {
    name: "International Ship Security Certificate (ISSC)",
    validity: "5 Years · Intermediate review in years 2-3",
    authority: "Bayrak Devleti / RSO",
    focus: ["ISPS practices", "SSP records", "Emergency drill reports"],
  },
];

const renewalMatrix = [
  { item: "Annual Safety Survey", maxDelay: "3 ay", documents: "Certificate copy, deficiency closure reports" },
  { item: "Ara Survey (Safety Equipment)", maxDelay: "3 ay", documents: "Lifeboat load test reports, CO₂ system tests" },
  { item: "GMDSS Survey", maxDelay: "30 gün", documents: "Radio Log, EPIRB / SART test certificates" },
  { item: "ISPS Verification", maxDelay: "6 ay", documents: "Drill records, security alerts, SSP revision" },
];

const SOLASCertificatesPage = () => {
  return (
          <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <ShieldCheck className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
            <div>
              <p className="text-sm uppercase tracking-wider text-emerald-600 dark:text-emerald-300">Uyumluluk</p>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                SOLAS Sertifikaları & Yenileme Takibi
              </h1>
            </div>
          </div>
        </div>

        {/* Certificates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((certificate) => (
            <Card key={certificate.name} className="border border-emerald-100/70 shadow-lg shadow-emerald-500/10">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle>{certificate.name}</CardTitle>
                    <CardDescription>{certificate.authority}</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-xs font-semibold">
                    {certificate.validity}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {certificate.focus.join(" · ")}
                </p>
                <Separator />
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Son survey raporu ve eksiklik kapanış listesi saklanmalı</li>
                  <li>• Sertifika PDF + fiziksel kopya aynı revizyonda olmalı</li>
                  <li>• Dijital takip için expiry uyarıları oluşturun</li>
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Renewal Matrix */}
        <Card className="border-emerald-200/70 shadow-xl shadow-emerald-500/10">
          <CardHeader>
            <CardTitle>Yenileme / Survey Takvimi</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>İşlem</TableHead>
                  <TableHead>En Fazla Gecikme</TableHead>
                  <TableHead>Hazırlanacak Dokümanlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {renewalMatrix.map((row) => (
                  <TableRow key={row.item}>
                    <TableCell className="font-medium">{row.item}</TableCell>
                    <TableCell>{row.maxDelay}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{row.documents}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Warning */}
        <Card className="bg-emerald-600 text-white">
          <CardHeader className="flex flex-row items-center gap-3">
            <AlertCircle className="w-10 h-10" />
            <div>
              <CardTitle>Kritik Hatırlatma</CardTitle>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default SOLASCertificatesPage;
