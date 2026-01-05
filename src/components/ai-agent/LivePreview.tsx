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
import { maritimeHelpers } from '@/utils/maritimeHelpers';

interface LivePreviewProps {
  code: string;
}

const FORBIDDEN_PATTERNS = [
  /\\bwindow\\b/i,
  /\\bdocument\\b/i,
  /\\blocalStorage\\b/i,
  /\\bsessionStorage\\b/i,
  /\\bfetch\\b/i,
  /\\bXMLHttpRequest\\b/i,
  /\\bWebSocket\\b/i,
  /\\beval\\b/i,
  /\\bFunction\\b/i,
  /\\bimport\\s*\\(/i,
];

const findForbiddenPattern = (code: string): string | null => {
  for (const pattern of FORBIDDEN_PATTERNS) {
    if (pattern.test(code)) {
      return pattern.toString();
    }
  }
  return null;
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
    if (!code) {
      setError(null);
      return;
    }
    const forbidden = findForbiddenPattern(code);
    if (forbidden) {
      setError(`Bu kod önizleme güvenlik filtresinden geçemedi: ${forbidden}`);
      return;
    }
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
              key={wrappedCode}
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
