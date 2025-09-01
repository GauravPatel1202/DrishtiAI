import React from 'react';
import { X } from 'lucide-react';

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
                    <div className="qr-code w-32 h-32 bg-white p-3 rounded-xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                        <div className="qr-code-inner w-full h-full grid grid-cols-11 grid-rows-11 gap-0.5">
                            {/* Simplified QR pattern for better aesthetics */}
                            {[
                                "1/1/4/4", "1/9/4/12", "9/1/12/4", "2/3/3/4", "3/2/4/3",
                                "4/5/5/8", "5/4/8/5", "5/8/8/9", "8/5/9/8", "9/6/10/7", "10/5/11/6"
                            ].map((area, index) => (
                                <div
                                    key={index}
                                    className="qr-cell bg-black"
                                    style={{ gridArea: area }}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>

                <p className="mt-3 text-xs text-gray-400 text-center">
                    Scan the QR code to donate securely.
                </p>
            </div>
        </div>
    );
};
