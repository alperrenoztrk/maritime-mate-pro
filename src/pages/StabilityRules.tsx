import React, { useState } from 'react';
import { MobileLayout } from '@/components/MobileLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, GraduationCap, Shuffle } from 'lucide-react';
import { StabilityQuiz } from '@/components/stability/StabilityQuiz';
import { stabilityQuestions, getQuestionsByCategory, getAllCategories, getRandomQuestions } from '@/data/stabilityQuestions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface RuleSection {
  title: string;
  rules: string[];
  sources: { label: string; href: string }[];
  extras?: { heading: string; items: string[] }[];
}

const sections: RuleSection[] = [
  {
    title: '2008 IS Code — Intact Stability',
    rules: [
      'Area under the GZ curve: 0°–30° ≥ 0.055 m·rad; 0°–40° (or up to the downflooding angle) ≥ 0.090 m·rad; 30°–40° ≥ 0.030 m·rad.',
      'Maximum GZ ≥ 0.20 m occurring at an angle θ ≥ 30°.',
      'Initial GM (GM0) ≥ 0.15 m (typical minimum for steel dry cargo, general cargo vessels etc.).',
      'The range of positive stability must be at least 30°; the deck edge should preferably immerse beyond 30°.',
      'Weather Criterion: in a 26–40 m/s wind the angle of equilibrium θw ≤ 16° or 80% of θ_deck, whichever is less.',
      'Weather Criterion: the residual GZ area up to the same limiting angle must show a margin of at least 40% against the wind heeling energy.'
    ],
    sources: [
      { label: 'IMO 2008 IS Code (MSC.267(85))', href: 'https://www.imo.org/en/publications' }
    ]
  },
  {
    title: 'International Grain Code — Grain Cargoes',
    rules: [
      'Corrected GM (GM_corr) ≥ 0.30 m (including free surface and grain shift corrections).',
      'The angle of heel due to grain shift must be θ ≤ 12°, or the deck edge immersion angle, whichever is less.',
      'The criteria in the approved Grain Loading Manual must be verified for every loading condition and the Document of Authorization (DOA) must be carried on board.'
    ],
    sources: [
      { label: 'International Grain Code', href: 'https://www.imo.org/en/publications' }
    ]
  },
  {
    title: 'SOLAS II‑1 — Probabilistic Damage Stability',
    rules: [
      'Probabilistic method: A = Σ(s × p), where s is the probability of survival after the damage and p is the probability of that damage occurring (depending on the length and position of the compartment).',
      'R is the "required" value given in the regulation\'s tables as a function of the ship\'s length.',
      'Criterion: A ≥ R must be satisfied; otherwise the subdivision/stability is considered inadequate.',
      'In the final damaged condition, including free surface and trim effects, the conditions for launching liferafts and for access must remain satisfied.',
      'The Damage Control Plan/Booklet must be on board; watertight doors, their remote controls and the sounding points must be shown on the plan.'
    ],
    sources: [
      { label: 'SOLAS 1974, Chapter II‑1', href: 'https://www.imo.org/en/publications' }
    ]
  },
  {
    title: 'Timber Deck Cargo Code — Deck Timber',
    rules: [
      'The stack height/slope and the securing arrangements (stanchions, wires, hoops) must be verified by MSL based calculations.',
      'Operating instructions for heavy weather: deck drainage, deck access and visibility conditions must be maintained.',
      'For the sample loading conditions an additional safety margin over the IS Code criteria must be maintained.'
    ],
    sources: [
      { label: '2011 Timber Deck Cargo Code', href: 'https://www.imo.org/en/publications' }
    ]
  },
  {
    title: 'IBC/IGC — Chemical and Gas Tankers',
    rules: [
      'The intact and damage stability requirements (survival capability) applicable to the cargo type must be satisfied.',
      'Every approved loading condition must be verified with the stability instrument; the model/verification certificates must be up to date.'
    ],
    extras: [
      {
        heading: 'Eklenebilecekler',
        items: [
          'Leakage scenarios: sensitivity analyses covering the free surface, KG change and heeling moment effects in the event of a cargo leak.',
          'Evaporation effects: methods that account for the effect of evaporation on mass/density and KG for volatile cargoes.'
        ]
      },
      {
        heading: 'Items Requiring Update',
        items: [
          'Cargo types: additional stability requirements to be added for new chemical and gas cargo types (in line with the latest IBC/IGC amendments).'
        ]
      }
    ],
    sources: [
      { label: 'IBC Code / IGC Code', href: 'https://www.imo.org/en/publications' }
    ]
  },
  {
    title: 'Polar Code — Polar Waters Operations',
    rules: [
      'The KG rise due to icing must be retained and an adequate GM and GZ margin maintained.',
      'The operational limitations and emergency procedures set out in the PWOM must be applied.'
    ],
    sources: [
      { label: 'Polar Code (MSC.385(94))', href: 'https://www.imo.org/en/publications' }
    ]
  },
  {
    title: 'CSS Code (Annex 13) — Values Underlying CSM Lashing Calculations',
    rules: [
      'Typical friction coefficients: steel/steel μ ≈ 0.10; steel/timber μ ≈ 0.30; timber/timber μ ≈ 0.40; rubber/steel μ ≈ 0.60 (assuming dry, grease-free surfaces).',
      'The MSL (Maximum Securing Load) and the acceleration factors (longitudinal, transverse, vertical) are selected from the Annex 13 tables according to the ship\'s length and service speed.'
    ],
    sources: [
      { label: 'CSS Code, Annex 13', href: 'https://www.imo.org/en/publications' }
    ]
  },
  {
    title: 'Stockholm Agreement — Ro‑Ro Passenger Ships (Regional Additional Requirements)',
    rules: [
      'Effect of water accumulation on the vehicle deck: typically taken into account with a water height of 0.50 m (according to the tables in the instrument) and an appropriate permeability.',
      'The condition A ≥ R must be maintained in the damage stability assessment including water accumulation; the liferaft/evacuation conditions must remain satisfied.'
    ],
    sources: [
      { label: 'Stockholm Agreement (Ro‑Ro Passenger Ships)', href: 'https://www.imo.org/en/publications' }
    ]
  },
  {
    title: 'Fishing Vessels — Safety Code (2005/2012) and the Cape Town Agreement',
    rules: [
      'The typical minimum initial GM (GM0) is ≥ 0.35 m (the Administration\'s instructions, which depend on length and design, govern).',
      'The GZ area criteria are largely consistent with the IS Code (e.g. 0°–30° ≥ 0.055 m·rad).',
      'An additional GM margin and operational limitations must be applied for low freeboard and icing risk.'
    ],
    sources: [
      { label: 'FAO/ILO/IMO Code of Safety for Fishermen & Fishing Vessels (2005/2012)', href: 'https://www.imo.org/en/publications' },
      { label: 'Cape Town Agreement (2012)', href: 'https://www.imo.org/en/OurWork/Safety/Pages/CTA.aspx' }
    ]
  },
  {
    title: 'OSV / SPS — Offshore Supply and Special Purpose Ships',
    rules: [
      'The IS Code criteria form the baseline; depending on the cargo and personnel density, Administrations generally require a minimum GM ≥ 0.15 m.',
      'Additional margins and operational limits are applied for cargo deck free surface and high KG effects.'
    ],
    sources: [
      { label: 'OSV Code (2006/2020)', href: 'https://www.imo.org/en/publications' },
      { label: 'SPS Code (2008)', href: 'https://www.imo.org/en/publications' }
    ]
  },
  {
    title: 'HSC Code — High Speed Craft',
    rules: [
      'Under the passenger crowding/turning test the static heel angle is typically limited to ≤ 10°.',
      'The minimum GM is ≥ 0.15 m in most configurations, but specific stability tests are applied depending on the speed, hull type and seakeeping requirements.'
    ],
    sources: [
      { label: 'HSC Code (1994/2000)', href: 'https://www.imo.org/en/publications' }
    ]
  },
  {
    title: 'MODU Code — Mobile Offshore Drilling Units',
    rules: [
      'Wind speeds: typically 36 m/s for the operating condition and an equivalent 51.5 m/s for the storm/survival condition; the heeling moment is taken accordingly.',
      'An adequate safety margin is demonstrated by comparing the righting and heeling moment curves; the range of positive stability and the air gap are checked.'
    ],
    sources: [
      { label: 'MODU Code (2009)', href: 'https://www.imo.org/en/publications' }
    ]
  },
  {
    title: 'Load Line (LL) — Links to the Load Line Convention',
    rules: [
      'The minimum freeboard and the integrity of hatches/superstructures, the downflooding angles and the possible paths of water ingress are limiting factors in the stability analysis.',
      'The downflooding angle in the stability booklet must be consistent with the ship\'s integrity conditions and must not conflict with the Load Line markings.'
    ],
    sources: [
      { label: 'International Load Line Convention (1966/1988)', href: 'https://www.imo.org/en/publications' }
    ]
  }
];

