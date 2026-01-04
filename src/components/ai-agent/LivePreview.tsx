import { useMemo, useState, useEffect } from 'react';
import { Runner, Scope } from 'react-live-runner';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, BarChart, PieChart, AreaChart,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Line, Bar, Pie, Area 
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Anchor, Ship, Navigation, Compass, Map, Waves, AlertTriangle } from 'lucide-react';
import React, { useState as useStateHook, useEffect as useEffectHook, useMemo as useMemoHook, useCallback as useCallbackHook } from 'react';

interface LivePreviewProps {
  code: string;
}

// Maritime helper functions for scope
const maritimeHelpers = {
  // GM Calculation
  calculateGM: (KM: number, KG: number) => KM - KG,
  
  // GZ Calculation (small angles)
  calculateGZ: (GM: number, heelAngle: number) => GM * Math.sin(heelAngle * Math.PI / 180),
  
  // Trim calculation
  calculateTrim: (aftDraft: number, fwdDraft: number) => aftDraft - fwdDraft,
  
  // TPC calculation
  calculateTPC: (waterplaneArea: number, density = 1.025) => (waterplaneArea * density) / 100,
  
  // MTC calculation
  calculateMTC: (displacement: number, GML: number, length: number) => (displacement * GML) / (100 * length),
  
  // Displacement calculation
  calculateDisplacement: (L: number, B: number, T: number, Cb: number, density = 1.025) => L * B * T * Cb * density,
  
  // Great Circle Distance
  calculateGreatCircleDistance: (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const toRad = (deg: number) => deg * Math.PI / 180;
    const dLon = toRad(lon2 - lon1);
    const distance = Math.acos(
      Math.sin(toRad(lat1)) * Math.sin(toRad(lat2)) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLon)
    );
    return distance * 60 * (180 / Math.PI);
  },
  
  // Convert degrees to DMS
  toDMS: (decimal: number) => {
    const d = Math.floor(decimal);
    const m = Math.floor((decimal - d) * 60);
    const s = ((decimal - d) * 60 - m) * 60;
    return { degrees: d, minutes: m, seconds: s };
  },
  
  // Beaufort scale
  getBeaufortScale: (windSpeed: number) => {
    if (windSpeed < 1) return { force: 0, description: 'Calm' };
    if (windSpeed < 4) return { force: 1, description: 'Light air' };
    if (windSpeed < 7) return { force: 2, description: 'Light breeze' };
    if (windSpeed < 11) return { force: 3, description: 'Gentle breeze' };
    if (windSpeed < 17) return { force: 4, description: 'Moderate breeze' };
    if (windSpeed < 22) return { force: 5, description: 'Fresh breeze' };
    if (windSpeed < 28) return { force: 6, description: 'Strong breeze' };
    if (windSpeed < 34) return { force: 7, description: 'Near gale' };
    if (windSpeed < 41) return { force: 8, description: 'Gale' };
    if (windSpeed < 48) return { force: 9, description: 'Strong gale' };
    if (windSpeed < 56) return { force: 10, description: 'Storm' };
    if (windSpeed < 64) return { force: 11, description: 'Violent storm' };
    return { force: 12, description: 'Hurricane' };
  },
};

// Create scope for live preview
const createScope = (): Scope => ({
  // React
  React,
  useState: useStateHook,
  useEffect: useEffectHook,
  useMemo: useMemoHook,
  useCallback: useCallbackHook,
  
  // Framer Motion
  motion,
  AnimatePresence,
  
  // Recharts
  LineChart,
  BarChart,
  PieChart,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  Bar,
  Pie,
  Area,
  
  // shadcn/ui
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Input,
  Label,
  Slider,
  Badge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  
  // Icons
  Calculator,
  Anchor,
  Ship,
  Navigation,
  Compass,
  Map,
  Waves,
  AlertTriangle,
  
  // Maritime helpers
  ...maritimeHelpers,
});

export function LivePreview({ code }: LivePreviewProps) {
  const [error, setError] = useState<string | null>(null);
  const scope = useMemo(() => createScope(), []);

  // Wrap code to export default component
  const wrappedCode = useMemo(() => {
    if (!code) return '';
    
    // Check if code already has export or render statement
    if (code.includes('export default') || code.includes('render(')) {
      return code;
    }
    
    // Extract component name from code
    const componentMatch = code.match(/(?:const|function)\s+(\w+)/);
    const componentName = componentMatch ? componentMatch[1] : 'Component';
    
    // Wrap with render
    return `${code}\n\nrender(<${componentName} />)`;
  }, [code]);

  useEffect(() => {
    setError(null);
  }, [code]);

  if (!code) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-muted/30 rounded-lg border border-dashed border-border p-8">
        <Ship className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground text-center">
          Kod üretildiğinde burada önizleme görünecek
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <AnimatePresence mode="wait">
        {error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full bg-destructive/10 rounded-lg border border-destructive/30 p-6"
          >
            <AlertTriangle className="h-10 w-10 text-destructive mb-4" />
            <p className="text-destructive font-medium mb-2">Önizleme Hatası</p>
            <pre className="text-xs text-destructive/80 bg-destructive/5 p-3 rounded overflow-auto max-h-32 w-full">
              {error}
            </pre>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="h-full w-full overflow-auto bg-background rounded-lg border border-border p-4"
          >
            <Runner
              code={wrappedCode}
              scope={scope}
              onRendered={(error) => {
                if (error) {
                  setError(error.message);
                } else {
                  setError(null);
                }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
