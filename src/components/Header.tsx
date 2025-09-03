import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-gba-dark-brown/50 backdrop-blur-sm border-b border-gba-gold/20 shadow-lg sticky top-0 z-10">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <img src="/elderwizzai.png" alt="Elder Wizz AI Logo" className="w-10 h-10" />
                    <h1 className="text-2xl font-press-start text-white tracking-wider">
                        Elder<span className="text-gba-gold">Wizz</span> AI
                    </h1>
                </div>
                <a href="https://github.com/JavGarin/elder-wizz-ai" target="_blank" rel="noopener noreferrer" className="text-xs text-gba-yellow hover:text-gba-gold transition-colors">
                    GitHub
                </a>
            </div>
        </header>
    );
};

export default Header;
