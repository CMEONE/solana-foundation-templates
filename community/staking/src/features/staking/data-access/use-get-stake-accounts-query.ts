import { Address, getBase58Encoder, address as getAddress } from 'gill'
import { useQuery } from '@tanstack/react-query'
import { useSolana } from '@/components/solana/use-solana'

export function useGetStakeAccountsQuery({ address }: { address: Address }) {
    const { client, cluster } = useSolana()

    return useQuery({
        queryKey: ['stake-accounts', { cluster, address }],
        queryFn: async () => {
            const stakeProgramId = getAddress('Stake11111111111111111111111111111111111111')

            // Fetch all stake accounts for the user
            // We filter by the 'withdrawer' authority being the user's address
            // Note: In a real app you might also check 'staker' authority
            const parsedAccounts = await client.rpc
                .getProgramAccounts(stakeProgramId, {
                    encoding: 'jsonParsed',
                    filters: [
                        {
                            memcmp: {
                                offset: 44, // Offset for withdrawer authority in StakeState
                                bytes: address as any,
                            },
                        },
                    ],
                })
                .send()

            return parsedAccounts.value.map((account: any) => {
                const pubkey = account.pubkey
                const data = account.account.data

                // Basic parsing - relying on the shape of parsed stake accounts
                // This is a simplification. In production, use a proper deserializer.
                const parsed = data && 'parsed' in data ? data.parsed : null
                const info = parsed?.info || {}
                const stake = info.stake || {}
                const delegation = stake.delegation || {}

                return {
                    pubkey,
                    lamports: account.account.lamports,
                    activationEpoch: delegation.activationEpoch,
                    deactivationEpoch: delegation.deactivationEpoch,
                    voter: delegation.voter,
                    stake: delegation.stake, // Active stake amount
                    state: parsed?.type || 'unknown', // 'initialized', 'delegated', etc.
                }
            })
        },
        enabled: !!address,
    })
}
