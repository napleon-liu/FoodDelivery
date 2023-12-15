import { PlusSquareTwoTone, MinusSquareTwoTone, MoneyCollectTwoTone } from '@ant-design/icons'
import { Badge, Card, Image, message } from 'antd'

import styles from './index.module.scss'

import { Dish } from '@/redux/modules/dish'
import { useMyDispatch, useMySelector } from '@/redux/hook'
import { setOrderItemDict } from '@/redux/modules/order'
import classNames from 'classnames'
import { useMyNavigate } from '@/utils'

const { Meta } = Card

const MyCard = ({
  dish,
  colsInRow,
  orderItemNum
}: {
  dish: Dish
  colsInRow: number
  orderItemNum: number
}) => {
  const { name, pictureURL, price, description } = dish
  const imgSize = `${45 / colsInRow}vw`
  const dispatch = useMyDispatch()
  const navigateTo = useMyNavigate()
  const { id } = useMySelector(state => state.user)

  return (
    <div title={name}>
      <Card
        className={styles.card}
        cover={
          <Image
            alt={'菜品图片'}
            src={
              pictureURL.startsWith('http') ? pictureURL : require(`@/assets/image/${pictureURL}`)
            }
            width={imgSize}
            height={imgSize}
            placeholder={<Image width={imgSize} height={imgSize} />}
          />
        }
        actions={[
          <ul className={styles.actions}>
            <li
              className={classNames([{ [styles.add]: orderItemNum === 0 }])}
              title={'加入餐车'}
              onClick={async () => {
                if (id === 0) {
                  await message.error('请先登录！', 1)
                  navigateTo('/login')
                  return
                }
                dispatch(setOrderItemDict([dish.id, orderItemNum + 1]))
              }}
            >
              <PlusSquareTwoTone />
            </li>
            <li
              style={{ color: '#2aaa8a', cursor: 'default' }}
              className={classNames([{ [styles.hide]: orderItemNum === 0 }])}
              title={'' + orderItemNum}
            >
              <Badge
                count={orderItemNum}
                style={{
                  backgroundColor: '#2aaa8a',
                  fontSize: 18,
                  fontFamily: 'Consolas',
                  transform: 'scale(1.2)'
                }}
              />
            </li>
            <li
              className={classNames([{ [styles.hide]: orderItemNum === 0 }])}
              title={'取消加入'}
              onClick={() => dispatch(setOrderItemDict([dish.id, orderItemNum - 1]))}
            >
              <MinusSquareTwoTone />
            </li>
          </ul>
        ]}
        hoverable={true}
      >
        <Meta
          title={
            <>
              {name}
              <p className={styles.price}>
                <MoneyCollectTwoTone />
                {price}
              </p>
            </>
          }
          description={<div title={description}>{description}</div>}
        />
      </Card>
    </div>
  )
}

export default MyCard
