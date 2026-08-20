import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, MessageCircle, Loader2, Wand2, Shield, Ruler, Copy, ClipboardPaste } from "lucide-react";
import { callMaritimeRegulationsAssistant, type AIMessage } from "@/services/aiClient";
import { HydrostaticCalculations } from "@/services/hydrostaticCalculations";
import type { ShipGeometry } from "@/types/hydrostatic";
import { useToast } from "@/hooks/use-toast";
import { stripMarkdown } from "@/utils/cleanText";
import { ReportAiContentButton } from "@/components/ai/ReportAiContentButton";

 type AssistantMode = 'idle' | 'gm' | 'tpc' | 'imo';
 
 export default function StabilityAssistantPopup({ variant = 'floating' as 'floating' | 'inline' }){
   const [open, setOpen] = useState(false);
   const [input, setInput] = useState("");
   const [busy, setBusy] = useState(false);
   const [messages, setMessages] = useState<AIMessage[]>([]);
   const [mode, setMode] = useState<AssistantMode>('idle');
   const { toast } = useToast();

   // GM form state
   const [gmKB, setGmKB] = useState<string>("");
   const [gmBM, setGmBM] = useState<string>("");
   const [gmKG, setGmKG] = useState<string>("");
   const [approxL, setApproxL] = useState<string>("");
   const [approxB, setApproxB] = useState<string>("");
   const [approxT, setApproxT] = useState<string>("");

   // TPC form state
   const [tpcAwp, setTpcAwp] = useState<string>("");
   const [tpcRho, setTpcRho] = useState<string>("1.025");

   // IMO form state
   const [shipType, setShipType] = useState<string>("Cargo");
   const [kg, setKg] = useState<string>("5.0");
   const [geo, setGeo] = useState<ShipGeometry>({
     length: 100, breadth: 20, depth: 10, draft: 6,
     blockCoefficient: 0.7, waterplaneCoefficient: 0.8,
     midshipCoefficient: 0.9, prismaticCoefficient: 0.65, verticalPrismaticCoefficient: 0.75
   });

   // Memory: persist chat
   useEffect(()=>{
     const saved = localStorage.getItem('stabilityAssistantChat');
     if (saved) {
       try { setMessages(JSON.parse(saved)); } catch {
         // Corrupt or legacy local data is ignored; the assistant starts fresh.
       }
     } else {
       setMessages([{ role: 'assistant', content: 'Need something? For example: "I want to make a GM account" or use the quick buttons.' }]);
     }
   },[]);
   useEffect(()=>{
     try { localStorage.setItem('stabilityAssistantChat', JSON.stringify(messages)); } catch {
       // Storage can be unavailable in privacy mode; chat remains usable in memory.
     }
   },[messages]);

   const appendAssistant = (text: string) => setMessages(prev=> [...prev, { role: 'assistant', content: text }]);
   const appendUser = (text: string) => setMessages(prev=> [...prev, { role: 'user', content: text }]);

   const send = async () => {
     if (!input.trim()) return;
     const userText = input.trim();
     setInput("");
     appendUser(userText);
     setBusy(true);
     const reply = await callMaritimeRegulationsAssistant([...messages, { role: 'user', content: userText }]);
     appendAssistant(reply);
     setBusy(false);
   };

   // Clipboard helpers
   const copyText = async (text: string) => {
     try {
       await navigator.clipboard.writeText(text);
       toast({ title: 'Copied', description: 'The text has been copied to the clipboard.' });
     } catch (e) {
       toast({ title: 'Copy failed', description: 'Check browser permissions.', variant: 'destructive' });
     }
   };
   const pasteIntoInput = async () => {
     try {
       const t = await navigator.clipboard.readText();
       setInput(prev => prev ? `${prev}${prev.endsWith(' ') ? '' : ' '}${t}` : t);
     } catch (e) {
       toast({ title: 'Paste failed', description: 'Clipboard access permission may be required.', variant: 'destructive' });
     }
   };
   const lastAssistant = () => {
     for (let i = messages.length - 1; i >= 0; i--) {
       if (messages[i].role === 'assistant') return messages[i].content;
     }
     return '';
   };

   // Guided flows
   const startGM = () => {
     setMode('gm');
     appendAssistant('Enter KB, BM, KG values for GM account. If not, we can proceed with the assumptions L, B, T and KB≈T/2 and BM≈B²/(12T).');
   };
   const computeGM = () => {
     let kb = parseFloat(gmKB);
     let bm = parseFloat(gmBM);
     const kgVal = parseFloat(gmKG);
     if (isNaN(kgVal)) { appendAssistant('KG (m) girin.'); return; }
     if (Number.isNaN(kb) || Number.isNaN(bm)) {
       const L = parseFloat(approxL), B = parseFloat(approxB), T = parseFloat(approxT);
       if ([L,B,T].some(isNaN)) { appendAssistant('If KB/BM is not available, L, B, T values are required for approx.'); return; }
       kb = T/2; bm = (B*B)/(12*T);
     }
     const gm = kb + bm - kgVal;
     appendAssistant(`GM ≈ ${gm.toFixed(3)} m (KB=${(kb||0).toFixed(2)}, BM=${(bm||0).toFixed(2)}, KG=${kgVal.toFixed(2)})`);
   };

   const startTPC = () => {
     setMode('tpc');
     appendAssistant('TPC = Awp × ρ / 100. Please enter Awp (m²) and water density (ρ, tonnes/m³).');
   };
   const computeTPC = () => {
     const awp = parseFloat(tpcAwp);
     const rho = parseFloat(tpcRho);
     if ([awp, rho].some(isNaN)) { appendAssistant('Enter valid Awp and ρ.'); return; }
     const tpc = (awp * rho) / 100;
     appendAssistant(`TPC ≈ ${tpc.toFixed(2)} ton/cm (Awp=${awp}, ρ=${rho})`);
   };

   const startIMO = () => {
     setMode('imo');
     appendAssistant('Ship geometry and QA are required for IMO control. Enter the values and press Control.');
   };
   const computeIMO = () => {
     const kgNum = parseFloat(kg);
     if (isNaN(kgNum)) { appendAssistant('KG (m) girin.'); return; }
     const analysis = HydrostaticCalculations.performStabilityAnalysis(geo, kgNum, [], []);
     const imo = analysis.imoCriteria;
     const ok = imo?.compliance;
     const lines = [
       `Uygunluk: ${ok? 'Suitable' : 'not suitable'}`,
       `Alan(0–30°): ${imo.area0to30.toFixed(3)} mrad (≥0.055)`,
       `Alan(0–40°): ${imo.area0to40.toFixed(3)} mrad (≥0.09)`,
       `Max GZ: ${imo.maxGz.toFixed(3)} m (≥0.20)`,
       `Starting GM: ${imo.initialGM.toFixed(3)} m (≥0.15)`,
       `Weather criterion: ${imo.weatherCriterion? 'Provided' : 'Not provided'}`
     ];
     appendAssistant(lines.join('\n'));
   };

   return (
     <div>
       <div className={variant==='floating' ? "fixed bottom-4 right-4 z-40" : "relative z-0"}>
         <Dialog open={open} onOpenChange={setOpen}>
           <DialogTrigger asChild>
             {variant==='floating' ? (
               <Button className="rounded-full h-12 w-12 p-0 shadow-lg" title="Stability Assistant">
                 <Brain className="h-5 w-5" />
               </Button>
             ) : (
               <Button variant="outline" className="gap-2"><Brain className="h-4 w-4" /> Stability Assistant</Button>
             )}
           </DialogTrigger>
           <DialogContent className="left-0 top-0 translate-x-0 translate-y-0 max-w-none w-screen h-screen sm:rounded-none p-0">
             <div className="flex flex-col h-full">
               <div className="border-b p-4">
                 <DialogHeader>
                   <DialogTitle className="flex items-center gap-2"><MessageCircle className="h-4 w-4" /></DialogTitle>
                 </DialogHeader>
               </div>
               <div className="flex-1 overflow-auto p-4">
                 {/* Quick intents */}
                 <div className="flex flex-wrap gap-2 mb-3">
                   <Button variant={mode==='gm'? 'default':'outline'} size="sm" onClick={startGM}><Wand2 className="h-4 w-4 mr-1" /> GM</Button>
                   <Button variant={mode==='tpc'? 'default':'outline'} size="sm" onClick={startTPC}><Ruler className="h-4 w-4 mr-1" /> TPC</Button>
                   <Button variant={mode==='imo'? 'default':'outline'} size="sm" onClick={startIMO}><Shield className="h-4 w-4 mr-1" /> IMO</Button>
                 </div>

                 {/* Chat window */}
                 <div className="border rounded p-2 h-[50vh] bg-muted">
                   <ScrollArea className="h-full pr-2">
                     <div className="space-y-2">
                       {messages.map((m, i)=> (
                         <div key={i} className={`text-sm ${m.role==='user'?'text-right':''}`}>
                           <div className={`inline-flex items-center gap-2`}>
                             <div className={`inline-block px-2 py-1 rounded ${m.role==='user'?'bg-blue-600 text-white':'bg-card border border-border'}`}>{stripMarkdown(m.content)}</div>
                             <button aria-label="Kopyala" onClick={()=> copyText(m.content)} className="text-xs text-muted-foreground hover:text-foreground">
                               <Copy className="h-3 w-3" />
                             </button>
                             {m.role !== 'user' && (
                               <ReportAiContentButton
                                 surface="stability_assistant"
                                 content={m.content}
                                 prompt={messages[i-1]?.role === 'user' ? messages[i-1].content : undefined}
                               />
                             )}
                           </div>
                         </div>
                       ))}
                     </div>
                   </ScrollArea>
                 </div>

                 {/* Guided forms */}
                 {mode==='gm' && (
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3 items-end">
                     <div><Label>KB (m)</Label><Input value={gmKB} onChange={(e)=> setGmKB(e.target.value)} /></div>
                     <div><Label>BM (m)</Label><Input value={gmBM} onChange={(e)=> setGmBM(e.target.value)} /></div>
                     <div><Label>KG (m)</Label><Input value={gmKG} onChange={(e)=> setGmKG(e.target.value)} /></div>
                     <div className="md:col-span-3 text-xs text-muted-foreground">Or enter L,B,T for approximately:</div>
                     <div><Label>L(m)</Label><Input value={approxL} onChange={(e)=> setApproxL(e.target.value)} /></div>
                     <div><Label>B(m)</Label><Input value={approxB} onChange={(e)=> setApproxB(e.target.value)} /></div>
                     <div><Label>Water Draft (m)</Label><Input value={approxT} onChange={(e)=> setApproxT(e.target.value)} /></div>
                     <div className="md:col-span-3"><Button onClick={computeGM}>Calculate</Button></div>
                   </div>
                 )}

                 {mode==='tpc' && (
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3 items-end">
                     <div><Label>Awp (m²)</Label><Input value={tpcAwp} onChange={(e)=> setTpcAwp(e.target.value)} /></div>
                     <div><Label>ρ (ton/m³)</Label><Input value={tpcRho} onChange={(e)=> setTpcRho(e.target.value)} /></div>
                     <div><Button onClick={computeTPC}>Calculate</Button></div>
                   </div>
                 )}

                 {mode==='imo' && (
                   <div className="space-y-2 mt-3">
                     <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-sm">
                       <div><Label>L</Label><Input value={geo.length} onChange={(e)=> setGeo({...geo, length: parseFloat(e.target.value)})} /></div>
                       <div><Label>B</Label><Input value={geo.breadth} onChange={(e)=> setGeo({...geo, breadth: parseFloat(e.target.value)})} /></div>
                       <div><Label>D</Label><Input value={geo.depth} onChange={(e)=> setGeo({...geo, depth: parseFloat(e.target.value)})} /></div>
                       <div><Label>T</Label><Input value={geo.draft} onChange={(e)=> setGeo({...geo, draft: parseFloat(e.target.value)})} /></div>
                       <div><Label>C b</Label><Input value={geo.blockCoefficient} onChange={(e)=> setGeo({...geo, blockCoefficient: parseFloat(e.target.value)})} /></div>
                       <div><Label>KG</Label><Input value={kg} onChange={(e)=> setKg(e.target.value)} /></div>
                     </div>
                     <Button onClick={computeIMO}><Shield className="h-4 w-4 mr-1" /> Control</Button>
                   </div>
                 )}

                 {/* Freeform input */}
                 <div className="flex gap-2 items-end mt-3">
                   <Textarea value={input} onChange={(e)=> setInput(e.target.value)} placeholder="Ex: I want to make a GM account" className="min-h-[60px]" />
                   <div className="flex flex-col gap-2">
                     <Button variant="outline" size="sm" onClick={pasteIntoInput} className="gap-1"><ClipboardPaste className="h-4 w-4" /> paste</Button>
                     <Button variant="outline" size="sm" onClick={()=> copyText(lastAssistant())} disabled={!lastAssistant()} className="gap-1"><Copy className="h-4 w-4" /> Copy Last Answer</Button>
                   </div>
                   <Button onClick={send} disabled={busy}>{busy? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send'}</Button>
                 </div>
               </div>
             </div>
           </DialogContent>
         </Dialog>
       </div>
     </div>
   );
 }
