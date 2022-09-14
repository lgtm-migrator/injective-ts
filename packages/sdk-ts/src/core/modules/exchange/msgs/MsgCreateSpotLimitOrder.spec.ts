import { MsgCreateSpotLimitOrder as BaseMsgCreateSpotLimitOrder } from '@injectivelabs/chain-api/injective/exchange/v1beta1/tx_pb'
import MsgCreateSpotLimitOrder from './MsgCreateSpotLimitOrder'
import { mockFactory } from '../../../../../../../tests/mocks'
import snakecaseKeys from 'snakecase-keys'

const params: MsgCreateSpotLimitOrder['params'] = {
  feeRecipient: mockFactory.injectiveAddress2,
  injectiveAddress: mockFactory.injectiveAddress,
  marketId: mockFactory.injUsdtDerivativeMarket.marketId,
  orderType: 1,
  price: '1500000',
  quantity: '100',
  subaccountId: mockFactory.subaccountId,
  triggerPrice: '0',
}

const protoType = '/injective.exchange.v1beta1.MsgCreateSpotLimitOrder'
const protoTypeShort = 'exchange/MsgCreateSpotLimitOrder'
const protoParams = {
  sender: params.injectiveAddress,
  order: {
    marketId: params.marketId,
    orderInfo: {
      feeRecipient: params.feeRecipient,
      price: params.price,
      quantity: params.quantity,
      subaccountId: params.subaccountId,
    },
    orderType: params.orderType,
    triggerPrice: params.triggerPrice,
  },
}
const formattedProtoParams = {
  ...protoParams,
  order: {
    ...protoParams.order,
    orderInfo: {
      ...protoParams.order.orderInfo,
      price: '1500000000000000000000000',
      quantity: '100000000000000000000',
    },
  },
}

const message = MsgCreateSpotLimitOrder.fromJSON(params)

describe.only('MsgCreateSpotLimitOrder', () => {
  it('generates proper proto', () => {
    const proto = message.toProto()

    expect(proto instanceof BaseMsgCreateSpotLimitOrder).toBe(true)
    expect(proto.toObject()).toStrictEqual(formattedProtoParams)
  })

  it('generates proper data', () => {
    const data = message.toData()

    expect(data).toStrictEqual({
      '@type': protoType,
      ...formattedProtoParams,
    })
  })

  it('generates proper amino', () => {
    const amino = message.toAmino()

    expect(amino).toStrictEqual({
      type: protoTypeShort,
      ...protoParams,
    })
  })

  it('generates proper Eip712 types', () => {
    const eip712Types = message.toEip712Types()

    expect(Object.fromEntries(eip712Types)).toStrictEqual({
      TypeOrder: [
        { name: 'market_id', type: 'string' },
        { name: 'order_info', type: 'TypeOrderOrderInfo' },
        { name: 'order_type', type: 'int32' },
        { name: 'trigger_price', type: 'string' },
      ],
      TypeOrderOrderInfo: [
        { name: 'subaccount_id', type: 'string' },
        { name: 'fee_recipient', type: 'string' },
        { name: 'price', type: 'string' },
        { name: 'quantity', type: 'string' },
      ],
      MsgValue: [
        { name: 'sender', type: 'string' },
        { name: 'order', type: 'TypeOrder' },
      ],
    })
  })

  it('generates proper Eip712 values', () => {
    const eip712 = message.toEip712()

    const value = snakecaseKeys(protoParams)
    const formattedValue = {
      ...value,
      order: {
        ...value.order,
        order_info: {
          fee_recipient: params.feeRecipient,
          price: '1500000.000000000000000000',
          quantity: '100.000000000000000000',
          subaccount_id: params.subaccountId,
        },
        trigger_price: '0.000000000000000000',
      },
    }

    expect(eip712).toStrictEqual({
      type: protoTypeShort,
      value: formattedValue,
    })
  })

  it('generates proper web3', () => {
    const web3 = message.toWeb3()

    expect(web3).toStrictEqual({
      '@type': protoType,
      ...protoParams,
    })
  })
})
