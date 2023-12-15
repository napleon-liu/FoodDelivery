import { OrderInfo, OrderStatus } from '@/redux/modules/order'
import {
  Col,
  List,
  Row,
  Typography,
  Image,
  Modal,
  Divider,
  Tooltip,
  Button,
  Rate,
  Flex
} from 'antd'
import { MoneyCollectTwoTone, SmileTwoTone } from '@ant-design/icons'

import styles from './index.module.scss'
import { UserType } from '@/redux/modules/user'
import { useEffect, useState } from 'react'
import { getUserInfoApi } from '@/apis/user'
import { getCommentApi } from '@/apis/comment'

const { Text, Title, Paragraph } = Typography

const listItemNames = ['下单时间', '收货地点', '备注']

const userList = ['顾客', '接单员工', '送餐员']

type user = UserType.Customer | UserType.Employee | UserType.Rider
const OrderInformation = ({
  open,
  onClose,
  order,
  userType
}: {
  open: boolean
  onClose: (drawerOpen?: boolean, id?: number) => void
  order?: OrderInfo
  userType: UserType
}) => {
  const [usersInfo, setUsersInfo] = useState<Record<user, { name: string; account: string }>>()

  const [comment, setComment] = useState<{ content: string; rating: number }>()

  useEffect(() => {
    if (!order) return
    const getUserInfo = async () => {
      let temp: Record<user, { name: string; account: string }> = {
        [UserType.Customer]: { name: '', account: '' },
        [UserType.Employee]: { name: '', account: '' },
        [UserType.Rider]: { name: '', account: '' }
      }
      const getUserInfo = async (id: number, user: UserType) => {
        if (id === 0 || user === userType) return
        const res = await getUserInfoApi({ id })
        if (res.status === 200) {
          const { name, account } = res.data.Result
          temp[user as user] = { name, account }
        }
      }
      const { customerID, employeeID, riderID } = order
      await getUserInfo(customerID, UserType.Customer)
      await getUserInfo(employeeID, UserType.Employee)
      await getUserInfo(riderID, UserType.Rider)
      setUsersInfo(temp)
    }

    const getComment = async () => {
      if (order.status !== OrderStatus.Commented) return
      try {
        const res = await getCommentApi({ orderID: order.id })
        if (res.status === 200) {
          const { content, rating } = res.data.Result.CommentList[0]

          setComment({ content, rating })
        }
      } catch (err) {
        console.log(err)
      }
    }

    getUserInfo()
    getComment()
  }, [order, userType])

  const handleOk = () => {
    onClose()
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <>
      {order && (
        <Modal
          open={open}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          className={styles.modal}
        >
          <Paragraph className={styles.content}>
            <Title>
              {`订单${(() => {
                switch (order.status) {
                  case OrderStatus.DeliveryFinishConfirmed:
                    return '已完结'
                  case OrderStatus.Commented:
                    return '已完成'
                  default:
                    return '进行中'
                }
              })()}`}
              {order.status === OrderStatus.DeliveryFinishConfirmed && (
                <Button
                  style={{
                    color: '#F33A6A',
                    border: '2px solid #F33A6A',
                    marginLeft: '20%',
                    fontWeight: 'bolder'
                  }}
                  onClick={() => {
                    onClose(true, order.id)
                  }}
                >
                  {'评价'}
                </Button>
              )}
            </Title>
            <div className={styles.orderItemList}>
              <List
                dataSource={order.dishRespList}
                renderItem={item => {
                  if (item) {
                    const { name, pictureURL, price } = item
                    return (
                      <Row>
                        <Col span={4}>
                          <Image
                            src={
                              pictureURL.startsWith('http')
                                ? pictureURL
                                : require(`@/assets/image/${pictureURL}`)
                            }
                            height={'8vh'}
                            width={'8vh'}
                            preview={false}
                          />
                        </Col>
                        <Col offset={1} span={10}>
                          <div>
                            <Typography.Text mark strong style={{ fontSize: '100%' }} ellipsis>
                              {name}
                            </Typography.Text>
                          </div>
                          <Typography.Text type={'secondary'} style={{ fontSize: '90%' }}>
                            {'×1'}
                          </Typography.Text>
                        </Col>
                        <Col offset={3} span={3}>
                          <span style={{ fontSize: 10, color: '#999' }}>{'￥'}</span>
                          <span style={{ color: '#2aaa8a', fontWeight: 'bolder' }}>{price}</span>
                        </Col>
                      </Row>
                    )
                  }
                }}
              />
            </div>
            <div className={styles.price}>
              <div>
                <Text strong>{'共计： '}</Text>
                <MoneyCollectTwoTone />
                <Text underline strong style={{ color: 'goldenrod', fontSize: 20 }}>
                  {order.price}
                </Text>
              </div>
            </div>
            <List
              className={styles.orderInfoList}
              dataSource={[
                order.createTime.slice(0, 19).replace('T', ' '),
                order.destination,
                '无'
              ]}
              renderItem={(item: any, index: number) => {
                return (
                  <Row style={{ margin: '5px 0' }}>
                    <Col offset={1} span={5}>
                      <b>{listItemNames[index]}</b>
                    </Col>
                    <Col offset={7} span={9} className={styles.info}>
                      <Text type={'secondary'} ellipsis>
                        {item}
                      </Text>
                    </Col>
                  </Row>
                )
              }}
            />

            {usersInfo && (usersInfo.customer.name !== '' || usersInfo.employee.name !== '') && (
              <>
                <Divider />
                <List
                  className={styles.orderInfoList}
                  dataSource={[UserType.Customer, UserType.Employee, UserType.Rider]}
                  renderItem={(item: user, index: number) => {
                    const { name, account } = usersInfo[item]
                    if (name === '' || account === '') return

                    return (
                      <Row style={{ margin: '5px 0' }}>
                        <Col offset={1} span={5}>
                          <b>{userList[index]}</b>
                        </Col>
                        <Col offset={7} span={9} className={styles.info}>
                          <Text type={'secondary'} ellipsis>
                            {name}
                          </Text>
                          <br />
                          <Tooltip title={'电话联系'}>
                            <Text ellipsis style={{ cursor: 'pointer', color: 'skyblue' }}>
                              {account}
                            </Text>
                          </Tooltip>
                        </Col>
                      </Row>
                    )
                  }}
                />
              </>
            )}

            {comment && (
              <>
                <Divider />
                <Row>
                  <Col offset={1} span={11}>
                    <Text strong>{'订单满意度：'}</Text>
                    <Rate
                      className={styles.rate}
                      disabled
                      value={comment.rating}
                      style={{
                        color: '#2aaa8a',
                        borderRadius: '10px'
                      }}
                    />
                  </Col>
                  <Col span={11}>
                    <Text strong>{'配送满意度：'}</Text>
                    <SmileTwoTone style={{ fontSize: 15 }} />
                    <Text style={{ color: 'goldenrod' }}>{' 满意'}</Text>
                  </Col>
                  <Col offset={1}>
                    <Text strong>{'订单评价：'}</Text>

                    <Text style={{ height: '20vh', borderWidth: '2px' }}>{comment.content}</Text>
                  </Col>
                </Row>
              </>
            )}
          </Paragraph>
        </Modal>
      )}
    </>
  )
}

export default OrderInformation
