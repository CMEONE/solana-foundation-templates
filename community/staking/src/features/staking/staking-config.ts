import { address } from 'gill'

/**
 * Staking Configuration
 *
 * Configure your staking token settings here.
 *
 * To set up:
 * 1. Replace STAKING_TOKEN_MINT with your token's mint address
 * 2. Update the token name, symbol, and decimals to match your token
 * 3. The UI will automatically fetch balances from the user's wallet
 *
 * Example token mints:
 * - Wrapped SOL: So11111111111111111111111111111111111111112
 * - USDC (devnet): 4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU
 */

export const STAKING_TOKEN_MINT = address('So11111111111111111111111111111111111111112') // Replace with your token mint

export const STAKING_TOKEN_NAME = 'TOKEN'
export const STAKING_TOKEN_SYMBOL = 'TKN'
export const STAKING_TOKEN_DECIMALS = 9
