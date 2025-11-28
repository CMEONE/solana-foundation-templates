import React from 'react'

export default function PoolStatsPage() {
    // Mock data
    const poolStats = {
        totalStaked: 150000,
        apy: 5.8,
        totalValidators: 120,
        epoch: 420,
    }

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <h1 className="text-3xl font-bold mb-8">Pool Statistics</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="border border-gray-800 p-6 rounded-lg">
                    <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2">Total Staked</h3>
                    <div className="text-2xl font-mono font-bold">{poolStats.totalStaked.toLocaleString()} SOL</div>
                </div>

                <div className="border border-gray-800 p-6 rounded-lg">
                    <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2">APY</h3>
                    <div className="text-2xl font-mono font-bold text-green-400">{poolStats.apy}%</div>
                </div>

                <div className="border border-gray-800 p-6 rounded-lg">
                    <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2">Validators</h3>
                    <div className="text-2xl font-mono font-bold">{poolStats.totalValidators}</div>
                </div>

                <div className="border border-gray-800 p-6 rounded-lg">
                    <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2">Current Epoch</h3>
                    <div className="text-2xl font-mono font-bold text-blue-400">{poolStats.epoch}</div>
                </div>
            </div>

            <div className="mt-12 border border-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 text-gray-300">Pool Performance</h2>
                <div className="h-64 flex items-center justify-center border border-dashed border-gray-800 rounded bg-gray-900/50">
                    <p className="text-gray-500">Chart placeholder</p>
                </div>
            </div>
        </div>
    )
}
