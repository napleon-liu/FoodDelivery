import { defaultPage, login } from '@/redux/modules/user'
import { useMyDispatch, useMySelector } from '@/redux/hook'

import Background from '@/components/Background'
import Logo from '@/components/Logo'

import { Link } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, message } from 'antd'

import styles from '@/assets/style/form.module.scss'
import { useMyNavigate } from '@/utils'
import { useState } from 'react'

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
}

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const navigateTo = useMyNavigate()
  const { userType } = useMySelector(state => state.user)
  const dispatch = useMyDispatch()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: { user: string; password: string; remember: boolean }) => {
    setLoading(true)
    const success = await dispatch(login({ ...values, userType }))

    setTimeout(async () => {
      setLoading(false)
      if (success) {
        navigateTo(
          `/user/${userType}/${defaultPage[userType]}`,
          async () => {
            await message.success('登录成功！', 1)
          },
          true
        )
      } else {
        await messageApi.warning('手机号或密码不正确！', 1)
      }
    }, 1000)
  }

  return (
    <>
      {contextHolder}
      <Background optionsName="foodOptions">
        <div className={styles.form}>
          <Logo className={styles.logo} />
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            validateTrigger="onBlur"
          >
            <Form.Item name="user" rules={[{ required: true, message: '请输入手机号!' }]}>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="手机号"
              />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>

              <Link
                to="/register"
                className="login-form-forgot"
                style={{ position: 'absolute', right: 0 }}
              >
                忘记密码？
              </Link>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button
                style={{ margin: '0 10% 0 0' }}
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
              >
                登录
              </Button>
              <Link to="/register">注册!</Link>
            </Form.Item>
          </Form>
        </div>
      </Background>
    </>
  )
}

export default Login
