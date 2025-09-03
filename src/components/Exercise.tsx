import React from 'react';
import { Loader } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';

interface ExerciseProps {
    dailyExercise: string;
    isLoadingExercise: boolean;
    handleGenerateExercise: (difficulty: 'aprendizaje' | 'intermedio' | 'avanzado') => void;
}

const Exercise: React.FC<ExerciseProps> = ({ dailyExercise, isLoadingExercise, handleGenerateExercise }) => {
    return (
        <div className="mt-12 bg-gba-dark-brown/60 p-6 rounded-xl shadow-2xl border border-gba-brown">
            <h2 className="text-xl font-press-start mb-4">
                Tu Ejercicio del Día
            </h2>
            <div className="flex flex-wrap gap-4 mb-6">
                <button onClick={() => handleGenerateExercise('aprendizaje')} className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-5 rounded-lg transition-colors transform hover:scale-105">Aprendizaje</button>
                <button onClick={() => handleGenerateExercise('intermedio')} className="bg-yellow-600 hover:bg-yellow-500 text-white font-semibold py-2 px-5 rounded-lg transition-colors transform hover:scale-105">Intermedio</button>
                <button onClick={() => handleGenerateExercise('avanzado')} className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-5 rounded-lg transition-colors transform hover:scale-105">Avanzado</button>
            </div>
            <div className="bg-gba-deep-brown/70 rounded-lg p-4 min-h-[200px]">
                {isLoadingExercise ? (
                    <div className="flex items-center justify-center h-full text-gba-yellow"><Loader className="animate-spin w-8 h-8 mr-3" /> Generando tu desafío...</div>
                ) : !dailyExercise ? (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gba-brown"><p>¡Selecciona una dificultad para comenzar!</p></div>
                ) : (
                    <MarkdownRenderer content={dailyExercise} />
                )}
            </div>
        </div>
    );
};

export default Exercise;
