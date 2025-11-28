'use client'

import React, { useMemo } from 'react'
import { useWalletUi } from '@wallet-ui/react'
import { useGetStakeAccountsQuery } from '@/features/staking/data-access/use-get-stake-accounts-query'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'

export default function DashboardPage() {
    const { wallet, account } = useWalletUi()
    const address = account?.address

    const stakeAccountsQuery = useGetStakeAccountsQuery({ address: address ?? '' })

    const activeStakes = useMemo(() => {
        if (!stakeAccountsQuery.data) return []
        return stakeAccountsQuery.data.filter(acc => acc.state === 'delegated' || acc.state === 'initialized')
    }, [stakeAccountsQuery.data])

    const totalStaked = useMemo(() => {
        return activeStakes.reduce((acc, curr) => acc + (parseInt(curr.lamports) || 0), 0) / 1000000000
    }, [activeStakes])

    const handleClaimRewards = () => {
        toast.info("Native staking rewards are automatically compounded into your stake account.")
    }

    if (!account) {
        return (
            <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
                <p>Please connect your wallet to view the dashboard.</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">User Dashboard</h1>
                <Button onClick={handleClaimRewards} className="bg-green-600 hover:bg-green-700 text-white">
                    Claim Rewards
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Active Stakes Section */}
                <div className="border border-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4 text-gray-300">Active Stakes</h2>
                    {stakeAccountsQuery.isLoading ? (
                        <p className="text-gray-500">Loading stakes...</p>
                    ) : activeStakes.length > 0 ? (
                        <ul className="space-y-4">
                            {activeStakes.map((stake) => (
                                <li key={stake.pubkey.toString()} className="flex justify-between items-center border-b border-gray-900 pb-2">
                                    <div>
                                        <div className="font-medium truncate w-32" title={stake.voter}>{stake.voter ? `Validator...${stake.voter.slice(0, 4)}` : 'Unknown Validator'}</div>
                                        <div className="text-sm text-gray-500 capitalize">{stake.state}</div>
                                    </div>
                                    <div className="font-mono">{(parseInt(stake.lamports) / 1000000000).toFixed(4)} SOL</div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No active stakes found.</p>
                    )}
                </div>

                {/* Earned Rewards Section */}
                <div className="border border-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4 text-gray-300">Total Staked Value</h2>
                    <div className="text-4xl font-bold font-mono text-green-400">
                        {totalStaked.toFixed(4)} SOL
                    </div>
                    <p className="text-gray-500 mt-2">Total value of active stakes.</p>
                    <div className="mt-4 p-4 bg-gray-900 rounded text-sm text-gray-400">
                        Note: Native rewards are auto-compounded.
                    </div>
                </div>
            </div>
        </div>
    )
}
