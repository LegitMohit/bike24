import React from 'react';
import PageHeader from '../components/PageHeader';
import { HiHome, HiPlus, HiChartBar, HiUser } from 'react-icons/hi2';
import submissions from '../data/submissions.json';

const Home = () => {

    return (
        <div className="flex flex-col h-screen bg-gray-50 overflow-hidden relative">
            {/* Header */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[450px] z-50">
                <PageHeader title="My Bikes" subtitle="BikeAuction" />
            </div>

            <div className="flex-1 overflow-y-auto px-5 pt-24 pb-[160px] flex flex-col gap-6">
                {/* Greeting Card */}
                <div className="bg-white p-5 rounded-3xl border border-blue-100 shadow-sm flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
                            Hello, Raj! <span className="animate-bounce">👋</span>
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">Ready to sell your bike?</p>
                    </div>
                    <button className="bg-primary-blue text-white px-4 py-2.5 rounded-2xl font-bold text-sm flex items-center gap-1 shadow-md hover:bg-blue-600 transition-colors">
                        Sell Now <HiPlus className="text-lg" />
                    </button>
                </div>

                {/* Submissions Section */}
                <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-1">
                        My Submissions
                    </h3>

                    <div className="flex flex-col gap-4">
                        {submissions.map((bike) => (
                            <div key={bike.id} className={`${bike.cardBg} p-5 rounded-3xl border shadow-sm hover:shadow-md transition-shadow`}>
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-gray-800 text-lg">
                                        {bike.name} {bike.year && <span className="text-gray-400 font-medium mx-1">•</span>} {bike.year}
                                    </h4>
                                </div>
                                <p className="text-sm text-gray-400 font-medium">{bike.info}</p>
                                <p className={`text-sm font-bold mb-4 ${bike.statusColor.split(' ')[0]}`}>
                                    {bike.bid ? `Current Bid: Rs. ${bike.bid}` : 'Awaiting first bid'}
                                </p>
                                <div className={`inline-block px-4 py-1.5 rounded-xl border text-[11px] font-bold tracking-wide ${bike.statusColor}`}>
                                    {bike.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[450px] bg-white border-t border-gray-100 px-6 py-4 flex justify-between items-center rounded-t-[32px] shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-50">
                <div className="flex flex-col items-center gap-1 group cursor-pointer">
                    <div className="p-2.5 bg-blue-50 rounded-2xl text-primary-blue transition-all duration-300 group-hover:scale-110">
                        <HiHome className="text-2xl" />
                    </div>
                    <span className="text-[10px] font-bold text-primary-blue">Home</span>
                </div>

                <div className="flex flex-col items-center gap-1 group cursor-pointer text-gray-300">
                    <div className="p-2.5 bg-gray-50 rounded-2xl transition-all duration-300 group-hover:bg-blue-50 group-hover:text-primary-blue">
                        <HiPlus className="text-2xl" />
                    </div>
                    <span className="text-[10px] font-bold">Sell</span>
                </div>

                <div className="flex flex-col items-center gap-1 group cursor-pointer text-gray-300">
                    <div className="p-2.5 bg-gray-50 rounded-2xl transition-all duration-300 group-hover:bg-blue-50 group-hover:text-primary-blue">
                        <HiChartBar className="text-2xl" />
                    </div>
                    <span className="text-[10px] font-bold">Status</span>
                </div>

                <div className="flex flex-col items-center gap-1 group cursor-pointer text-gray-300">
                    <div className="p-2.5 bg-gray-50 rounded-2xl transition-all duration-300 group-hover:bg-blue-50 group-hover:text-primary-blue">
                        <HiUser className="text-2xl" />
                    </div>
                    <span className="text-[10px] font-bold">Profile</span>
                </div>
            </div>
        </div>
    );
};

export default Home;
