import { useRef, useCallback } from 'react';
import Editor, { OnMount, OnChange, Monaco } from '@monaco-editor/react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  readOnly?: boolean;
  height?: string;
}

// Maritime code snippets for auto-complete
type MonacoEditor = Parameters<OnMount>[0];

const MARITIME_SNIPPETS = [
  {
    label: 'gm-calculation',
    insertText: `const calculateGM = (KM: number, KG: number): number => {
  return KM - KG;
};`,
    documentation: 'GM = KM - KG (Metacentric Height)',
  },
  {
    label: 'gz-calculation',
    insertText: `const calculateGZ = (GM: number, heelAngle: number): number => {
  return GM * Math.sin(heelAngle * Math.PI / 180);
};`,
    documentation: 'GZ = GM × sin(θ) (Righting Lever)',
  },
  {
    label: 'great-circle-distance',
    insertText: `const calculateGreatCircleDistance = (
  lat1: number, lon1: number, 
  lat2: number, lon2: number
): number => {
  const toRad = (deg: number) => deg * Math.PI / 180;
  const dLon = toRad(lon2 - lon1);
  const distance = Math.acos(
    Math.sin(toRad(lat1)) * Math.sin(toRad(lat2)) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLon)
  );
  return distance * 60 * (180 / Math.PI); // nautical miles
};`,
    documentation: 'Great Circle Distance calculation in nautical miles',
  },
  {
    label: 'tpc-calculation',
    insertText: `const calculateTPC = (waterplaneArea: number, density: number = 1.025): number => {
  return (waterplaneArea * density) / 100;
};`,
    documentation: 'TPC = (Awl × ρ) / 100 (Tonnes Per Centimetre)',
  },
  {
    label: 'recharts-line',
    insertText: `<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} />
  </LineChart>
</ResponsiveContainer>`,
    documentation: 'Recharts Line Chart template',
  },
  {
    label: 'motion-card',
    insertText: `<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <Card>
    <CardHeader>
      <CardTitle>Title</CardTitle>
    </CardHeader>
    <CardContent>
      Content here
    </CardContent>
  </Card>
</motion.div>`,
    documentation: 'Animated Card with Framer Motion',
  },
];

export function CodeEditor({ 
  value, 
  onChange, 
  language = 'typescript', 
  readOnly = false,
  height = '400px' 
}: CodeEditorProps) {
  const editorRef = useRef<MonacoEditor | null>(null);

  const handleMount: OnMount = useCallback((editor: MonacoEditor, monaco: Monaco) => {
    editorRef.current = editor;

    // Register maritime snippets
    monaco.languages.registerCompletionItemProvider('typescript', {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        const suggestions = MARITIME_SNIPPETS.map(snippet => ({
          label: snippet.label,
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: snippet.insertText,
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: snippet.documentation,
          range,
        }));

        return { suggestions };
      },
    });

    // Set editor options
    editor.updateOptions({
      fontSize: 14,
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      minimap: { enabled: true },
      lineNumbers: 'on',
      wordWrap: 'on',
      automaticLayout: true,
      tabSize: 2,
      scrollBeyondLastLine: false,
      smoothScrolling: true,
      cursorBlinking: 'smooth',
      cursorSmoothCaretAnimation: 'on',
    });
  }, []);

  const handleChange: OnChange = useCallback((newValue) => {
    if (newValue !== undefined) {
      onChange(newValue);
    }
  }, [onChange]);

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={handleChange}
        onMount={handleMount}
        theme="vs-dark"
        options={{
          readOnly,
          domReadOnly: readOnly,
        }}
        loading={
          <div className="flex items-center justify-center h-full bg-background">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        }
      />
    </div>
  );
}
