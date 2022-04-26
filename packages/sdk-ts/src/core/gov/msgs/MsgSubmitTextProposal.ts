import { MsgSubmitProposal as BaseMsgSubmitProposal } from '@injectivelabs/chain-api/cosmos/gov/v1beta1/tx_pb'
import { Coin } from '@injectivelabs/chain-api/cosmos/base/v1beta1/coin_pb'
import snakeCaseKeys from 'snakecase-keys'
import { Any } from 'google-protobuf/google/protobuf/any_pb'
import { TextProposal } from '@injectivelabs/chain-api/cosmos/gov/v1beta1/gov_pb'
import { MsgBase } from '../../MsgBase'

export declare namespace MsgSubmitTextProposal {
  export interface Params {
    title: string
    description: string
    proposer: string
    deposit: {
      amount: string
      denom: string
    }
  }

  export interface Amino {
    type: '/cosmos.gov.v1beta1.MsgSubmitProposal'
    message: BaseMsgSubmitProposal
  }

  export interface Data extends BaseMsgSubmitProposal.AsObject {
    '@type': '/cosmos.gov.v1beta1.MsgSubmitProposal'
  }

  export interface Web3 extends BaseMsgSubmitProposal.AsObject {
    '@type': '/cosmos.gov.v1beta1.MsgSubmitProposal'
  }

  export type Proto = BaseMsgSubmitProposal
}

export default class MsgSubmitTextProposal extends MsgBase<
  MsgSubmitTextProposal.Params,
  MsgSubmitTextProposal.Data,
  MsgSubmitTextProposal.Proto,
  MsgSubmitTextProposal.Web3,
  MsgSubmitTextProposal.Amino
> {
  static fromJSON(params: MsgSubmitTextProposal.Params): MsgSubmitTextProposal {
    return new MsgSubmitTextProposal(params)
  }

  toProto(): MsgSubmitTextProposal.Proto {
    const { params } = this

    const depositParams = new Coin()
    depositParams.setDenom(params.deposit.denom)
    depositParams.setAmount(params.deposit.amount)

    const content = this.getContent()
    const proposalType = '/cosmos.gov.v1beta1.TextProposal'

    const contentAny = new Any()
    contentAny.setValue(content.serializeBinary())
    contentAny.setTypeUrl(proposalType)

    const message = new BaseMsgSubmitProposal()
    message.setContent(contentAny)
    message.setProposer(params.proposer)
    message.setInitialDepositList([depositParams])

    return message
  }

  toData(): MsgSubmitTextProposal.Data {
    const proto = this.toProto()

    return {
      '@type': '/cosmos.gov.v1beta1.MsgSubmitProposal',
      ...proto.toObject(),
    }
  }

  toWeb3(): MsgSubmitTextProposal.Web3 {
    const { params } = this
    const content = this.getContent()
    const proposalType = '/cosmos.gov.v1beta1.TextProposal'

    const message = {
      proposer: params.proposer,
      content: {
        ...content.toObject(),
      },
      initial_deposit: [{ ...snakeCaseKeys(params.deposit) }],
    }

    const messageWithProposalType = {
      ...message,
      content: {
        ...message.content,
        '@type': proposalType,
      },
    }

    return {
      '@type': '/cosmos.gov.v1beta1.MsgSubmitProposal',
      ...messageWithProposalType,
    } as unknown as MsgSubmitTextProposal.Web3
  }

  toAmino(): MsgSubmitTextProposal.Amino {
    const proto = this.toProto()

    return {
      type: '/cosmos.gov.v1beta1.MsgSubmitProposal',
      message: proto,
    }
  }

  private getContent() {
    const { params } = this

    const content = new TextProposal()
    content.setTitle(params.title)
    content.setDescription(params.description)

    return content
  }
}