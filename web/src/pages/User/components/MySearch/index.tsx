import { useMemo, useRef, useState } from 'react'
import { InputRef, List, Popover, Tag } from 'antd'
import { EnvironmentTwoTone, AppstoreTwoTone, AccountBookTwoTone } from '@ant-design/icons'
import Search from 'antd/es/input/Search'
import classNames from 'classnames'
import { useMyDispatch, useMySelector } from '@/redux/hook'
import { setKeyword } from '@/redux/modules/other'
import { UserType } from '@/redux/modules/user'

import styles from './index.module.scss'
import { debounce } from 'lodash-es'
import { useMyNavigate } from '@/utils'

const pageDatas = {
  [UserType.Customer]: [
    {
      tag: '当前页面',
      icon: <EnvironmentTwoTone />,
      to: null
    },
    {
      tag: '首页',
      icon: <AppstoreTwoTone />,
      to: 'home'
    },
    {
      tag: '订单',
      icon: <AccountBookTwoTone />,
      to: 'order'
    }
  ],
  [UserType.Employee]: [
    {
      tag: '当前页面',
      icon: <EnvironmentTwoTone />,
      to: null
    },
    {
      tag: '菜单',
      icon: <AppstoreTwoTone />,
      to: 'dish'
    },
    {
      tag: '订单',
      icon: <AccountBookTwoTone />,
      to: 'order'
    }
  ],
  [UserType.Rider]: [
    {
      tag: '当前页面',
      icon: <EnvironmentTwoTone />,
      to: null
    },
    {
      tag: '订单',
      icon: <AccountBookTwoTone />,
      to: 'order'
    }
  ]
}

const MySearch = () => {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(0)
  const search = useRef<InputRef>(null)
  const [searchValue, setSearchValue] = useState('')
  const navigateTo = useMyNavigate()
  const [hoverPopover, setHoverPopover] = useState(false)

  const { userType, id } = useMySelector(state => state.user)
  const dispatch = useMyDispatch()

  const pageData = useMemo(() => {
    return pageDatas[userType as UserType.Customer | UserType.Employee | UserType.Rider]
  }, [userType])

  const handleChangle = debounce((e: { target: { value: string } }) => {
    const value = e.target.value
    setSearchValue(e.target.value)

    if (value === '') {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }, 300)

  const handleSearch = (value: string) => {
    dispatch(setKeyword(value))

    if (pageData[selected].to) {
      navigateTo(`/user/${userType}/${pageData[selected].to}`)
    }
    search.current!.blur()
  }

  return (
    <>
      <Popover
        content={
          <div
            className={styles.content}
            onMouseEnter={() => setHoverPopover(true)}
            onMouseLeave={() => setHoverPopover(false)}
          >
            <h2>{'搜索'}</h2>
            <List
              itemLayout="vertical"
              dataSource={pageData as { tag: string; icon: any; to: string }[]}
              renderItem={(item, index) => (
                <>
                  <List.Item
                    onClick={() => {
                      handleSearch(searchValue)
                      setOpen(false)
                      setSelected(0)
                    }}
                    onMouseEnter={() => setSelected(index)}
                    className={classNames({
                      [styles.selected]: selected === index,
                      [styles.current]: index === 0
                    })}
                  >
                    <div>
                      <span className={styles['search-value']}>{searchValue}</span>
                      <Tag color={'success'} icon={item.icon} bordered={false}>
                        {item.tag}
                      </Tag>
                    </div>
                  </List.Item>
                  {index === 0 && <div className={styles.hr} />}
                </>
              )}
            />
          </div>
        }
        open={open}
        arrow={false}
      >
        <Search
          disabled={id === 0}
          placeholder="今天吃点啥？"
          allowClear
          onBlur={() => {
            if (!hoverPopover) {
              setOpen(false)
              setSelected(0)
            }
          }}
          onFocus={() => {
            if (searchValue !== '') {
              setOpen(true)
            }
          }}
          onSearch={handleSearch}
          size="large"
          style={{ width: '30vw', display: 'flex' }}
          ref={search}
          onChange={e => handleChangle(e)}
        />
      </Popover>
    </>
  )
}

export default MySearch
