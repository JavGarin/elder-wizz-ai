
import React from 'react';
import { FileCode, Sparkles, Loader } from 'lucide-react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
// Add specific language support if needed
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

interface CodeEditorProps {
    code: string;
    setCode: (code: string) => void;
    handleAnalyzeCode: () => void;
    isLoadingAnalysis: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode, handleAnalyzeCode, isLoadingAnalysis }) => {
    return (
        <div className="bg-gba-dark-brown/60 p-6 rounded-xl shadow-2xl border border-gba-brown flex flex-col h-[500px]">
             <h2 className="text-xl font-press-start mb-4 flex items-center gap-2">
                <FileCode className="text-gba-gold" />
                Analizador de Código
            </h2>
            <div className="bg-gba-deep-brown rounded-lg border border-gba-brown flex-grow overflow-auto relative font-mono text-sm">
                
                <Editor
                    value={code}
                    onValueChange={code => setCode(code)}
                    highlight={code => highlight(code, languages.js, 'javascript')}
                    padding={15}
                    className="font-mono min-h-full"
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 14,
                        backgroundColor: "transparent",
                        color: "#f8f8f2", // Ensure text is visible on dark bg
                    }}
                    textareaClassName="focus:outline-none"
                    preClassName="bg-transparent!" // Override Prism background
                />
            </div>
            <button
                onClick={handleAnalyzeCode}
                disabled={isLoadingAnalysis}
                className="mt-4 w-full bg-gba-gold hover:bg-gba-light-gold text-gba-deep-brown font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:bg-gba-brown disabled:cursor-not-allowed transform hover:scale-105 shadow-md active:scale-95"
            >
                {isLoadingAnalysis ? (
                    <><Loader className="animate-spin w-5 h-5" /> Analizando...</>
                ) : (
                    <><Sparkles className="w-5 h-5" /> Analizar Buenas Prácticas</>
                )}
            </button>
        </div>
    );
};

export default CodeEditor;
