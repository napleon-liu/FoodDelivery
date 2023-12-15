import { useEffect, useState } from 'react'
import { useMyDispatch, useMySelector } from '@/redux/hook'
import { getDishList, Dish as DataType, deleteDish } from '@/redux/modules/dish'
import { Popconfirm, Table, message, Image, Button, InputNumber, Form } from 'antd'
import { ColumnsType } from 'antd/es/table'
import {
  EditTwoTone,
  DeleteTwoTone,
  MoneyCollectTwoTone,
  PlusCircleTwoTone
} from '@ant-design/icons'

import DishEdit from './components/DishEdit'

import styles from './index.module.scss'

const initialDish: DataType = {
  id: 0,
  name: '',
  pictureURL: '',
  description: '',
  price: 1
}

const Dish = () => {
  const { dishList } = useMySelector(state => state.dish)
  const { keyword } = useMySelector(state => state.other)
  const dispatch = useMyDispatch()

  const [dishes, setDishes] = useState(dishList)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [dishEditTitle, setDishEditTitle] = useState('')
  const [editingDish, setEditingDish] = useState<DataType>(initialDish)
  const [dishEditOpen, setDishEditOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 100])

  const [form] = Form.useForm()

  useEffect(() => {
    dispatch(getDishList())
    const interval = setInterval(() => {
      dispatch(getDishList())
    }, 60000)

    return () => {
      clearInterval(interval)
    }
  }, [dispatch, dishList])

  //filter
  useEffect(() => {
    if (dishList.length !== 0) {
      const newDishes = dishList.filter(
        dish =>
          (dish.name.includes(keyword) || dish.description.includes(keyword)) &&
          dish.price >= priceRange[0] &&
          dish.price <= priceRange[1]
      )
      setDishes(newDishes as DataType[])
    }
  }, [dishList, keyword, priceRange])

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }

  const handleEdit = (record: DataType) => {
    setDishEditTitle('修改菜品')
    setEditingDish(record)
    setDishEditOpen(true)
  }

  const handleCreate = () => {
    setDishEditTitle('添加菜品')
    setEditingDish({} as DataType)
    setDishEditOpen(true)
  }

  const handleDelete = async (ids: number[]) => {
    const success = await dispatch(deleteDish(ids))

    if (success) {
      setSelectedRowKeys(selectedRowKeys.filter(key => !ids.includes(key as number)))
      await message.success('删除成功！', 1)
    } else {
      await message.error('删除失败！', 1)
    }

    dispatch(getDishList())
  }

  const columns: ColumnsType<DataType> = [
    {
      title: '菜品图片',
      dataIndex: 'pictureURL',
      key: 'pictureURL',
      width: '10%',
      render: pictureURL => (
        <Image
          alt={'菜品图片'}
          src={pictureURL.startsWith('http') ? pictureURL : require(`@/assets/image/${pictureURL}`)}
          width={'5.5vmax'}
          height={'5.5vmax'}
          placeholder={<Image width={'5.5vmax'} height={'5.5vmax'} />}
        />
      )
    },
    {
      title: '菜品名称',
      dataIndex: 'name',
      key: 'name',
      width: '16%',
      render: text => <strong>{text}</strong>
    },
    {
      title: '菜品价格',
      dataIndex: 'price',
      key: 'price',
      width: '13%',
      render: price => (
        <>
          <p className={styles.price}>
            <MoneyCollectTwoTone />
            {price}
          </p>
        </>
      ),
      sorter: (a, b) => a.price - b.price,
      filterDropdown: ({ confirm, clearFilters, close }) => {
        return (
          <div className={styles['price-filter']}>
            <Form layout={'inline'} form={form} className={styles.form}>
              <Form.Item name={'min'}>
                <InputNumber prefix={'￥'} min={0} max={100} />
              </Form.Item>
              <span className={styles.sign}>~</span>
              <Form.Item name={'max'}>
                <InputNumber prefix={'￥'} min={0} max={100} />
              </Form.Item>
            </Form>
            <p className={styles['filter-actions']}>
              <Button
                type={'primary'}
                onClick={() => {
                  const range = [form.getFieldsValue()['min'], form.getFieldsValue()['max']]
                  if (range[0] >= range[1]) {
                    return message.warning('最小值应当小于最大值！', 2)
                  }
                  setPriceRange(range)
                  confirm()
                }}
              >
                筛选
              </Button>
              <Button
                onClick={() => {
                  setPriceRange([0, 100])
                  confirm()
                }}
              >
                重置
              </Button>
            </p>
          </div>
        )
      },
      onFilterDropdownOpenChange: visible => {
        if (visible) {
          form.setFieldsValue({ min: priceRange[0], max: priceRange[1] })
        }
      }
    },
    {
      title: '菜品描述',
      dataIndex: 'description',
      key: 'description',
      width: '40%',
      ellipsis: true
    },
    {
      title: '',
      dataIndex: 'actions',
      key: 'actions',
      width: '15%',
      render: (_, record) => (
        <div className={styles.actions}>
          <EditTwoTone
            key="编辑"
            title="编辑"
            onClick={() => {
              handleEdit(record)
            }}
          />
          <Popconfirm
            title="删除菜品"
            description="是否确认删除当前菜品?"
            onConfirm={() => handleDelete([record.id])}
            okText="确认"
            cancelText="取消"
          >
            <DeleteTwoTone key="删除" title="删除" twoToneColor="red" />
          </Popconfirm>
        </div>
      )
    }
  ]

  return (
    <>
      <DishEdit
        dish={editingDish}
        title={dishEditTitle}
        open={dishEditOpen}
        onClose={() => {
          setDishEditOpen(false)
          setTimeout(() => {
            setEditingDish(initialDish)
          }, 500)
        }}
      />
      <div className={styles['content-header']}>
        <Popconfirm
          title="删除菜品"
          description="是否确认删除所有当前选中的菜品?"
          onConfirm={() => handleDelete(selectedRowKeys as number[])}
          okText="确认"
          cancelText="取消"
        >
          <Button
            className={styles.delete}
            disabled={selectedRowKeys.length === 0}
            type="primary"
            danger
          >
            删除选中
          </Button>
        </Popconfirm>
        <Button
          className={styles.create}
          type={'primary'}
          icon={<PlusCircleTwoTone />}
          onClick={handleCreate}
        >
          添加菜品
        </Button>
      </div>

      <Table
        rowSelection={rowSelection}
        rowKey={'id'}
        columns={columns}
        dataSource={dishes}
        bordered
      />
    </>
  )
}

export default Dish
