import fs from 'node:fs';
const read = (name) => JSON.parse(fs.readFileSync(`public/locales/${name}`, 'utf8'));
const overrides = read('shared/terminology-overrides.json');
const fallbacks = {...read('shared/lesson-paragraphs.en.json'), ...read('shared/learning-guide.en.json')};
export const effectiveDictionary = (lang, dictionary) => ({...fallbacks,...dictionary,...(overrides[lang]??{})});
