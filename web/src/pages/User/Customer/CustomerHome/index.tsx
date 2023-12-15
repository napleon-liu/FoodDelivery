import { useEffect, useMemo, useRef, useState } from 'react'
import MyCard from '@/pages/User/components/MyCard'
import { useMyDispatch, useMySelector } from '@/redux/hook'
import { getDishList } from '@/redux/modules/dish'
import {
  Badge,
  Button,
  Col,
  Drawer,
  Image,
  Input,
  List,
  Radio,
  Row,
  Tooltip,
  Typography,
  message
} from 'antd'

import {
  ShoppingCartOutlined,
  DollarTwoTone,
  EnvironmentTwoTone,
  MoneyCollectTwoTone,
  ClearOutlined
} from '@ant-design/icons'

import { debounce } from 'lodash-es'

import styles from './index.module.scss'
import { clearOrderItems } from '@/redux/modules/order'
import { OrderReq, createOrderApi } from '@/apis/order'

const colsChoices = [3, 4, 6, 8]

const CustomerHome = () => {
  const [colsInRow, setColsInRow] = useState(4)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [address, setAddress] = useState(
    (() => {
      const address = localStorage.getItem('address')
      return address ? address + '' : ''
    })()
  )
  const { dishList } = useMySelector(state => state.dish)
  const { id } = useMySelector(state => state.user)
  const { keyword } = useMySelector(state => state.other)
  const { orderItemDict } = useMySelector(state => state.order)
  const dispatch = useMyDispatch()

  const addressInput = useRef(null)

  const orderItemTotalNum = useMemo(() => {
    return Object.keys(orderItemDict).length !== 0
      ? Object.values(orderItemDict).reduce((num, v) => {
          return v + num
        }, 0)
      : 0
  }, [orderItemDict])

  const orderItemList = useMemo(() => {
    return Object.keys(orderItemDict)
      .map(id => {
        const dish = dishList.find(dish => dish.id === +id)
        const num = orderItemDict[+id]
        if (dish && num > 0) {
          const { name, price, pictureURL } = dish
          return { name, num, totalPrice: price * num, pictureURL }
        }

        return null
      })
      .filter(item => item !== null)
  }, [orderItemDict, dishList])

  const totalPrice = useMemo(() => {
    if (orderItemList.length !== 0)
      return orderItemList.reduce((sum, item) => {
        return sum + item!.totalPrice
      }, 0)
    return 0
  }, [orderItemList])

  useEffect(() => {
    dispatch(getDishList())

    // 短轮询
    const interval = setInterval(() => {
      dispatch(getDishList())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [dispatch, dishList])

  const dishItems = useMemo(() => {
    return dishList.map((dish, index) => {
      return (
        (dish.name.includes(keyword) || dish.description.includes(keyword)) && (
          <Col span={Math.ceil(24 / colsInRow)} key={dish.id}>
            <MyCard
              dish={dish}
              colsInRow={colsInRow}
              orderItemNum={dish.id in orderItemDict ? orderItemDict[dish.id] : 0}
            />
          </Col>
        )
      )
    })
  }, [colsInRow, dishList, keyword, orderItemDict])

  const handleChangeAddress = debounce(e => {
    const value = e.target.value
    setAddress(value)
    localStorage.setItem('address', value)
  }, 1000)

  const handleCheckout = async () => {
    if (address === '') {
      setDrawerOpen(true)
      setTimeout(() => {
        message.warning('地址不能为空！', 1)
        ;(addressInput.current as any).focus()
      }, 200)

      return
    }

    setDrawerOpen(false)
    dispatch(clearOrderItems())
    setTimeout(async () => {
      const data: OrderReq = {
        price: totalPrice,
        destination: address,
        customerID: id,
        orderItemList: Object.keys(orderItemDict).map(id => ({
          dishID: +id
        }))
      }
      const res = await createOrderApi(data)
      if (res.status === 200) {
        message.success('下单成功！', 1)
      } else {
        message.warning('下单失败！', 1)
      }
    }, 200)
  }

  return (
    <>
      <div className={styles.header}>
        <Row style={{ marginBottom: 20, position: 'relative' }}>
          <Col span={8}>
            <Radio.Group
              onChange={e => {
                setColsInRow(e.target.value)
              }}
              defaultValue={4}
            >
              {colsChoices.map(choice => {
                return (
                  <Radio.Button key={choice} value={choice}>
                    {choice}
                  </Radio.Button>
                )
              })}
            </Radio.Group>
          </Col>
          <Col span={1} offset={12}>
            <Tooltip title={'购物车'}>
              <Badge count={orderItemTotalNum}>
                <Button
                  disabled={id === 0}
                  size={'large'}
                  type={'primary'}
                  icon={<ShoppingCartOutlined />}
                  onClick={() => setDrawerOpen(true)}
                />
              </Badge>
            </Tooltip>
          </Col>
          <Col span={2}>
            <Tooltip title={'清空'}>
              <Button
                size={'large'}
                danger
                icon={<ClearOutlined twoToneColor={orderItemTotalNum === 0 ? 'grey' : '#2aaa8a'} />}
                disabled={orderItemTotalNum === 0}
                onClick={() => dispatch(clearOrderItems())}
              ></Button>
            </Tooltip>
          </Col>
          <Col span={1}>
            <Tooltip title={'结算'}>
              <Button
                size={'large'}
                type={'default'}
                icon={<DollarTwoTone twoToneColor={orderItemTotalNum === 0 ? 'grey' : '#2aaa8a'} />}
                disabled={orderItemTotalNum === 0}
                onClick={handleCheckout}
              ></Button>
            </Tooltip>
          </Col>
        </Row>
      </div>

      <Row gutter={[16, 16]}>{dishItems}</Row>

      <Drawer
        title={
          <div style={{ fontSize: 25, textAlign: 'center', fontFamily: '新宋体' }}>
            {'您的订单'}
          </div>
        }
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <div className={styles.orderItemList}>
          <List
            dataSource={orderItemList}
            renderItem={item => {
              if (item) {
                const { name, pictureURL, num, totalPrice } = item
                return (
                  <Row style={{ height: '25%' }}>
                    <Col span={4}>
                      <Image
                        src={
                          pictureURL.startsWith('http')
                            ? pictureURL
                            : require(`@/assets/image/${pictureURL}`)
                        }
                        height={'90%'}
                        preview={false}
                      />
                    </Col>
                    <Col offset={1} span={10}>
                      <div>
                        <Typography.Text mark strong style={{ fontSize: '100%' }}>
                          {name}
                        </Typography.Text>
                      </div>
                      <Typography.Text type={'secondary'} style={{ fontSize: '90%' }}>
                        {'×'}
                        {num}
                      </Typography.Text>
                    </Col>
                    <Col offset={3} span={3}>
                      <span style={{ fontSize: 10, color: '#999' }}>{'￥'}</span>
                      <span style={{ color: '#2aaa8a', fontWeight: 'bolder' }}>{totalPrice}</span>
                    </Col>
                  </Row>
                )
              }
            }}
          />
          <div>
            {totalPrice !== 0 && (
              <Row gutter={10}>
                <Col span={5}>
                  <Button
                    danger
                    style={{ fontFamily: '仿宋', fontWeight: 'bolder' }}
                    onClick={() => {
                      dispatch(clearOrderItems())
                    }}
                  >
                    {'清空购物车'}
                  </Button>
                </Col>
                <Col offset={10} span={5}>
                  <Typography.Text strong style={{ fontSize: 18 }}>
                    {'小计：'}
                  </Typography.Text>
                </Col>
                <Col span={4}>
                  <MoneyCollectTwoTone />
                  <Typography.Text underline strong style={{ color: 'goldenrod', fontSize: 18 }}>
                    {totalPrice}
                  </Typography.Text>
                </Col>
              </Row>
            )}
          </div>
        </div>
        <div className={styles.info}>
          <div>
            <Typography.Title level={4}>{'地址'}</Typography.Title>
            <Input
              ref={addressInput}
              addonAfter={<EnvironmentTwoTone />}
              defaultValue={address}
              onChange={handleChangeAddress}
            />
          </div>
          <div>
            <Typography.Title level={4}>{'备注'}</Typography.Title>
            <Input />
          </div>
        </div>
        <div className={styles.pay}>
          <Button
            type={'primary'}
            block
            size={'large'}
            disabled={orderItemTotalNum === 0}
            onClick={handleCheckout}
          >
            {'结算'}
          </Button>
        </div>
      </Drawer>
    </>
  )
}

export default CustomerHome
