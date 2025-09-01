import React from 'react';
import { X } from 'lucide-react';
import PaymentQR from './qr';

// --- Donation Popup Component ---
export const DonationPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-60 z-50">
            <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl max-w-sm w-full relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 p-1 rounded-md text-gray-400 hover:text-white"
                >
                    <X className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-semibold mb-3 text-center text-white">
                    Support Our Project ❤️
                </h2>
                <p className="text-gray-300 text-sm mb-4 text-center">
                    This app is free to use. If you find it useful, please consider donating to support ongoing development.
                </p>
                <div className="flex justify-center">
                    {PaymentQR()}
                </div>

                <p className="mt-3 text-xs text-gray-400 text-center">
                    Scan the QR code to donate securely.
                </p>
            </div>
        </div>
    );
};
