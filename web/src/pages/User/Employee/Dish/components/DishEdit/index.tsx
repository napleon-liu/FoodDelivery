import React, { useEffect, useRef, useState } from 'react'
import type { DraggableData, DraggableEvent } from 'react-draggable'
import Draggable from 'react-draggable'
import { Form, Input, InputNumber, Modal, Upload, UploadFile, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { Dish, getDishList, updateDishList } from '@/redux/modules/dish'
import { useMyDispatch } from '@/redux/hook'
import ImgCrop from 'antd-img-crop'
import { RcFile } from 'antd/es/upload'

const DishEdit = ({
  dish,
  open,
  title,
  onClose
}: {
  dish: Dish
  open: boolean
  title: string
  onClose: () => void
}) => {
  const [disabled, setDisabled] = useState(true)
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 })
  const [fileList, setFileList] = useState<UploadFile[]>()

  const draggleRef = useRef<HTMLDivElement>(null)
  const [form] = Form.useForm()
  const dispatch = useMyDispatch()

  useEffect(() => {
    form.setFieldsValue(dish)

    const name = dish.pictureURL

    if (name) {
      setFileList([
        {
          uid: '111',
          name: name,
          thumbUrl: name && require(`@/assets/image/${name}`)
        }
      ])
    } else {
      setFileList(undefined)
    }
  }, [dish, form])

  const handleOk = async (e: React.MouseEvent<HTMLElement>) => {
    const data = form.getFieldsValue()
    const keys = Object.keys(data)

    if (keys.some(key => data[key] === '' || data[key] === 0)) {
      form.validateFields()
      return
    }

    if (keys.some(key => data[key] !== dish[key as keyof Dish])) {
      const success = await dispatch(updateDishList({ ...data, id: dish?.id }))
      if (success) {
        await message.success(`${title.substring(0, 2)}成功！`, 1)
      } else {
        await message.error(`${title.substring(0, 2)}失败！`, 1)
      }

      dispatch(getDishList())

      return onClose()
    }

    await message.warning('菜品未修改！', 1)
  }

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    onClose()
  }

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement
    const targetRect = draggleRef.current?.getBoundingClientRect()
    if (!targetRect) {
      return
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y)
    })
  }

  return (
    <>
      <Modal
        title={
          <div
            style={{
              fontSize: '20px',
              width: '100%',
              cursor: 'move',
              marginBottom: '20px'
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false)
              }
            }}
            onMouseOut={() => {
              setDisabled(true)
            }}
            onFocus={() => {}}
            onBlur={() => {}}
          >
            {title}
          </div>
        }
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        modalRender={modal => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <Form form={form} validateTrigger="onBlur">
          <Form.Item name={'name'} label={'菜品名称'} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={'pictureURL'} label={'菜品图片'} rules={[{ required: true }]}>
            <ImgCrop>
              <Upload
                listType="picture-card"
                customRequest={data => {
                  const { uid, name } = data.file as RcFile

                  const uploadFile: UploadFile = {
                    uid,
                    name,
                    thumbUrl: require(`@/assets/image/${name}`)
                  }
                  setFileList([uploadFile])
                  form.setFieldValue('pictureURL', name)
                }}
                onRemove={() => {
                  setFileList([])
                  form.setFieldValue('pictureURL', '')
                }}
                maxCount={1}
                fileList={fileList}
              >
                <UploadOutlined />
              </Upload>
            </ImgCrop>
          </Form.Item>
          <Form.Item name={'price'} label={'菜品价格'} rules={[{ required: true }]}>
            <InputNumber prefix={'￥'} min={1} max={100} />
          </Form.Item>
          <Form.Item name={'description'} label={'菜品描述'} rules={[{ required: true }]}>
            <Input.TextArea rows={6} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default DishEdit
