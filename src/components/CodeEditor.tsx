import React from 'react';
import { FileCode, Sparkles, Loader } from 'lucide-react';

interface CodeEditorProps {
    code: string;
    setCode: (code: string) => void;
    handleAnalyzeCode: () => void;
    isLoadingAnalysis: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode, handleAnalyzeCode, isLoadingAnalysis }) => {
    return (
        <div className="bg-gba-dark-brown/60 p-6 rounded-xl shadow-2xl border border-gba-brown flex flex-col">
            <h2 className="text-xl font-press-start mb-4 flex items-center gap-2">
                <FileCode className="text-gba-gold" />
                Analizador de Código
            </h2>
            <div className="bg-gba-deep-brown rounded-lg p-1 border border-gba-brown flex-grow">
                <textarea
                    className="w-full h-full min-h-[250px] bg-transparent font-mono text-sm p-3 resize-y focus:outline-none focus:ring-2 focus:ring-gba-gold rounded-md"
                    value={code}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCode(e.target.value)}
                    spellCheck="false"
                ></textarea>
            </div>
            <button
                onClick={handleAnalyzeCode}
                disabled={isLoadingAnalysis}
                className="mt-4 w-full bg-gba-gold hover:bg-gba-light-gold text-gba-deep-brown font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:bg-gba-brown disabled:cursor-not-allowed transform hover:scale-105"
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
