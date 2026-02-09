import React from 'react';

const NotificationBanner: React.FC = () => {
    return (
        <div className="bg-gba-yellow text-gba-deep-brown px-4 py-2 text-center text-sm font-vt323 border-b border-gba-gold/30">
            <p className="flex items-center justify-center gap-2">
                <span className="text-lg">⚠️</span>
                <span>
                    <span className="font-bold">Nota:</span> Elder Wizz tiene desactivado el uso de la API de pago, porque la web es una demo.
                </span>
            </p>
        </div>
    );
};

export default NotificationBanner;
