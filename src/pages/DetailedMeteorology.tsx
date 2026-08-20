import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { MobileLayout } from "@/components/MobileLayout";
import { Cloud, Wind, Thermometer, Droplets, Eye, Compass, AlertTriangle, Info, Navigation, BarChart3, Map, Satellite, Waves, Sun, Moon, CloudRain, Zap, Activity, TrendingUp, Globe, Clock, Target, Shield, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { CloudCard } from "@/components/ui/cloud-card";
import { cloudTypesByLevel } from "@/components/calculations/cloud-types";
import { SatelliteImageryViewer } from "@/components/SatelliteImageryViewer";
import { NAVTEXWarnings } from "@/components/NAVTEXWarnings";
import { WeatherMapDrawing } from "@/components/WeatherMapDrawing";

interface WeatherSystem {
  id: string;
  name: string;
  nameTr: string;
  type: 'low' | 'high' | 'front' | 'storm';
  description: string;
  characteristics: string[];
  maritimeImpact: string;
  safetyLevel: 'safe' | 'caution' | 'dangerous' | 'extreme';
  windSpeed: string;
  visibility: string;
  seaState: string;
  recommendations: string[];
  imageUrl?: string;
}

interface PressureSystem {
  id: string;
  name: string;
  pressure: string;
  characteristics: string[];
  weatherPattern: string;
  maritimeEffects: string[];
  windPattern: string;
  visibility: string;
  recommendations: string[];
}

interface StormType {
  id: string;
  name: string;
  nameTr: string;
  category: string;
  windSpeed: string;
  characteristics: string[];
  formation: string;
  tracking: string;
  maritimeDanger: string;
  safetyMeasures: string[];
  evacuation: string;
}

const DetailedMeteorology = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // USCG Weather Systems Data
  const weatherSystems: WeatherSystem[] = [
    {
      id: 'extratropical-cyclone',
      name: 'Extratropical Cyclone',
      nameTr: 'Ekstratropik Siklon',
      type: 'low',
      description: 'Large-scale low pressure system that forms outside the tropics',
      characteristics: [
        'Cold and warm fronts',
        'Counterclockwise rotation (Northern Hemisphere)',
        'Diameter: 1000-2000 km',
        'Life cycle: 3-7 days',
        'Associated with strong winds and precipitation'
      ],
      maritimeImpact: 'Major navigation hazard with strong winds, heavy seas, and poor visibility',
      safetyLevel: 'dangerous',
      windSpeed: '25-50+ knots',
      visibility: 'Poor to very poor',
      seaState: 'Rough to very rough',
      recommendations: [
        'Avoid center of low pressure',
        'Monitor barometric pressure trends',
        'Prepare for rapid weather changes',
        'Consider port shelter if possible'
      ]
    },
    {
      id: 'tropical-cyclone',
      name: 'Tropical Cyclone',
      nameTr: 'Tropik Siklon',
      type: 'storm',
      description: 'Intense rotating storm system with warm core',
      characteristics: [
        'Eye wall with strongest winds',
        'Symmetric structure',
        'Warm core system',
        'Diameter: 200-1000 km',
        'Life cycle: 1-3 weeks'
      ],
      maritimeImpact: 'Extreme danger with hurricane-force winds, massive seas, and torrential rain',
      safetyLevel: 'extreme',
      windSpeed: '64+ knots (Category 1+)',
      visibility: 'Very poor',
      seaState: 'Phenomenal',
      recommendations: [
        'Evacuate to safe harbor immediately',
        'Stay at least 200 nm from center',
        'Monitor official forecasts continuously',
        'Prepare for extended severe conditions'
      ]
    },
    {
      id: 'anticyclone',
      name: 'Anticyclone',
      nameTr: 'Antisiklon',
      type: 'high',
      description: 'High pressure system with clockwise rotation',
      characteristics: [
        'Clear skies and light winds',
        'Subsiding air',
        'Stable atmospheric conditions',
        'Diameter: 1000-3000 km',
        'Slow-moving system'
      ],
      maritimeImpact: 'Generally favorable conditions with good visibility and calm seas',
      safetyLevel: 'safe',
      windSpeed: '5-15 knots',
      visibility: 'Excellent',
      seaState: 'Calm to slight',
      recommendations: [
        'Ideal conditions for navigation',
        'Monitor for fog formation',
        'Watch for temperature inversions',
        'Maintain normal operations'
      ]
    },
    {
      id: 'cold-front',
      name: 'Cold front',
      nameTr: 'Cold front',
      type: 'front',
      description: 'Boundary between cold and warm air masses',
      characteristics: [
        'Sharp temperature drop',
        'Wind shift to northwest',
        'Cumulonimbus clouds',
        'Squall line formation',
        'Rapid pressure rise'
      ],
      maritimeImpact: 'Sudden weather changes with strong winds, thunderstorms, and rough seas',
      safetyLevel: 'dangerous',
      windSpeed: '20-40 knots',
      visibility: 'Poor during passage',
      seaState: 'Moderate to rough',
      recommendations: [
        'Prepare for sudden wind shifts',
        'Secure all loose equipment',
        'Monitor for squall lines',
        'Reduce speed during passage'
      ]
    },
    {
      id: 'warm-front',
      name: 'Warm front',
      nameTr: 'Warm front',
      type: 'front',
      description: 'Boundary where warm air overrides cold air',
      characteristics: [
        'Gradual temperature rise',
        'Widespread cloud cover',
        'Steady precipitation',
        'Poor visibility',
        'Slow pressure fall'
      ],
      maritimeImpact: 'Extended periods of poor visibility and moderate seas',
      safetyLevel: 'caution',
      windSpeed: '10-25 knots',
      visibility: 'Poor to moderate',
      seaState: 'Slight to moderate',
      recommendations: [
        'Monitor visibility closely',
        'Use radar navigation',
        'Prepare for extended poor weather',
        'Maintain safe speed'
      ]
    }
  ];

  // SeaVision Pressure Systems Data
  const pressureSystems: PressureSystem[] = [
    {
      id: 'deep-low',
      name: 'Deep Low Pressure',
      pressure: '< 980 hPa',
      characteristics: [
        'Intense pressure gradient',
        'Strong winds',
        'Heavy precipitation',
        'Rapid development',
        'Unstable atmosphere'
      ],
      weatherPattern: 'Severe weather with gale to storm force winds',
      maritimeEffects: [
        'Very rough to high seas',
        'Poor visibility',
        'Heavy rain or snow',
        'Strong wind shear',
        'Dangerous navigation conditions'
      ],
      windPattern: 'Strong winds 25-50+ knots',
      visibility: 'Poor to very poor',
      recommendations: [
        'Avoid if possible',
        'Seek sheltered waters',
        'Reduce speed significantly',
        'Monitor weather updates',
        'Prepare for emergency procedures'
      ]
    },
    {
      id: 'shallow-low',
      name: 'Shallow Low Pressure',
      pressure: '980-1000 hPa',
      characteristics: [
        'Moderate pressure gradient',
        'Moderate winds',
        'Variable precipitation',
        'Slow development',
        'Mixed weather conditions'
      ],
      weatherPattern: 'Unsettled weather with moderate winds and precipitation',
      maritimeEffects: [
        'Moderate seas',
        'Variable visibility',
        'Light to moderate precipitation',
        'Moderate wind shear',
        'Manageable navigation conditions'
      ],
      windPattern: 'Moderate winds 15-30 knots',
      visibility: 'Moderate to good',
      recommendations: [
        'Monitor conditions closely',
        'Adjust course if needed',
        'Maintain normal speed',
        'Watch for weather changes',
        'Prepare for moderate conditions'
      ]
    },
    {
      id: 'high-pressure',
      name: 'High Pressure System',
      pressure: '> 1020 hPa',
      characteristics: [
        'Weak pressure gradient',
        'Light winds',
        'Clear skies',
        'Stable conditions',
        'Subsiding air'
      ],
      weatherPattern: 'Fair weather with light winds and good visibility',
      maritimeEffects: [
        'Calm to slight seas',
        'Excellent visibility',
        'Minimal precipitation',
        'Light winds',
        'Favorable navigation conditions'
      ],
      windPattern: 'Light winds 5-15 knots',
      visibility: 'Excellent',
      recommendations: [
        'Ideal navigation conditions',
        'Monitor for fog formation',
        'Maintain normal operations',
        'Watch for temperature inversions',
        'Enjoy favorable weather'
      ]
    }
  ];

  // Storm Classification Data
  const stormTypes: StormType[] = [
    {
      id: 'hurricane-cat1',
      name: 'Category 1 Hurricane',
      nameTr: 'Category 1 Hurricane',
      category: 'Category 1',
      windSpeed: '64-82 knots (119-153 km/h)',
      characteristics: [
        'Very dangerous winds',
        'Some damage to structures',
        'Large storm surge',
        'Heavy rainfall',
        'Tornadoes possible'
      ],
      formation: 'Forms over warm ocean waters (26.5°C+) with low wind shear',
      tracking: 'Tracked by satellite, radar, and aircraft reconnaissance',
      maritimeDanger: 'Extreme danger to all vessels',
      safetyMeasures: [
        'Evacuate to safe harbor',
        'Stay at least 200 nm from center',
        'Monitor continuous updates',
        'Prepare for extended severe weather',
        'Secure all equipment'
      ],
      evacuation: 'Immediate evacuation recommended'
    },
    {
      id: 'hurricane-cat5',
      name: 'Category 5 Hurricane',
      nameTr: 'Category 5 Hurricane',
      category: 'Category 5',
      windSpeed: '137+ knots (252+ km/h)',
      characteristics: [
        'Catastrophic winds',
        'Massive destruction',
        'Extreme storm surge',
        'Torrential rainfall',
        'Multiple tornadoes'
      ],
      formation: 'Requires perfect conditions: warm water, low shear, high humidity',
      tracking: 'Intensive monitoring with aircraft and satellite',
      maritimeDanger: 'Certain death for any vessel caught in path',
      safetyMeasures: [
        'Immediate evacuation mandatory',
        'Stay at least 300 nm from center',
        'Continuous monitoring required',
        'Prepare for catastrophic conditions',
        'Emergency procedures activated'
      ],
      evacuation: 'Mandatory evacuation - no exceptions'
    },
    {
      id: 'extratropical-storm',
      name: 'Extratropical Storm',
      nameTr: 'Extratropical Storm',
      category: 'Gale/Storm',
      windSpeed: '34-63+ knots',
      characteristics: [
        'Cold core system',
        'Frontal boundaries',
        'Variable intensity',
        'Large size',
        'Long duration'
      ],
      formation: 'Forms from temperature contrasts between air masses',
      tracking: 'Monitored by weather models and satellite imagery',
      maritimeDanger: 'High danger with strong winds and rough seas',
      safetyMeasures: [
        'Avoid center of low pressure',
        'Monitor barometric pressure',
        'Prepare for rapid changes',
        'Reduce speed significantly',
        'Consider port shelter'
      ],
      evacuation: 'Consider port shelter if conditions deteriorate'
    }
  ];

  const getSafetyColor = (level: string) => {
    switch (level) {
      case 'safe': return 'bg-green-100 text-green-800 border-green-200';
      case 'caution': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'dangerous': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'extreme': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSafetyIcon = (level: string) => {
    switch (level) {
      case 'safe': return <Shield className="h-4 w-4" />;
      case 'caution': return <AlertTriangle className="h-4 w-4" />;
      case 'dangerous': return <AlertTriangle className="h-4 w-4" />;
      case 'extreme': return <AlertTriangle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  return (
    <MobileLayout>
      <div className="min-h-screen p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          

          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Cloud className="h-12 w-12 text-blue-600 dark:text-blue-400 animate-pulse" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Meteorology Subject Explanation
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Comprehensive meteorology guide compiled from USCG and SeaVision sources
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Badge className="bg-blue-600 text-white">
                <BookOpen className="h-3 w-3 mr-1" />
                Comprehensive Guide
              </Badge>
              <Badge variant="outline" className="border-blue-600 text-blue-600">
                <Clock className="h-3 w-3 mr-1" />
                ~45 minutes
              </Badge>
              <Badge variant="secondary">
                <Shield className="h-3 w-3 mr-1" />
                Security Focused
              </Badge>
            </div>
          </div>

        {/* Data Sources Alert */}
        <Alert className="border-2 border-blue-300 dark:border-blue-600 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20">
          <div className="flex items-start gap-3">
            <div className="bg-blue-600 dark:bg-blue-500 rounded-full p-2 mt-1">
              <Info className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="font-bold text-blue-900 dark:text-blue-100 flex items-center gap-2">
                Data Sources
              </div>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                This topic is explained <span className="font-semibold">US Coast Guard (USCG)</span> and 
                <span className="font-semibold"> SeaVision</span> meteorological data. All information has been prepared in line with maritime safety standards.
              </p>
            </div>
          </div>
        </Alert>

        <Tabs defaultValue="systems" className="w-full">
          <TabsList className="grid w-full grid-cols-9">
            <TabsTrigger value="systems">Air Systems</TabsTrigger>
            <TabsTrigger value="clouds">Clouds</TabsTrigger>
            <TabsTrigger value="pressure">Pressure Systems</TabsTrigger>
            <TabsTrigger value="storms">Types of Storms</TabsTrigger>
            <TabsTrigger value="satellite">Satellite Images</TabsTrigger>
            <TabsTrigger value="navtex">NAVTEX Warnings</TabsTrigger>
            <TabsTrigger value="drawing">Weather Chart</TabsTrigger>
            <TabsTrigger value="forecasting">Estimation Methods</TabsTrigger>
            <TabsTrigger value="safety">Security Guide</TabsTrigger>
          </TabsList>

          {/* Satellite Tab */}
          <TabsContent value="satellite" className="space-y-6">
            <SatelliteImageryViewer />
          </TabsContent>

          {/* NAVTEX Tab */}
          <TabsContent value="navtex" className="space-y-6">
            <NAVTEXWarnings />
          </TabsContent>

          {/* Weather Map Drawing Tab */}
          <TabsContent value="drawing" className="space-y-6">
            <WeatherMapDrawing />
          </TabsContent>

          {/* Clouds Tab */}
          <TabsContent value="clouds" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="h-6 w-6 text-sky-600" />
                  Cloud Atlas (Actual Images + CH/CM/CL)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Legend + Mariner Hints */}
                <Alert className="border-blue-200 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/20">
                  <Info className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                  <AlertDescription className="text-sm">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">CH: High clouds</Badge>
                      <Badge variant="secondary" className="text-xs">CM: Mid-level clouds</Badge>
                      <Badge variant="secondary" className="text-xs">CL: Low clouds</Badge>
                      <Badge variant="outline" className="text-xs border-red-400 text-red-700 dark:text-red-300">Cb: Vertical development (storm)</Badge>
                    </div>
                    <div className="text-xs space-y-1">
                      <p><strong>Sailor's Note:</strong> CL bulutlar görüşü hızla düşürür (sis/yağış); CM bulutlar cephe yaklaşımının habercisi olabilir; CH bulutlar uzak/orta vadede hava değişimini işaret eder; Cb ise şiddetli fırtına, ani rüzgar ve dolu riskidir.</p>
                    </div>
                  </AlertDescription>
                </Alert>

                {/* Low (CL) */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Badge variant="outline" className="border-blue-400 text-blue-800 dark:text-blue-200">CL</Badge>
                    Low Clouds (0-2 km)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {cloudTypesByLevel.low.map((c) => (
                      <CloudCard key={c.id} cloud={c} />
                    ))}
                  </div>
                </div>

                {/* Middle (CM) */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Badge variant="outline" className="border-green-400 text-green-800 dark:text-green-200">CM</Badge>
                    Middle Clouds (2-7 km)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {cloudTypesByLevel.middle.map((c) => (
                      <CloudCard key={c.id} cloud={c} />
                    ))}
                  </div>
                </div>

                {/* High (CH) */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Badge variant="outline" className="border-purple-400 text-purple-800 dark:text-purple-200">CH</Badge>
                    High Clouds (5-13 km)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {cloudTypesByLevel.high.map((c) => (
                      <CloudCard key={c.id} cloud={c} />
                    ))}
                  </div>
                </div>

                {/* Vertical Development */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Badge variant="destructive" className="text-white">C b</Badge>
                    Vertical Development Clouds (Storm)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {cloudTypesByLevel.vertical.map((c) => (
                      <CloudCard key={c.id} cloud={c} />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Weather Systems Tab */}
          <TabsContent value="systems" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-6 w-6 text-blue-600" />
                  Weather Systems and Maritime Effects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {weatherSystems.map((system) => (
                    <Card key={system.id} className="border-l-4 border-l-blue-500">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              {system.type === 'low' && <Wind className="h-5 w-5 text-blue-600" />}
                              {system.type === 'high' && <Sun className="h-5 w-5 text-yellow-600" />}
                              {system.type === 'front' && <CloudRain className="h-5 w-5 text-gray-600" />}
                              {system.type === 'storm' && <Zap className="h-5 w-5 text-red-600" />}
                              <CardTitle className="text-lg">{system.nameTr}</CardTitle>
                            </div>
                            <Badge className={getSafetyColor(system.safetyLevel)}>
                              {getSafetyIcon(system.safetyLevel)}
                              <span className="ml-1">
                                {system.safetyLevel === 'safe' ? 'safe' :
                                 system.safetyLevel === 'caution' ? 'Careful' :
                                 system.safetyLevel === 'dangerous' ? 'Dangerous' : 'Very Dangerous'}
                              </span>
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleSection(system.id)}
                          >
                            {expandedSections[system.id] ? 
                              <ChevronUp className="h-4 w-4" /> : 
                              <ChevronDown className="h-4 w-4" />
                            }
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">{system.description}</p>
                      </CardHeader>
                      
                      {expandedSections[system.id] && (
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                                <BarChart3 className="h-4 w-4" />
                                Features
                              </h4>
                              <ul className="text-sm space-y-1">
                                {system.characteristics.map((char, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <span className="text-blue-600 mt-1">•</span>
                                    <span>{char}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                                <Navigation className="h-4 w-4" />
                                Maritime Influences
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                  <Wind className="h-3 w-3 text-blue-600" />
                                  <span><strong>Wind:</strong> {system.windSpeed}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Eye className="h-3 w-3 text-blue-600" />
                                  <span><strong>Opinion:</strong> {system.visibility}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Waves className="h-3 w-3 text-blue-600" />
                                  <span><strong>Sea State:</strong> {system.seaState}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4" />
                              Security Recommendations
                            </h4>
                            <ul className="text-sm space-y-1">
                              {system.recommendations.map((rec, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <span className="text-green-600 mt-1">✓</span>
                                  <span>{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pressure Systems Tab */}
          <TabsContent value="pressure" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                  Pressure Systems and Maritime
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {pressureSystems.map((system) => (
                    <Card key={system.id} className="border-l-4 border-l-green-500">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Activity className="h-5 w-5 text-green-600" />
                          {system.name}
                          <Badge variant="outline" className="ml-auto">
                            {system.pressure}
                          </Badge>
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{system.weatherPattern}</p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-sm mb-2">Features</h4>
                            <ul className="text-sm space-y-1">
                              {system.characteristics.map((char, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <span className="text-green-600 mt-1">•</span>
                                  <span>{char}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-sm mb-2">Maritime Influences</h4>
                            <ul className="text-sm space-y-1">
                              {system.maritimeEffects.map((effect, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <span className="text-blue-600 mt-1">•</span>
                                  <span>{effect}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-2">
                            <Wind className="h-4 w-4 text-blue-600" />
                            <span className="text-sm"><strong>Wind:</strong> {system.windPattern}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4 text-blue-600" />
                            <span className="text-sm"><strong>Opinion:</strong> {system.visibility}</span>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Suggestions</h4>
                          <ul className="text-sm space-y-1">
                            {system.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Storm Types Tab */}
          <TabsContent value="storms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-6 w-6 text-red-600" />
                  Storm Types and Classification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {stormTypes.map((storm) => (
                    <Card key={storm.id} className="border-l-4 border-l-red-500">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Zap className="h-6 w-6 text-red-600" />
                            <div>
                              <CardTitle className="text-lg">{storm.nameTr}</CardTitle>
                              <p className="text-sm text-muted-foreground">{storm.category}</p>
                            </div>
                          </div>
                          <Badge variant="destructive" className="text-sm">
                            {storm.windSpeed}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-sm mb-2">Features</h4>
                            <ul className="text-sm space-y-1">
                              {storm.characteristics.map((char, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <span className="text-red-600 mt-1">•</span>
                                  <span>{char}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-sm mb-2">Formation</h4>
                            <p className="text-sm">{storm.formation}</p>
                            <h4 className="font-semibold text-sm mb-2 mt-3">Tracking</h4>
                            <p className="text-sm">{storm.tracking}</p>
                          </div>
                        </div>
                        
                        <Alert className="border-red-200 bg-red-50">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <AlertDescription>
                            <strong>Maritime Hazard:</strong> {storm.maritimeDanger}
                          </AlertDescription>
                        </Alert>
                        
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Safety Precautions</h4>
                          <ul className="text-sm space-y-1">
                            {storm.safetyMeasures.map((measure, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-red-600 mt-1">⚠</span>
                                <span>{measure}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-red-100 p-3 rounded-lg">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                            <span className="font-semibold text-red-800">Evacuation:</span>
                          </div>
                          <p className="text-sm text-red-700 mt-1">{storm.evacuation}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Forecasting Methods Tab */}
          <TabsContent value="forecasting" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Satellite className="h-6 w-6 text-purple-600" />
                  Meteorology Forecast Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Satellite Imagery */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Satellite className="h-5 w-5 text-purple-600" />
                    Satellite Imaging
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-purple-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Visible Spectrum (VIS)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-1">
                          <li>• Daytime cloud structures</li>
                          <li>• Cloud thickness analysis</li>
                          <li>• Storm development tracking</li>
                          <li>• Sea surface observation</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-purple-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Infrared (IR)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-1">
                          <li>• Continuous observation day/night</li>
                          <li>• Cloud height detection</li>
                          <li>• Temperature analysis</li>
                          <li>• Storm top detection</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-purple-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Water Vapor (WV)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-1">
                          <li>• Atmospheric humidity analysis</li>
                          <li>• Jet stream tracking</li>
                          <li>• Facade systems</li>
                          <li>• Upper level winds</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-purple-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Microwave</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-1">
                          <li>• Rainfall detection</li>
                          <li>• Inner cloud water content</li>
                          <li>• Tropical cyclone analysis</li>
                          <li>• Sea surface temperature</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Separator />

                {/* Weather Models */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    Weather Models
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border-blue-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">GFS (Global)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-1">
                          <li>• Global coverage</li>
                          <li>• 15 km resolution</li>
                          <li>• 16 days forecast</li>
                          <li>• 6 hourly updates</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-blue-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">ECMWF (Europe)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-1">
                          <li>• High accuracy</li>
                          <li>• 9 km resolution</li>
                          <li>• 10 days forecast</li>
                          <li>• 12-hour updates</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-blue-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">WRF (Local)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-1">
                          <li>• High resolution</li>
                          <li>• 1-3 km resolution</li>
                          <li>• 48 hour forecast</li>
                          <li>• Detailed local analysis</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Separator />

                {/* Marine Weather Services */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Navigation className="h-5 w-5 text-purple-600" />
                    Maritime Meteorological Services
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-green-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">USCG Weather</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-1">
                          <li>• VHF weather broadcasts</li>
                          <li>• Daily marine forecasts</li>
                          <li>• Storm warnings</li>
                          <li>• Navigation security</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-green-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">NOAA Marine</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-1">
                          <li>• Detailed marine forecasts</li>
                          <li>• Wave height models</li>
                          <li>• Current forecasts</li>
                          <li>• Tropical cyclone tracking</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Safety Guide Tab */}
          <TabsContent value="safety" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-green-600" />
                  Maritime Safety Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Pre-Voyage Planning */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-green-600" />
                    Pre-navigation Planning
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-green-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Weather Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-1">
                          <li>• 72 hour forecast review</li>
                          <li>• Pressure charts analysis</li>
                          <li>• Wind and wave forecasts</li>
                          <li>• Alternative route planning</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-green-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Security Check</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-1">
                          <li>• Emergency equipment</li>
                          <li>• Communication systems</li>
                          <li>• Navigation devices</li>
                          <li>• Safety equipment</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Separator />

                {/* Weather Monitoring */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Clock className="h-5 w-5 text-green-600" />
                    Monitoring While Cruising
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border-blue-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Continuous Monitoring</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-1">
                          <li>• Barometric pressure monitoring</li>
                          <li>• Wind direction and speed</li>
                          <li>• View distance</li>
                          <li>• Sea state</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-blue-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Warning Signals</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-1">
                          <li>• Sudden pressure drop</li>
                          <li>• Wind direction change</li>
                          <li>• Decreased vision</li>
                          <li>• Wave height increase</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-blue-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Emergency</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-1">
                          <li>• Seeking a safe haven</li>
                          <li>• Speed reduction</li>
                          <li>• Personnel safety</li>
                          <li>• Communicate</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Separator />

                {/* Emergency Procedures */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    Emergency Procedures
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Alert className="border-red-200 bg-red-50">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <AlertDescription>
                        <strong>Storm Approach:</strong> Seek a safe harbour immediately, reduce speed, secure all equipment and move personnel to safe areas.
                      </AlertDescription>
                    </Alert>
                    
                    <Alert className="border-orange-200 bg-orange-50">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <AlertDescription>
                        <strong>Loss of Vision:</strong> Use radar, reduce speed, sound the fog signal and report your position on VHF.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>

                <Separator />

                {/* Communication */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    Contact and Help
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-purple-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Emergency Contact</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-1">
                          <li>• VHF Channel 16 (156.8 MHz)</li>
                          <li>• EPIRB activation</li>
                          <li>• Satellite phone</li>
                          <li>• AIS emergency signal</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-purple-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Information Resources</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-1">
                          <li>• NOAA Weather Radio</li>
                          <li>• USCG Broadcasts</li>
                          <li>• Marine Weather Apps</li>
                          <li>• Satellite Weather</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-6">
          <p>
            This guide has been compiled from US Coast Guard and SeaVision meteorological data. All information has been prepared in line with maritime safety standards.
          </p>
          <p className="mt-2">
            <strong>Important:</strong> Weather forecasts can change. Follow the latest information before and during the passage.
          </p>
        </div>
      </div>
    </div>
    </MobileLayout>
  );
};

export default DetailedMeteorology;