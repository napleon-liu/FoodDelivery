import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Background from '@/components/Background'
import Logo from '@/components/Logo'

import { role } from '@/redux/modules/user'
import { useMySelector } from '@/redux/hook'
import { registerApi } from '@/apis/user'

import { Button, Checkbox, Form, Input, Select, message } from 'antd'

import styles from '@/assets/style/form.module.scss'
import classNames from 'classnames'
import { useMyNavigate } from '@/utils'

const { Option } = Select

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}

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

const Register: React.FC = () => {
  const [hover, setHover] = useState(false)
  const { userType } = useMySelector(state => state.user)
  const navigateTo = useMyNavigate()
  let select = false

  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    const { username: name, phone: account, password } = values
    const data = { name, account, password, role: role[userType] }

    const register = async () => {
      const res = await registerApi(data)

      if (res.status === 200) {
        navigateTo('/login', async () => await message.success('注册成功！', 1), true)
      } else {
        await message.error('注册失败！', 1)
      }
    }
    register()
  }

  const changeHover = (open: boolean) => {
    if (open) {
      if (hover) {
        select = true
      } else setHover(true)
    } else {
      if (select) {
        select = false
      } else setHover(false)
    }
  }

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }} onDropdownVisibleChange={changeHover}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  )

  return (
    <Background optionsName="foodOptions">
      <div className={classNames(styles.form, styles.register, { [styles.hover]: hover })}>
        <Logo className={styles.logo} />
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          initialValues={{ prefix: '+86' }}
          validateTrigger="onBlur"
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名!', whitespace: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="密码"
            rules={[
              {
                required: true,
                message: '请输入密码!'
              }
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="确认密码"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请确认密码!'
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('密码不一致!'))
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="gender"
            label="性别"
            rules={[{ required: true, message: '请选择性别!' }]}
          >
            <Select placeholder="选择你的性别" onDropdownVisibleChange={changeHover}>
              <Option value="male">男性</Option>
              <Option value="female">女性</Option>
              <Option value="other">其他</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="phone"
            label="电话号码"
            rules={[{ required: true, message: '请输入电话号码!' }]}
          >
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            className={styles.check}
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('请阅读并同意用户协议'))
              }
            ]}
          >
            <Checkbox style={{ fontSize: 10 }}>
              我已阅读并同意 <Link to="">《饿了没用户协议》</Link>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button style={{ margin: '0 10% 0 0' }} type="primary" htmlType="submit">
              注册
            </Button>
            <Link to="/login">登录</Link>
          </Form.Item>
        </Form>
      </div>
    </Background>
  )
}

export default Register
