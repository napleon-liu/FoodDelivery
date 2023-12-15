import { UserType } from '@/redux/modules/user'

import { FundTwoTone, AccountBookTwoTone, AppstoreTwoTone, HomeTwoTone } from '@ant-design/icons'

const menuItems = {
  [UserType.Customer]: [
    { label: '首页', key: 'home', icon: <HomeTwoTone /> },
    { label: '我的订单', key: 'order', icon: <AccountBookTwoTone /> }
  ],
  [UserType.Rider]: [{ label: '订单列表', key: 'order', icon: <AccountBookTwoTone /> }],
  [UserType.Employee]: [
    { label: '仪表盘', key: 'panel', icon: <FundTwoTone /> },
    {
      label: '菜单',
      key: 'dish',
      icon: <AppstoreTwoTone />
    },
    { label: '订单', key: 'order', icon: <AccountBookTwoTone /> }
  ],
  [UserType.Undefined]: []
}

export default menuItems
