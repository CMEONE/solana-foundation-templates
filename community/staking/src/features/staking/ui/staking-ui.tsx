'use client'

import { Address } from 'gill'
import { useState } from 'react'
import { UiWalletAccount } from '@wallet-ui/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useGetTokenBalanceQuery } from '../data-access/use-get-token-balance-query'
import { useStakeMutation } from '../data-access/use-stake-mutation'
import { useUnstakeMutation } from '../data-access/use-unstake-mutation'
import { STAKING_TOKEN_SYMBOL } from '../staking-config'

export function StakingUI({ account, address }: { account: UiWalletAccount; address: Address }) {
  const [stakeAmount, setStakeAmount] = useState('')
  const [unstakeAmount, setUnstakeAmount] = useState('')
  const tokenBalanceQuery = useGetTokenBalanceQuery({ address })
  const stakeMutation = useStakeMutation({ account, address })
  const unstakeMutation = useUnstakeMutation({ account, address })

  const tokenBalance = tokenBalanceQuery.data?.balance ?? 0

  const handleStakeMax = () => {
    setStakeAmount(tokenBalance.toString())
  }

  const handleUnstakeMax = () => {
    // TODO: Replace with actual staked balance query
    setUnstakeAmount('0')
  }

  const handleStake = async () => {
    if (!stakeAmount) return
    await stakeMutation.mutateAsync({ amount: parseFloat(stakeAmount) })
    setStakeAmount('')
  }

  const handleUnstake = async () => {
    if (!unstakeAmount) return
    await unstakeMutation.mutateAsync({ amount: parseFloat(unstakeAmount) })
    setUnstakeAmount('')
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
              <div className="size-6 rounded-full bg-primary" />
            </div>
            <div>
              <CardTitle>Stake</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Lock your tokens to earn rewards</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="stake-amount">Amount</Label>
            <div className="flex gap-2">
              <Input
                id="stake-amount"
                type="number"
                placeholder="0.00"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                disabled={stakeMutation.isPending}
                step="any"
                min="0"
              />
              <Button variant="outline" onClick={handleStakeMax} disabled={stakeMutation.isPending}>
                Max
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Available: {tokenBalance.toFixed(4)} {STAKING_TOKEN_SYMBOL}
            </p>
          </div>
          <Button
            className="w-full"
            onClick={handleStake}
            disabled={!stakeAmount || stakeMutation.isPending}
          >
            Stake
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-muted flex items-center justify-center">
              <div className="size-6 rounded-full bg-foreground/20" />
            </div>
            <div>
              <CardTitle>Unstake</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Unlock your staked tokens</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="unstake-amount">Amount</Label>
            <div className="flex gap-2">
              <Input
                id="unstake-amount"
                type="number"
                placeholder="0.00"
                value={unstakeAmount}
                onChange={(e) => setUnstakeAmount(e.target.value)}
                disabled={unstakeMutation.isPending}
                step="any"
                min="0"
              />
              <Button variant="outline" onClick={handleUnstakeMax} disabled={unstakeMutation.isPending}>
                Max
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Staked: 0.0000 {STAKING_TOKEN_SYMBOL}
            </p>
          </div>
          <Button
            className="w-full"
            variant="outline"
            onClick={handleUnstake}
            disabled={!unstakeAmount || unstakeMutation.isPending}
          >
            Unstake
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
