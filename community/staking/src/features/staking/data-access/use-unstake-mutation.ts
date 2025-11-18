import { Address, createTransaction, getBase58Decoder, signAndSendTransactionMessageWithSigners } from 'gill'
import { getTransferSolInstruction } from 'gill/programs'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { toastTx } from '@/components/toast-tx'
import { useSolana } from '@/components/solana/use-solana'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useInvalidateGetBalanceQuery } from '@/features/account/data-access/use-invalidate-get-balance-query'

export function useUnstakeMutation({ account, address }: { account: UiWalletAccount; address: Address }) {
  const { client } = useSolana()
  const signer = useWalletUiSigner({ account })
  const invalidateBalanceQuery = useInvalidateGetBalanceQuery({ address })

  return useMutation({
    mutationFn: async (input: { amount: number }) => {
      try {
        const { value: latestBlockhash } = await client.rpc.getLatestBlockhash({ commitment: 'confirmed' }).send()

        // TODO: Replace with actual unstaking logic
        // For native staking, you would:
        // 1. Deactivate the stake
        // 2. Wait for the deactivation period
        // 3. Withdraw from the stake account
        // For now, this is a placeholder that demonstrates the transaction pattern

        const transaction = createTransaction({
          feePayer: signer,
          version: 0,
          latestBlockhash,
          instructions: [
            // Placeholder: In production, replace with stake program instructions
            getTransferSolInstruction({
              amount: input.amount,
              destination: address,
              source: signer, // Replace with stake account
            }),
          ],
        })

        const signatureBytes = await signAndSendTransactionMessageWithSigners(transaction)
        const signature = getBase58Decoder().decode(signatureBytes)

        console.log('Unstake transaction:', signature)
        return signature
      } catch (error: unknown) {
        console.log('error', `Unstake transaction failed! ${error}`)
        return
      }
    },
    onSuccess: async (tx) => {
      toastTx(tx)
      toast.success('Unstaked successfully!')
      await invalidateBalanceQuery()
    },
    onError: (error) => {
      toast.error(`Unstake transaction failed! ${error}`)
    },
  })
}