export default function StabilityRules() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [quizQuestions, setQuizQuestions] = useState(stabilityQuestions);

  const categories = getAllCategories();

  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  const handleBackToRules = () => {
    setShowQuiz(false);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setQuizQuestions(stabilityQuestions);
    } else {
      setQuizQuestions(getQuestionsByCategory(category));
    }
  };

  const handleRandomQuiz = () => {
    const randomQuestions = getRandomQuestions(10);
    setQuizQuestions(randomQuestions);
    setSelectedCategory('random');
    setShowQuiz(true);
  };

  const handleQuizComplete = (score: number, total: number) => {
    // Quiz tamamlandığında yapılacak işlemler
    console.log(`Quiz completed: ${score}/${total}`);
  };

  if (showQuiz) {
    return (
      <MobileLayout>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" className="gap-2" onClick={handleBackToRules}>
              Kurallara Dön
            </Button>
            <div className="text-sm text-muted-foreground">
              {selectedCategory === 'all' ? 'Tüm Sorular' : 
               selectedCategory === 'random' ? 'Rastgele Sorular' : 
               selectedCategory}
            </div>
          </div>
          
          <StabilityQuiz 
            questions={quizQuestions} 
            onComplete={handleQuizComplete}
          />
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="space-y-4">

        {/* Quiz Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" /> Stabilite Quiz
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Stabilite bilginizi test edin! Quiz'de otomatik geçiş yoktur, önceki ve sonraki butonları kullanarak kendi hızınızda ilerleyebilirsiniz.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Kategori seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tüm Sorular ({stabilityQuestions.length})</SelectItem>
                      {categories.map(category => {
                        const count = getQuestionsByCategory(category).length;
                        return (
                          <SelectItem key={category} value={category}>
                            {category} ({count})
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={handleStartQuiz} className="gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Quiz Başlat
                  </Button>
                  <Button variant="outline" onClick={handleRandomQuiz} className="gap-2">
                    <Shuffle className="h-4 w-4" />
                    Rastgele 10
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" /> Stabilite Kuralları (Özet ve Kaynakça)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {sections.map((sec) => (
                <div key={sec.title}>
                  <h3 className="text-lg font-semibold mb-2">{sec.title}</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    {sec.rules.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                  {sec.extras?.map((ex) => (
                    <div key={ex.heading} className="mt-2">
                      <div className="text-sm font-medium text-foreground">{ex.heading}</div>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        {ex.items.map((it, j) => (
                          <li key={j}>{it}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="text-xs mt-2">
                    Kaynaklar:{' '}
                    {sec.sources.map((s, i) => (
                      <span key={s.href}>
                        <a href={s.href} target="_blank" rel="noreferrer" className="underline">{s.label}</a>
                        {i < sec.sources.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <p className="text-xs text-muted-foreground">Not: Bu sayfa özet niteliğindedir. Nihai doğrulama için ilgili IMO kodlarının güncel onaylı baskılarına başvurunuz.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
}