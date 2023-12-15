import React, { useEffect, useState } from 'react'
import { Table, Tabs, Image, Typography, Button, message, Tooltip, Rate } from 'antd'

import { SmileTwoTone } from '@ant-design/icons'
import type { TabsProps } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useMyDispatch, useMySelector } from '@/redux/hook'
import {
  OrderInfo,
  OrderStatus,
  getOrderListByStatuses,
  getOrderListByUserID,
  getOrderListForRider
} from '@/redux/modules/order'

import styles from './index.module.scss'
import { UserType } from '@/redux/modules/user'
import { updateOrderStatusApi } from '@/apis/order'
import OrderInfomation from '../OrderInfo'

import { config, backgroundColors } from './config'
import { getCommentApi } from '@/apis/comment'

const { Text } = Typography

const OrderTable = ({ openDrawer = (id: number) => {} }: { openDrawer?: (id: number) => void }) => {
  const [orderItems, setOrderItems] = useState<OrderInfo[]>()
  const [tabKey, setTabKey] = useState('0')
  const [orderInfoOpen, setOrderInfoOpen] = useState(false)
  const [orderShown, setOrderShown] = useState<OrderInfo>()

  const { orderList } = useMySelector(state => state.order)
  const { userType } = useMySelector(state => state.user)
  const { keyword } = useMySelector(state => state.other)
  const dispatch = useMyDispatch()

  const {
    actions,
    tabItems: tabs,
    orderRange
  } = config[userType] as {
    actions: { content: string; enabled: OrderStatus[]; color: string }[]
    tabItems: { key: string; label: string }[]
    orderRange: OrderStatus[][]
  }

  const tabItems: TabsProps['items'] = tabs

  const statusStrs = (
    userType === UserType.Customer ? ['已下单', '已接单', '已接单'] : ['待接单', '已接单', '待配送']
  ).concat(['配送中', '已送达', '已完结', '已评价'])

  const columns: ColumnsType<OrderInfo> = [
    {
      title: 'index',
      dataIndex: 'index',
      key: 'index',
      width: '3%',
      align: 'left',
      render: (text, record, index) => {
        return <>{index + 1}</>
      }
    },
    {
      title: '菜品',
      dataIndex: 'dishRespList',
      key: 'dishRespList',
      width: '15%',
      render: (dishRespList, record) => {
        const length = dishRespList.length
        const { name } = dishRespList[0]
        return (
          <div className={styles.dish}>
            <div className={styles.images}>
              {dishRespList.map(({ pictureURL }: { pictureURL: string }) => {
                return (
                  <span key={pictureURL}>
                    <Image
                      alt={'菜品图片'}
                      src={
                        pictureURL.startsWith('http')
                          ? pictureURL
                          : require(`@/assets/image/${pictureURL}`)
                      }
                      preview={false}
                      width={'3vmax'}
                      height={'3vmax'}
                      placeholder={<Image width={'3vmax'} height={'3vmax'} />}
                    />
                  </span>
                )
              })}
            </div>

            {length === 1 && (
              <Text ellipsis={true} strong title={name}>
                {name}
              </Text>
            )}
          </div>
        )
      }
    },
    {
      title: '订单时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: '10%',
      align: 'center',
      render: createTime => {
        const time = createTime.slice(0, 19).split('T')
        return (
          <>
            <div className={styles.time} title={time}>
              <Text type={'secondary'} ellipsis>
                {time[0]}
              </Text>
              <br />
              <Text type={'secondary'} ellipsis>
                {time[1]}
              </Text>
            </div>
          </>
        )
      }
    },
    {
      title: '费用',
      dataIndex: 'price',
      key: 'price',
      width: '7%',
      align: 'center',
      ellipsis: true,
      render: (price, record) => {
        return (
          <div className={styles.price}>
            <div className={styles.value}>
              {price}
              {'元'}
            </div>
            <div className={styles.num}>
              {'共 '}
              <b>{record.dishRespList.length}</b>
              {' 件'}
            </div>
          </div>
        )
      }
    },
    {
      title: '地址',
      dataIndex: 'destination',
      key: 'destination',
      width: '15%',
      render: destination => {
        return (
          <>
            <Text ellipsis={true} italic title={destination} style={{ width: '20vw' }}>
              {destination}
            </Text>
          </>
        )
      }
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      align: 'center',
      ellipsis: true,
      render: (status: number) => {
        return (
          <div className={styles.status}>
            {status !== OrderStatus.Commented ? (
              <Text style={{ backgroundColor: backgroundColors[status - 1] }}>
                {statusStrs[status - 1]}
              </Text>
            ) : (
              <>
                <Text style={{ backgroundColor: backgroundColors[5] }}>{statusStrs[5]}</Text>
                <div style={{ height: '3px' }}></div>
                <Text style={{ backgroundColor: backgroundColors[6] }}>{statusStrs[6]}</Text>
              </>
            )}
          </div>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'actions',
      key: 'actions',
      width: '10%',
      align: 'center',
      render: (_, record) => {
        const Action = ({ action }: { action: any }) => {
          const [loading, setLoading] = useState(false)

          const handleClick = (status: number, e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation()
            if (status - 1 === OrderStatus.DeliveryFinishConfirmed) {
              openDrawer(record.id)
              return
            }

            setLoading(true)

            setTimeout(async () => {
              setLoading(false)
              const res = await updateOrderStatusApi(record.id, status)

              if (res.status === 200) {
                getOrderList()
                await message.success(`${action.content}成功！`, 1)
              } else {
                await message.success(`${action.content}失败！`, 1)
              }
            }, 1000)
          }
          return (
            <Button
              className={styles.action}
              type={'link'}
              style={{ color: action.color, border: `1px solid ${action.color}` }}
              loading={loading}
              onClick={e => handleClick(action.enabled[1] + 1, e)}
            >
              <b>{action.content}</b>
            </Button>
          )
        }

        return (
          <>
            {actions.map((action: any) => {
              return (
                record.status >= action.enabled[0] &&
                record.status <= action.enabled[1] && (
                  <span key={action.content} style={{ margin: '0 5px' }}>
                    <Action action={action} />
                  </span>
                )
              )
            })}
          </>
        )
      }
    },
    {
      title: '评价详情',
      dataIndex: 'comment',
      key: 'comment',
      width: '15%',
      align: 'center',
      render: (_, record) => {
        if (record.status !== OrderStatus.Commented) return <></>

        if (userType === UserType.Rider)
          return (
            <Tooltip title={'满意'}>
              <SmileTwoTone style={{ fontSize: 30 }} />
            </Tooltip>
          )

        const MyRate = () => {
          const [rating, setRating] = useState(0)

          useEffect(() => {
            const getRating = async () => {
              const res = await getCommentApi({ orderID: record.id })
              if (res.status === 200) {
                setRating(res.data.Result.CommentList[0].rating)
              }
            }

            getRating()
          })
          return (
            <Rate
              disabled
              value={rating}
              style={{
                color: '#2aaa8a',
                borderRadius: '10px'
              }}
            />
          )
        }

        return <MyRate />
      }
    }
  ]

  const getOrderList = async () => {
    switch (userType) {
      case UserType.Customer:
        await dispatch(getOrderListByUserID())
        break
      case UserType.Employee:
        await dispatch(getOrderListByStatuses())
        break
      case UserType.Rider:
        await dispatch(getOrderListForRider())
        break
      default:
        break
    }
  }

  useEffect(() => {
    getOrderList()
    const timer = setInterval(() => {
      getOrderList()
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  })

  useEffect(() => {
    const list = orderList
      .flatMap(orderArr => orderArr)
      .filter(
        item =>
          item.dishRespList.some(
            dish => dish.name.includes(keyword) || dish.description.includes(keyword)
          ) || item.destination.includes(keyword)
      )

    if (tabKey === '0') {
      setOrderItems(list)
    } else {
      const [lower, higher] = orderRange[+tabKey]

      setOrderItems(list.filter(item => item.status >= lower && item.status <= higher))
    }
  }, [keyword, orderList, orderRange, tabKey])

  const closeOrderInfo = (drawerOpen: boolean = false, id: number = 0) => {
    setOrderInfoOpen(false)
    if (drawerOpen) {
      openDrawer(id)
    }
  }

  return (
    <>
      {orderInfoOpen && (
        <OrderInfomation
          open={orderInfoOpen}
          onClose={closeOrderInfo}
          order={orderShown}
          userType={userType}
        />
      )}

      <Tabs defaultActiveKey={'0'} items={tabItems} onChange={key => setTabKey(key)} />
      <Table
        showHeader={false}
        dataSource={orderItems || []}
        rowKey={'id'}
        columns={columns}
        onRow={record => {
          return {
            onClick: async event => {
              setOrderShown(record)
              setOrderInfoOpen(true)
            }
          }
        }}
      />
    </>
  )
}

export default OrderTable
