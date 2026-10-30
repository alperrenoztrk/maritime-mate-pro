import { PagedReadingSurface, type ReadingPage } from "@/components/reader/PagedReadingSurface";
import { PageHeader } from "@/components/layout/PageHeader";
import { useParams } from "react-router-dom";
import { AlertTriangle, BookOpen, Cpu, Sparkles, type LucideIcon } from "lucide-react";
import { LessonImage } from "@/components/ui/LessonImage";
import { bridgeDeviceMap, type BridgeDeviceId } from "@/data/bridgeDevices";

const SectionList = ({
  title,
  items,
  icon: Icon = Sparkles,
  iconClassName = "text-primary",
}: {
  title: string;
  items: string[];
  icon?: LucideIcon;
  iconClassName?: string;
}) => (
  <div className="space-y-2 rounded-xl border border-border/60 bg-card/70 p-3 shadow-sm">
    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
      <Icon className={`h-4 w-4 ${iconClassName}`} />
      <span>{title}</span>
    </div>
    <ul className="space-y-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="text-primary">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default function BridgeDeviceDetailPage() {
  const { deviceId } = useParams<{ deviceId: BridgeDeviceId }>();
  const device = deviceId ? bridgeDeviceMap[deviceId] : undefined;

  if (!device) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 py-12 text-center">
        <p className="text-lg font-semibold text-foreground">Device not found</p>
      </div>
    );
  }

  const collections = [
    {id:"duties",title:"Duties and areas of use",items:device.duties},
    {id:"operations",title:"Operation steps",items:device.operations},
    {id:"monitoring",title:"Monitoring and safety",items:device.monitoring},
    {id:"integration",title:"Integration and workflow",items:device.integration},
    {id:"requirements",title:"Carriage and performance requirements",items:device.requirements},
    {id:"mistakes",title:"Common mistakes on watch",items:device.commonErrors},
  ];
  const pages: ReadingPage[] = [
    { id:"intro",title:device.name,section:"Bridge equipment",content:<p>{device.summary}</p> },
    { id:"principle",title:"How it works",section:"Operating principle",content:<p>{device.principle}</p> },
    ...collections.filter(x=>x.items.length>0).map(x=>({
      id:x.id,title:x.title,section:"Practical guidance",
      content:<SectionList title={x.title} items={x.items} />,
    })),
    ...device.images.map((src,index)=>({
      id:`photo-${index}`,title:`Verified equipment photo ${index+1}`,section:"Equipment identification",
      content:<figure className="space-y-3"><LessonImage src={src} alt={device.name} className="mx-auto max-h-[65dvh] w-full object-contain"/><figcaption className="text-sm text-muted-foreground">{device.name}</figcaption></figure>,
    })),
    {id:"why",title:"Why this equipment matters",section:"Review",content:<p>{device.whyImportant}</p>},
  ];
  return <PagedReadingSurface key={deviceId} title={device.name} subtitle="Bridge equipment"
    pages={pages} storageKey={`mariners-book:bridge-device:${deviceId}`} />;
}
