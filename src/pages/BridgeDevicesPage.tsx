import { Radar } from "lucide-react";
import { bridgeDevices } from "@/data/bridgeDevices";
import { LibraryBookCard, LibraryPageShell } from "@/components/library/LibraryInterface";

export default function BridgeDevicesPage() {
  return (
    <LibraryPageShell title="Köprüüstü Aygıtları" icon={Radar}>
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {bridgeDevices.map((device) => (
          <LibraryBookCard
            key={device.id}
            to={`/bridge/${device.id}`}
            title={device.name}
            accent={device.accent}
          />
        ))}
      </section>
    </LibraryPageShell>
  );
}
