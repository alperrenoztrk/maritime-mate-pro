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

  const DeviceIcon = device.icon;

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className={`absolute -top-20 left-1/3 h-56 w-56 rounded-full bg-gradient-to-br ${device.accent} opacity-20 blur-3xl`} />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${device.accent} text-white shadow-lg`}>
              <DeviceIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">Bridge Device</p>
              <h1 className="text-3xl font-black text-foreground sm:text-4xl">{device.name}</h1>
            </div>
          </div>
        </div>

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
            The {device.name} module helps bridge teams carry out the task safely, methodically and in a way that can be documented. This summary is a quick orientation for newly joined officers and a reference guide for experienced watchkeepers preparing for drills and inspections.
          </p>
        </div>
      </div>
    </div>
  );
}
