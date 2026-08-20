import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CloudType } from "@/components/calculations/cloud-types";
import { 
  Cloud, 
  Eye, 
  Wind, 
  Droplets, 
  AlertTriangle, 
  Info,
  Navigation,
  Thermometer,
  Satellite,
  Target,
  Lightbulb
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CloudCardProps {
  cloud: CloudType;
  className?: string;
}

export function CloudCard({ cloud, className }: CloudCardProps) {
  const [imageError, setImageError] = useState(false);
  const getDangerColor = (danger: string) => {
    switch (danger) {
      case 'high':
        return 'border-red-500 bg-red-50';
      case 'medium':
        return 'border-orange-400 bg-orange-50';
      case 'low':
        return 'border-blue-300 bg-blue-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const getDangerBadge = (danger: string) => {
    switch (danger) {
      case 'high':
        return <Badge variant="destructive" className="gap-1">
          <AlertTriangle className="h-3 w-3" />
          High Risk
        </Badge>;
      case 'medium':
        return <Badge variant="outline" className="border-orange-500 text-orange-700 gap-1">
          <Info className="h-3 w-3" />
          Medium Risk
        </Badge>;
      case 'low':
        return <Badge variant="secondary" className="gap-1">
          <Info className="h-3 w-3" />
          Low Risk
        </Badge>;
      default:
        return null;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'bg-blue-100 text-blue-800';
      case 'middle':
        return 'bg-green-100 text-green-800';
      case 'high':
        return 'bg-purple-100 text-purple-800';
      case 'vertical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
    }
  };

  return (
    <Card className={cn(getDangerColor(cloud.danger), "transition-[background-color,color,border-color,box-shadow,opacity,transform,width] hover:shadow-lg dark:shadow-gray-900/50", className)}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Cloud className="h-5 w-5" />
              {cloud.name} ({cloud.code})
            </CardTitle>
            <CardDescription className="text-base font-medium mt-1">
              {cloud.nameTr}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2 items-end">
            {getDangerBadge(cloud.danger)}
            <div className="flex flex-col gap-1 items-end">
              <Badge className={cn("text-xs font-bold px-3 py-1", getLevelColor(cloud.level))}>
                MGM: {cloud.mgmCode}
              </Badge>
              <Badge variant="outline" className="text-xs font-mono border-purple-400 text-purple-700 dark:text-purple-300 dark:border-purple-500">
                {cloud.code}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Görsel - Gerçek Bulut Fotoğrafı */}
        <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-gray-300 dark:border-gray-600 shadow-lg">
          {cloud.imageUrl && !imageError ? (
            <>
              <img
                src={cloud.imageUrl}
                alt={`${cloud.name} - ${cloud.descriptionTr}`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                onError={() => setImageError(true)}
              />
              {/* Gradient overlay for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40"></div>
            </>
          ) : null}
          <div 
            className={`${cloud.imageUrl && !imageError ? 'hidden' : 'flex'} absolute inset-0 bg-gradient-to-br from-sky-100 to-sky-200 dark:from-slate-900 dark:to-slate-800 items-center justify-center`}
          >
            <div className="text-center">
              <Cloud className="h-16 w-16 text-sky-600 dark:text-slate-200 mb-2" />
              <div className="text-lg font-bold text-sky-800 dark:text-slate-100">{cloud.code}</div>
              <div className="text-sm text-sky-700 dark:text-slate-300">{cloud.nameTr}</div>
            </div>
          </div>
          
          {/* Altitude badges - Top */}
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="text-xs bg-white/90 dark:bg-gray-800/90 border border-white/50 font-semibold shadow-lg">
              <Thermometer className="h-3 w-3 mr-1" />
              {cloud.altitude}
            </Badge>
          </div>
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="text-xs bg-white/90 dark:bg-gray-800/90 border border-white/50 font-semibold shadow-lg">
              {cloud.altitudeFt}
            </Badge>
          </div>
          
          {/* Cloud name and code overlay - Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-bold text-lg tracking-wide drop-shadow-lg">
                  {cloud.name}
                </div>
                <div className="text-white/90 text-sm drop-shadow-md">
                  {cloud.nameTr}
                </div>
              </div>
              <Badge className={cn("text-sm font-bold px-3 py-1 shadow-lg", getLevelColor(cloud.level))}>
                {cloud.code}
              </Badge>
            </div>
          </div>
        </div>

        {/* Açıklama */}
        <div className="space-y-2">
          <p className="text-sm text-gray-700 dark:text-gray-300">{cloud.descriptionTr}</p>
          
          {/* Özellikler */}
          <div className="bg-white dark:bg-gray-800/50 dark:bg-gray-700/50 rounded-lg p-3 space-y-2">
            <h4 className="font-semibold text-sm flex items-center gap-1">
              <Info className="h-4 w-4" />
              Features
            </h4>
            <ul className="text-xs space-y-1">
              {cloud.characteristics.map((char, index) => (
                <li key={index} className="flex items-start gap-1">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>{char}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Denizcilik Önemi */}
        <Alert className={cn(
          "border",
          cloud.danger === 'high' ? 'border-red-300 bg-red-50' :
          cloud.danger === 'medium' ? 'border-orange-300 bg-orange-50' :
          'border-blue-300 bg-blue-50'
        )}>
          <Navigation className="h-4 w-4" />
          <AlertDescription className="text-sm">
            <span className="font-semibold">Maritime Importance:</span> {cloud.maritimeImportance}
          </AlertDescription>
        </Alert>

        {/* Detaylı Bilgiler */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-white dark:bg-gray-800/50 dark:bg-gray-700/50 rounded p-2 text-center">
            <Eye className="h-4 w-4 mx-auto mb-1 text-gray-600 dark:text-gray-400" />
            <div className="font-semibold">Opinion</div>
            <div className="text-gray-700 dark:text-gray-300">{cloud.visibility}</div>
          </div>
          <div className="bg-white dark:bg-gray-800/50 dark:bg-gray-700/50 rounded p-2 text-center">
            <Wind className="h-4 w-4 mx-auto mb-1 text-gray-600 dark:text-gray-400" />
            <div className="font-semibold">Wind</div>
            <div className="text-gray-700 dark:text-gray-300">{cloud.wind}</div>
          </div>
          <div className="bg-white dark:bg-gray-800/50 dark:bg-gray-700/50 rounded p-2 text-center">
            <Droplets className="h-4 w-4 mx-auto mb-1 text-gray-600 dark:text-gray-400" />
            <div className="font-semibold">Precipitation</div>
            <div className="text-gray-700 dark:text-gray-300">{cloud.precipitation}</div>
          </div>
        </div>

        {/* Uydu Kanalları - Daha Belirgin Tasarım */}
        {cloud.satelliteChannels && cloud.satelliteChannels.length > 0 && (
          <div className="bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 dark:from-purple-900/30 dark:via-indigo-900/30 dark:to-blue-900/30 rounded-xl p-4 space-y-3 border-2 border-purple-300 dark:border-purple-600 shadow-md">
            <div className="flex items-center gap-2">
              <div className="bg-purple-600 dark:bg-purple-500 rounded-full p-2">
                <Satellite className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-purple-900 dark:text-purple-100">
                  Meteorological Satellite Channels
                </h4>
              </div>
            </div>
            
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-2">
              <div className="flex flex-wrap gap-2">
                {cloud.satelliteChannels.map((channel, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-xs font-semibold px-3 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {channel}
                  </Badge>
                ))}
              </div>
            </div>
            
            {cloud.bestDetectionChannel && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-lg p-3 border-2 border-yellow-300 dark:border-yellow-600">
                <div className="flex items-start gap-2">
                  <Target className="h-5 w-5 shrink-0 text-yellow-700 dark:text-yellow-300" aria-hidden />
                  <div className="flex-1">
                    <div className="font-bold text-xs text-yellow-900 dark:text-yellow-100 mb-1">
                      RECOMMENDED PRIMARY CHANNEL
                    </div>
                    <div className="text-xs text-yellow-800 dark:text-yellow-200 font-medium">
                      {cloud.bestDetectionChannel}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="text-xs text-purple-600 dark:text-purple-300 italic pt-2 border-t border-purple-200 dark:border-purple-700">
              <Lightbulb className="mr-1 inline h-3.5 w-3.5 align-[-2px]" aria-hidden />
              These channels are the spectral bands of the EUMETSAT MSG satellite system
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
