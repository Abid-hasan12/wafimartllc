import React, { useState } from 'react';

const MaintenanceModal = () => {
    const [isOpen, setIsOpen] = useState(true);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Background Overlay with Blur */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"></div>

            {/* Modal Card */}
            <div className="relative w-full max-w-sm transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all animate-in fade-in zoom-in duration-300">

                {/* Top Decorative Bar */}
                <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>

                <div className="px-8 py-10 text-center">
                    {/* Close Button */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute right-4 top-6 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Animated Icon Container */}
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-4xl shadow-inner">
                        <span className="animate-bounce">🛠️</span>
                    </div>

                    {/* Content */}
                    <h2 className="mb-3 text-2xl font-extrabold text-slate-800 tracking-tight">
                        Work in Progress!
                    </h2>

                    <div className="space-y-3">
                        <p className="text-sm leading-relaxed text-slate-500">
                            Welcome to <span className="font-bold text-blue-600">WafiMart</span>. We are currently polishing some features to give you the best experience.
                        </p>
                        <div className="inline-block rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-600 border border-amber-100">
                            Beta Phase
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="mt-8 w-full transform rounded-xl bg-slate-900 py-4 font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-blue-600 active:scale-95"
                    >
                        Explore Anyway
                    </button>

                    <p className="mt-4 text-[10px] text-slate-400">
                        Press 'Esc' or click the button to close
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MaintenanceModal;