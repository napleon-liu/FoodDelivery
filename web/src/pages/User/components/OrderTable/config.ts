import { OrderStatus } from '@/redux/modules/order'
import { UserType } from '@/redux/modules/user'

export const backgroundColors = [
  '#FFBF00',
  '#0096FF',
  '#BF40BF',
  '#50C878',
  '#CF9FFF',
  '#B2BEB5',
  '#F33A6A'
]

export const config = {
  [UserType.Customer]: {
    actions: [
      {
        content: '确认送达',
        enabled: [OrderStatus.DeliveryApplicationConfirmed, OrderStatus.DeliveryFinished],
        color: backgroundColors[OrderStatus.DeliveryFinished]
      },
      {
        content: '评价',
        enabled: [OrderStatus.DeliveryFinishConfirmed, OrderStatus.DeliveryFinishConfirmed],
        color: backgroundColors[OrderStatus.DeliveryFinishConfirmed]
      }
    ],

    tabItems: [
      {
        key: '0',
        label: '全部'
      },
      {
        key: '1',
        label: '进行中'
      },
      {
        key: '2',
        label: '待评价'
      },
      {
        key: '3',
        label: '已评价'
      }
    ],

    orderRange: [
      [],
      [OrderStatus.Created, OrderStatus.DeliveryFinished],
      [OrderStatus.DeliveryFinishConfirmed, OrderStatus.DeliveryFinishConfirmed],
      [OrderStatus.Commented, OrderStatus.Commented]
    ]
  },
  [UserType.Employee]: {
    actions: [
      {
        content: '接单',
        enabled: [OrderStatus.Created, OrderStatus.Created],
        color: backgroundColors[OrderStatus.Created]
      },
      {
        content: '请求配送',
        enabled: [OrderStatus.CreatedConfirmed, OrderStatus.CreatedConfirmed],
        color: backgroundColors[OrderStatus.CreatedConfirmed]
      }
    ],
    tabItems: [
      {
        key: '0',
        label: '全部'
      },
      {
        key: '1',
        label: '接单'
      },
      { key: '2', label: '配送' },
      {
        key: '3',
        label: '待评价'
      },
      {
        key: '4',
        label: '已评价'
      }
    ],

    orderRange: [
      [],
      [OrderStatus.CreatedConfirmed, OrderStatus.DeliveryApplied],
      [OrderStatus.DeliveryApplicationConfirmed, OrderStatus.DeliveryFinished],
      [OrderStatus.DeliveryFinishConfirmed, OrderStatus.DeliveryFinishConfirmed],
      [OrderStatus.Commented, OrderStatus.Commented]
    ]
  },
  [UserType.Rider]: {
    actions: [
      {
        content: '配送',
        enabled: [OrderStatus.DeliveryApplied, OrderStatus.DeliveryApplied],
        color: backgroundColors[OrderStatus.DeliveryApplied]
      },
      {
        content: '确认送达',
        enabled: [
          OrderStatus.DeliveryApplicationConfirmed,
          OrderStatus.DeliveryApplicationConfirmed
        ],
        color: backgroundColors[OrderStatus.DeliveryApplicationConfirmed]
      }
    ],

    tabItems: [
      {
        key: '0',
        label: '全部'
      },
      {
        key: '1',
        label: '待配送'
      },
      {
        key: '2',
        label: '待评价'
      },
      {
        key: '3',
        label: '已评价'
      }
    ],

    orderRange: [
      [],
      [OrderStatus.DeliveryApplied, OrderStatus.DeliveryApplied],
      [OrderStatus.DeliveryFinishConfirmed, OrderStatus.DeliveryFinishConfirmed],
      [OrderStatus.Commented, OrderStatus.Commented]
    ]
  },
  [UserType.Undefined]: {}
}
