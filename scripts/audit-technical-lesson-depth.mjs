#!/usr/bin/env node
/**
 * Non-blocking editorial inventory of technical lesson depth.
 * Heuristic only: a lesson is NOT professionally validated simply because it is long.
 * Usage: npm run audit:technical-lessons
 */
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = "src";
const files = [];
function visit(dir) {
 for (const entry of fs.readdirSync(dir,{withFileTypes:true})) {
   const p=path.join(dir,entry.name);
   if (entry.isDirectory()) visit(p);
   else if (/TopicContents\.ts$|TopicsPage\.tsx$/.test(entry.name) || /src\/data\/shipSystems\/longform\/[^/]+\/\d+\.ts$/.test(p.replaceAll("\\","/"))) files.push(p);
 }
}
visit(root);
const findProp=(obj,k)=> obj.properties?.find(p=>ts.isPropertyAssignment(p) && (p.name.getText().replaceAll('"',"")===k));
const raw=node=>{
 if(!node)return "";
 if(ts.isStringLiteral(node)||ts.isNoSubstitutionTemplateLiteral(node))return node.text;
 if(ts.isTemplateExpression(node))return node.getText();
 return "";
};
const propText=(obj,k)=>raw(findProp(obj,k)?.initializer);
const readingWords=s=>(s.match(/[\p{L}\p{N}]+/gu)??[]).length;
const results=[];
for(const filename of files){
 const text=fs.readFileSync(filename,"utf8");
 const sf=ts.createSourceFile(filename,text,ts.ScriptTarget.Latest,true,filename.endsWith("tsx")?ts.ScriptKind.TSX:ts.ScriptKind.TS);
 function walk(node){
  if(ts.isObjectLiteralExpression(node)){
   const title=propText(node,"title");
   const introduction=propText(node,"introduction")||propText(node,"intro");
   const sections=findProp(node,"sections")?.initializer;
   const chapters=findProp(node,"chapters")?.initializer;
   const topContent=propText(node,"content");
   const sectionNodes=ts.isArrayLiteralExpression(sections)?sections.elements.filter(ts.isObjectLiteralExpression):[];
   const chapterNodes=ts.isArrayLiteralExpression(chapters)?chapters.elements.filter(ts.isObjectLiteralExpression):[];
   if(title && (introduction || topContent) && (sectionNodes.length>0 || chapterNodes.length>0 || topContent.length>0)){
    const sectionWords=sectionNodes.reduce((sum,x)=>sum+readingWords(propText(x,"content")),0);
    const chapterWords=chapterNodes.reduce((sum,ch)=>{
      const nested=findProp(ch,"sections")?.initializer;
      if(!ts.isArrayLiteralExpression(nested))return sum;
      return sum+nested.elements.filter(ts.isObjectLiteralExpression).reduce((n,x)=>{
        const ps=findProp(x,"paragraphs")?.initializer;
        const paragraphs=ts.isArrayLiteralExpression(ps)?ps.elements.map(raw).join(" "):"";
        return n+readingWords(paragraphs);
      },0);
    },0);
    const wordCount=readingWords(introduction)+readingWords(topContent)+sectionWords+chapterWords;
    const visualCount=(findProp(node,"image")||findProp(node,"figure")?1:0) + sectionNodes.filter(x=>findProp(x,"image")||findProp(x,"figure")).length + chapterNodes.reduce((n,ch)=>{
      const nested=findProp(ch,"sections")?.initializer;
      return n+(ts.isArrayLiteralExpression(nested)?nested.elements.filter(x=>ts.isObjectLiteralExpression(x)&&!!findProp(x,"illustration")).length:0);
    },0);
    const referenceCount=(text.slice(node.getStart(),node.getEnd()).match(/MSC\.|SOLAS|IMO|STCW|MARPOL|IEC|ITU|IAMSAR/g)??[]).length;
    results.push({file:filename,title,wordCount,visualCount,referenceMentions:referenceCount,flags:[
      ...(wordCount<180?["short-text"]:[]),
      ...(visualCount===0?["no-visual"]:[]),
      ...(referenceCount===0?["no-standard-mentioned"]:[]),
    ]});
    return; // Don't double-count chapter/section child objects within a topic.
   }
  }
  ts.forEachChild(node,walk);
 }
 walk(sf);
}
const low=results.filter(x=>x.flags.length>=2).sort((a,b)=>a.wordCount-b.wordCount);
const summary={files:files.length,topics:results.length,short:results.filter(x=>x.flags.includes("short-text")).length,withoutVisual:results.filter(x=>x.flags.includes("no-visual")).length,flagged:low.length};
console.log("Technical lesson inventory (heuristic; human verification required):");
console.log(JSON.stringify(summary,null,2));
console.table(low.slice(0,30).map(({file,title,wordCount,visualCount,flags})=>({file,title,wordCount,visualCount,flags:flags.join(",")})));
if(process.argv.includes("--json"))console.log(JSON.stringify({summary,results},null,2));
// This inventory deliberately does not fail existing curriculum builds.
