import React from 'react';

// --- Component Props ---

interface MarkdownRendererProps {
    content: string;
}

// --- Simple markdown to HTML renderer ---
const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    if (!content) return null;
    
    // Basic replacements for demonstration. A library like 'react-markdown' is better for production.
    const html = content
        .replace(/### (.*)/g, '<h3 class="text-lg font-semibold text-gba-light-gold mt-4 mb-2">$1</h3>')
        .replace(/## (.*)/g, '<h2 class="text-xl font-bold text-gba-gold mt-6 mb-3">$1</h2>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/- (.*)/g, '<li class="ml-5 list-disc">$1</li>')
        .replace(/`([^`]+)`/g, '<code class="bg-gba-dark-brown text-gba-light-yellow rounded px-1 py-0.5 text-sm">$1</code>')
        .replace(/\n/g, '<br />');

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default MarkdownRenderer;
