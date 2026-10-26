import { PageHeader } from "@/components/layout/PageHeader";
import { Link, useParams } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { LessonImage } from "@/components/ui/LessonImage";
import { bridgeDeviceMap, type BridgeDeviceId } from "@/data/bridgeDevices";

const SectionList = ({ title, items }: { title: string; items: string[] }) => (
  <div className="space-y-2 rounded-xl border border-border/60 bg-card/70 p-3 shadow-sm">
    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
      <Sparkles className="h-4 w-4 text-primary" />
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


  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-10">

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-6">
        <PageHeader title={device.name} />

        <div className="grid gap-3 sm:grid-cols-2">
          <SectionList title="Duties and areas of use" items={device.duties} />
          <SectionList title="Operation steps" items={device.operations} />
          <SectionList title="Monitoring and safety" items={device.monitoring} />
          <SectionList title="Integration and workflow" items={device.integration} />
        </div>

        {/* Only real photos of this exact device are listed; devices without one show no photo block. */}
        {device.images.length > 0 && (
          <div className="space-y-3 rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm">
            <p className="text-micro font-semibold uppercase tracking-[0.2em] text-primary/80">Photo</p>
            <div className={device.images.length > 1 ? "grid gap-3 sm:grid-cols-2" : "grid gap-3"}>
              {device.images.map((url) => (
                <figure
                  key={url}
                  className="overflow-hidden rounded-xl border border-border/60 bg-muted/40 shadow-sm"
                >
                  <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden">
                    <LessonImage
                      src={url}
                      alt={device.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <figcaption className="px-3 py-2 text-xs font-medium text-foreground">
                    {device.name}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-4 text-sm text-foreground shadow-inner sm:p-6">
          <p className="mb-2 text-base font-semibold text-primary">Why is it important?</p>
          <p className="text-muted-foreground">
            This module helps bridge teams carry out the task safely, methodically and in a way that can be documented. This summary is a quick orientation for newly joined officers and a reference guide for experienced watchkeepers preparing for drills and inspections.
          </p>
        </div>
      </div>
    </div>
  );
}
