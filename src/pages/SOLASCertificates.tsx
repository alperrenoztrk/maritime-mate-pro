import { PagedReadingSurface, type ReadingPage } from "@/components/reader/PagedReadingSurface";
import { PageHeader } from "@/components/layout/PageHeader";
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
    focus: ["Lifesaving equipment", "Fire systems", "Emergency communications"],
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
  { item: "Annual Safety Survey", maxDelay: "3 months", documents: "Certificate copy, deficiency closure reports" },
  { item: "Ara Survey (Safety Equipment)", maxDelay: "3 months", documents: "Lifeboat load test reports, CO₂ system tests" },
  { item: "GMDSS Survey", maxDelay: "30 days", documents: "Radio Log, EPIRB / SART test certificates" },
  { item: "ISPS Verification", maxDelay: "6 months", documents: "Drill records, security alerts, SSP revision" },
];

const SOLASCertificatesPage = () => {
  const pages:ReadingPage[] = [
    {id:"overview",title:"SOLAS Certificates & Surveys",section:"Certificates",content:
      <p>Illustrative learning summary. Certificate applicability, survey windows and renewal requirements vary by vessel type, flag state, endorsements and the current legal text. Always check the official requirements.</p>},
    ...certificates.map((certificate,index)=>({
      id:`certificate-${index}`,title:certificate.name,section:`Certificate ${index+1}/${certificates.length}`,
      content:<div className="space-y-4">
        <p><strong>Issuing authority:</strong> {certificate.authority}</p>
        <p><strong>Indicative validity and surveys:</strong> {certificate.validity}</p>
        <ul className="list-disc space-y-2 pl-5">{certificate.focus.map((item,i)=><li key={i}>{item}</li>)}</ul>
        <p className="text-sm text-muted-foreground">Keep survey and corrective action evidence, matching document revisions and expiry alerts.</p>
      </div>,
    })),
    {id:"renewal",title:"Survey and renewal reference",section:"Planning",content:
      <div className="overflow-x-auto"><Table><TableHeader><TableRow>
        <TableHead>Survey</TableHead><TableHead>Illustrative interval</TableHead><TableHead>Documentation</TableHead>
      </TableRow></TableHeader><TableBody>{renewalMatrix.map((row)=><TableRow key={row.item}>
        <TableCell>{row.item}</TableCell><TableCell>{row.maxDelay}</TableCell><TableCell>{row.documents}</TableCell>
      </TableRow>)}</TableBody></Table></div>},
    {id:"caution",title:"Mandatory verification",section:"Sources",
      content:<p>These figures are not ship-approved. Check SOLAS as amended, the applicable survey and certification regime and flag administration or recognized organization instructions before acting.</p>},
  ];
  return <PagedReadingSurface title="SOLAS Certificates" subtitle="Regulatory reference" pages={pages}
    storageKey="mariners-book:solas-certificates" />;
};

export default SOLASCertificatesPage;
