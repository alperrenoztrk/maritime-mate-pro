import fs from 'node:fs';
const input='scripts/i18n/verified/terminology-completion.json', output='public/locales/shared/terminology-overrides.json';
const result={};
for(const [source,entry] of Object.entries(JSON.parse(fs.readFileSync(input,'utf8')))) for(const [lang,value] of Object.entries(entry)) {
  if(lang==='fill') continue;
  if(typeof value!=='string'||!value.trim()) throw new Error(`Invalid repair: ${source}`);
  (result[lang]??={})[source]=value;
}
const content=JSON.stringify(result)+'\n';
if(process.argv.includes('--check')) {if(fs.readFileSync(output,'utf8')!==content) throw new Error('Terminology overrides are stale');} else fs.writeFileSync(output,content);
console.log('Reviewed terminology overrides:',Object.values(result).reduce((n,entries)=>n+Object.keys(entries).length,0));
