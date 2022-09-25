import { DirectSignResponse } from '@cosmjs/proto-signing'
import { TxRaw } from '@injectivelabs/chain-api/cosmos/tx/v1beta1/tx_pb'
import { CosmosChainId } from '@injectivelabs/ts-types'
import { Msgs } from '@injectivelabs/sdk-ts'
import { Wallet } from '../../wallet-strategy/types/enums'

export interface ConcreteCosmosWalletStrategy {
  getAddresses(): Promise<string[]>

  /**
   * Sends Cosmos transaction. Returns a transaction hash
   * @param transaction should implement TransactionConfig
   * @param options
   */
  sendTransaction(transaction: DirectSignResponse | TxRaw): Promise<string>

  isChainIdSupported(chainId?: CosmosChainId): Promise<boolean>

  signTransaction(data: {
    address: string
    memo: string
    gas: string
    message: Msgs | Msgs[]
  }): Promise<string | DirectSignResponse>
}

export interface CosmosWalletStrategyArguments {
  chainId: CosmosChainId
  endpoints?: { rpc: string; rest: string }
  wallet?: Wallet
}
