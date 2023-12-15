import OrderTable from '@/pages/User/components/OrderTable'
import { useMySelector } from '@/redux/hook'
import { useMyNavigate } from '@/utils'
import { Button, Divider, Drawer, Flex, Form, Input, Rate, Tooltip, message } from 'antd'
import { FrownTwoTone, SmileTwoTone } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { createCommentApi } from '@/apis/comment'
import { updateOrderStatusApi } from '@/apis/order'
import { OrderStatus } from '@/redux/modules/order'

const { TextArea } = Input
const { Item, useForm } = Form

const CustomerOrder = () => {
  const { id } = useMySelector(state => state.user)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [riderRate, setRiderRate] = useState('')
  const [hover, setHover] = useState('')
  const [orderID, setOrderID] = useState(0)

  const navigateTo = useMyNavigate()
  const [form] = useForm()

  useEffect(() => {
    if (id === 0) {
      navigateTo('/login')
    }
  })

  useEffect(() => {
    form.setFieldsValue({ rating: 0, content: '' })
    setRiderRate('')
    setHover('')
  }, [drawerOpen, form])

  const redStar = () => {
    return <span style={{ color: 'red' }}>{'*'}</span>
  }

  const submit = async ({ rating, content }: { rating: number; content: string }) => {
    if (rating === 0) return message.warning('请选取订单满意度！', 1)
    if (content === '') return message.warning('请填写订单评价！', 1)
    if (riderRate === '') return message.warning('请选取配送满意度！', 1)

    const res1 = await createCommentApi({ rating, content, customerID: id, orderID })
    if (res1.status === 200) {
      const res2 = await updateOrderStatusApi(orderID, OrderStatus.Commented)
      if (res2.status === 200) {
        setDrawerOpen(false)
        setTimeout(() => message.success('评价成功！', 1), 200)
        return
      }
    }
    message.error('评价失败！', 1)
  }

  return (
    <>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Form form={form} onFinish={values => submit(values)}>
          <Flex gap={'middle'} align={'center'}>
            <h2>
              {redStar()}
              {'订单满意度：'}
            </h2>
            <Item name={'rating'} style={{ marginBottom: 0 }}>
              <Rate
                allowClear={true}
                style={{
                  color: '#2aaa8a',
                  border: '2px dotted #2aaa8a',
                  borderRadius: '10px',
                  padding: '5px 10px'
                }}
              />
            </Item>
          </Flex>
          <div>
            <h2>
              {redStar()}
              {'订单评价：'}
            </h2>
            <Item name={'content'}>
              <TextArea
                showCount
                maxLength={100}
                allowClear
                style={{ height: '20vh', borderWidth: '2px' }}
                placeholder={''}
              ></TextArea>
            </Item>
          </div>

          <Divider />
          <Item>
            <div>
              <h2>
                {redStar()}
                {'配送满意度：'}
              </h2>
              <div className={styles['rider-rate']}>
                <span>
                  <Tooltip title={'不满意'}>
                    <FrownTwoTone
                      style={{ fontSize: 50 }}
                      twoToneColor={
                        riderRate === 'bad'
                          ? '#2aaa8a'
                          : hover === 'bad'
                          ? 'rgba(42,170,138,0.5)'
                          : '#aaa'
                      }
                      onClick={() => setRiderRate('bad')}
                      onMouseEnter={() => {
                        setHover('bad')
                      }}
                      onMouseLeave={() => {
                        setHover('')
                      }}
                    />
                  </Tooltip>
                </span>
                <span>
                  <Tooltip title={'满意'}>
                    <SmileTwoTone
                      style={{ fontSize: 50 }}
                      twoToneColor={
                        riderRate === 'good'
                          ? '#2aaa8a'
                          : hover === 'good'
                          ? 'rgba(42,170,138,0.5)'
                          : '#aaa'
                      }
                      onClick={() => setRiderRate('good')}
                      onMouseEnter={() => {
                        setHover('good')
                      }}
                      onMouseLeave={() => {
                        setHover('')
                      }}
                    />
                  </Tooltip>
                </span>
              </div>
            </div>
          </Item>
          <Item style={{ marginTop: 100 }}>
            <Button type="primary" htmlType="submit" block>
              {'提交评价'}
            </Button>
          </Item>
        </Form>
      </Drawer>
      <OrderTable
        openDrawer={id => {
          setDrawerOpen(true)
          setOrderID(id)
        }}
      />
    </>
  )
}

export default CustomerOrder
