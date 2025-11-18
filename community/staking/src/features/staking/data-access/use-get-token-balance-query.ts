import type { Address } from 'gill'
import { useQuery } from '@tanstack/react-query'
import { useSolana } from '@/components/solana/use-solana'
import { useGetTokenAccountsQuery } from '@/features/account/data-access/use-get-token-accounts-query'
import { STAKING_TOKEN_MINT } from '../staking-config'

export function useGetTokenBalanceQuery({ address }: { address: Address }) {
  const { cluster } = useSolana()
  const tokenAccountsQuery = useGetTokenAccountsQuery({ address })

  return useQuery({
    queryKey: ['staking-token-balance', { cluster, address, mint: STAKING_TOKEN_MINT }],
    queryFn: () => {
      // Find the token account for the configured mint
      const tokenAccount = tokenAccountsQuery.data?.find(
        (account) => account.account.data.parsed.info.mint === STAKING_TOKEN_MINT
      )

      if (!tokenAccount) {
        return { balance: 0, decimals: 9 }
      }

      return {
        balance: tokenAccount.account.data.parsed.info.tokenAmount.uiAmount ?? 0,
        decimals: tokenAccount.account.data.parsed.info.tokenAmount.decimals,
      }
    },
    enabled: tokenAccountsQuery.isSuccess && !!tokenAccountsQuery.data,
  })
}
