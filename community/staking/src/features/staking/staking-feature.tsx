'use client'

import { assertIsAddress } from 'gill'
import { useMemo } from 'react'
import { AppHero } from '@/components/app-hero'
import { useSolana } from '@/components/solana/use-solana'
import { StakingUI } from './ui/staking-ui'

export default function StakingFeature() {
  const { account } = useSolana()

  const address = useMemo(() => {
    if (!account?.address) {
      return
    }
    assertIsAddress(account.address)
    return account.address
  }, [account])

  if (!address || !account) {
    return (
      <AppHero title="Staking" subtitle="Connect your wallet to start staking" />
    )
  }

  return (
    <div>
      <AppHero title="Staking" subtitle="Stake or unstake your tokens" />
      <div className="flex justify-center">
        <div className="w-full max-w-5xl">
          <StakingUI account={account} address={address} />
        </div>
      </div>
    </div>
  )
}
