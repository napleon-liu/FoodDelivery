import { getUserInfo, useMyNavigate } from '@/utils'
import { Menu, MenuProps } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export interface ItemParams {
  label: React.ReactNode
  key: string
  icon?: React.ReactNode
  children?: ItemParams[]
  type?: 'group'
}

type MenuItem = Required<MenuProps>['items'][number]

const getItem = ({ label, key, icon, children, type }: ItemParams): MenuItem => {
  return {
    key,
    icon,
    children: children && children.map(item => getItem(item)),
    label,
    type
  } as MenuItem
}

const MyMenu = ({ menuName, choice }: { menuName: string; choice: string }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([{ key: '' }])
  const [selectedKey, setSelectedKey] = useState('')
  const navigateTo = useMyNavigate()
  const location = useLocation()

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const menuItemList = (await import(`./${menuName}.tsx`)).default[choice]
        setMenuItems(menuItemList.map((item: ItemParams) => getItem(item)))
      } catch (error) {
        console.error('Error loading dynamic module:', error)
      }
    }
    loadMenu()
  }, [choice, menuName])

  // 路由变化引发按钮选择
  useEffect(() => {
    const key = location.pathname.split('/')[3]
    menuItems.forEach(item => {
      if (item?.key === key) {
        setSelectedKey(key)
        return
      }
    })
  }, [location.pathname, menuItems])

  const handleSelect = ({ key }: { key: string }) => {
    setSelectedKey(key)

    const [id] = getUserInfo(['id'])

    if (!id || +id === 0) {
      navigateTo('/login')
      return
    }
    navigateTo(`/user/${choice}/${key}`)
  }

  return (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={[selectedKey]}
      items={menuItems}
      onSelect={handleSelect}
    />
  )
}

export default MyMenu
