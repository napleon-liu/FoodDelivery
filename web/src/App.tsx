import { RouterProvider } from 'react-router-dom'
import router from './router'
import { ConfigProvider, Spin } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { useMySelector } from './redux/hook'

function App() {
  const { spinning } = useMySelector(state => state.other)
  return (
    <>
      <ConfigProvider
        locale={zhCN}
        theme={{
          token: { colorPrimary: '#2AAA8A' },
          components: {
            Menu: {
              darkItemBg: '#2AAA8A',
              darkItemHoverBg: '#35C5AD',
              darkItemSelectedBg: '#40E0D0',
              darkItemColor: '#98FB98',
              darkItemSelectedColor: '#ECFFDC',
              darkItemHoverColor: '#ECFFDC',
              itemHoverBg: '#ECFFDC',
              itemSelectedBg: '#efe',
              itemColor: '#AFE1AF',
              itemSelectedColor: '#2AAA8A',
              itemHoverColor: '#4CBB17',
              itemHeight: 60,
              fontSize: 20,
              iconSize: 20,
              iconMarginInlineEnd: 20,
              fontFamily: '新宋体',
              subMenuItemBg: '#fafffa',
              subMenuItemBorderRadius: 10,
              collapsedIconSize: 30
            },
            Layout: {
              siderBg: '#fffcff'
            },
            Table: {
              headerBg: '#e1ffe1',
              headerSortActiveBg: '#cfc',
              headerSortHoverBg: '#cfc',
              borderColor: '#96DED1',
              rowHoverBg: '#f1fff1',
              rowSelectedBg: '#f1fff1',
              rowSelectedHoverBg: '#eeffe8',
              bodySortBg: '#f4ffef'
            }
          }
        }}
      >
        <RouterProvider router={router} />
        <Spin spinning={spinning} fullscreen />
      </ConfigProvider>
    </>
  )
}

export default App
