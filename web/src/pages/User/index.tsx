import React, { useState } from 'react'

import Logo from '@/components/Logo'
import MyMenu from './components/MyMenu'
import MySearch from './components/MySearch'

import { logOut } from '@/redux/modules/user'
import { useMySelector, useMyDispatch } from '@/redux/hook'

import {
  LeftSquareTwoTone,
  RightSquareTwoTone,
  LogoutOutlined,
  setTwoToneColor,
  StepBackwardOutlined,
  StepForwardOutlined,
  UserOutlined
} from '@ant-design/icons'
import {
  Layout,
  theme,
  Space,
  Divider,
  Button,
  Row,
  Col,
  Popconfirm,
  Tooltip,
  Typography,
  Avatar
} from 'antd'
import { Outlet } from 'react-router-dom'

import styles from './index.module.scss'
import classNames from 'classnames'
import { useMyNavigate } from '@/utils'

const { Header, Content, Footer, Sider } = Layout

const User: React.FC = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const [contentMargin, setContentMargin] = useState(205)
  const [collapsed, setCollapsed] = useState(false)
  const { userType, token, name } = useMySelector(state => state.user)
  const dispatch = useMyDispatch()
  const navigateTo = useMyNavigate()

  const handleTrigger = (broken: boolean) => {
    setCollapsed(broken)
    setContentMargin(broken ? 85 : 205)
  }

  setTwoToneColor('#2aaa8a')

  const backToEnter = async () => {
    navigateTo('/enter', () => dispatch(logOut()))
  }

  return (
    <div>
      <Layout hasSider className={styles.main}>
        <div
          className={classNames('ant-layout-sider-trigger', [styles.trigger])}
          style={{ width: contentMargin + 2 }}
          onClick={() => handleTrigger(!collapsed)}
        >
          {!collapsed ? (
            <LeftSquareTwoTone twoToneColor="#2AAA8A" />
          ) : (
            <RightSquareTwoTone twoToneColor="#2AAA8A" />
          )}
        </div>
        <Sider
          breakpoint="lg"
          collapsedWidth="80"
          trigger={null}
          collapsible
          collapsed={collapsed}
          onBreakpoint={(broken: boolean) => handleTrigger(broken)}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            marginTop: '64px'
          }}
        >
          <MyMenu menuName="Sider" choice={userType} />
        </Sider>
        <Layout
          className={classNames('site-layout', [styles.content])}
          style={{ marginLeft: contentMargin }}
        >
          <Header>
            <Row
              align={'middle'}
              className={'row'}
              style={{ padding: 0, background: colorBgContainer }}
            >
              <Col span={3}>
                <Logo style={{ marginLeft: 10 }} />
              </Col>
              <Col span={3}>
                {(() => {
                  const len = window.history.length
                  const idx = window.history.state.idx

                  const backwardDisabled = idx <= 2
                  const forwardDisabled = len - idx <= 2
                  return (
                    <>
                      <Tooltip title={!backwardDisabled && '后退'}>
                        <Button
                          className={styles['step-xward']}
                          type={'text'}
                          icon={
                            <StepBackwardOutlined
                              style={{ color: backwardDisabled ? '#ddd' : '#2aaa8a' }}
                            />
                          }
                          disabled={backwardDisabled}
                          onClick={() => {
                            window.history.back()
                          }}
                        />
                      </Tooltip>
                      <Tooltip title={!forwardDisabled && '前进'}>
                        <Button
                          className={styles['step-xward']}
                          type={'text'}
                          icon={
                            <StepForwardOutlined
                              style={{ color: forwardDisabled ? '#ddd' : '#2aaa8a' }}
                            />
                          }
                          disabled={forwardDisabled}
                          onClick={() => {
                            window.history.go(1)
                          }}
                        />
                      </Tooltip>
                    </>
                  )
                })()}
              </Col>
              <Col span={10}>
                <MySearch />
              </Col>
              <Col span={token !== '' ? 5 : 0}>
                <span>
                  <Avatar style={{ backgroundColor: '#2aaa8a' }} icon={<UserOutlined />} />
                </span>
                <span className={styles.wel}>
                  <span>{'欢迎您，'}</span>
                  <Typography.Text ellipsis strong underline>
                    {name}
                  </Typography.Text>
                </span>
              </Col>
              <Col span={3}>
                <Space size={1} split={<Divider type="vertical" />}>
                  {token === '' ? (
                    <>
                      <Button
                        onClick={() => {
                          navigateTo('/login')
                        }}
                        type={'primary'}
                      >
                        {'登录'}
                      </Button>
                      <Button
                        onClick={() => {
                          navigateTo('/register')
                        }}
                      >
                        {' 注册'}
                      </Button>
                      <Button onClick={backToEnter} danger>
                        {'返回入口'}
                      </Button>
                    </>
                  ) : (
                    <Popconfirm
                      title="确定要退出登录吗?"
                      cancelButtonProps={{ style: { left: -35 } }}
                      cancelText="取消"
                      okText="确认"
                      onConfirm={backToEnter}
                    >
                      <Button danger>
                        <LogoutOutlined />
                        {'退出登录'}
                      </Button>
                    </Popconfirm>
                  )}
                </Space>
              </Col>
            </Row>
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, textAlign: 'center', background: colorBgContainer }}>
              <Outlet />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Elemei ©2023 Created by ZCL</Footer>
        </Layout>
      </Layout>
    </div>
  )
}

export default User
