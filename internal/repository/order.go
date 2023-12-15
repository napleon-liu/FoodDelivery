package repository

import (
	"elemei/internal/model"
	"elemei/internal/repository/mysql"
	"elemei/internal/typ/req"
	"elemei/internal/typ/resp"
	"errors"
	"gorm.io/gorm"
)

func CreateOrder(order model.Order) (uint, error) {
	db := mysql.Client.Create(&order)
	if db.Error != nil {
		return 1, errors.New("create order fail")
	}
	var lastOrder model.Order
	mysql.Client.Last(&lastOrder)
	return lastOrder.ID, nil
}

func CreateOrderItemList(orderItemList []model.OrderItem) error {
	for _, v := range orderItemList {
		db := mysql.Client.Create(&v)
		if db.Error != nil {
			return db.Error
		}
	}
	return nil
}

func UpdateOrderStatus(req req.UpdateOrderReq) error {
	var db *gorm.DB
	switch req.Role {
	case 1:
		db = mysql.Client.Model(&model.Order{}).Where("id = ?", req.OrderID).Update("status", req.Status)
	case 2:
		db = mysql.Client.Model(&model.Order{}).Where("id = ?", req.OrderID).Update("employee_id", req.UserID)
		db = mysql.Client.Model(&model.Order{}).Where("id = ?", req.OrderID).Update("status", req.Status)
	case 3:
		db = mysql.Client.Model(&model.Order{}).Where("id = ?", req.OrderID).Update("deliveryman_id", req.UserID)
		db = mysql.Client.Model(&model.Order{}).Where("id = ?", req.OrderID).Update("status", req.Status)
	default:
		return errors.New("no such role")
	}
	if db.Error != nil {
		return db.Error
	}
	return nil
}

func GetOrderListByUserID(req req.GetOrderListByUserIDReq) (resp.OrderListResp, error) {
	var orderListResp resp.OrderListResp
	var orderList []model.Order
	switch req.Role {
	case 1:
		mysql.Client.Where("customer_id = ?", req.UserID).Find(&orderList)
	case 2:
		mysql.Client.Where("employee_id = ?", req.UserID).Find(&orderList)
	case 3:
		mysql.Client.Where("deliveryman_id = ?", req.UserID).Find(&orderList)
	default:
		return orderListResp, errors.New("wrong role")
	}
	for _, order := range orderList {
		var orderResp = resp.Order{
			Price:         order.Price,
			ID:            order.ID,
			CreateAt:      order.CreatedAt,
			UpdateAt:      order.UpdatedAt,
			CustomerID:    order.CustomerID,
			DeliverymanID: order.DeliverymanID,
			EmployeeID:    order.EmployeeID,
			Destination:   order.Destination,
			Status:        order.Status,
		}
		var orderItemList []model.OrderItem
		mysql.Client.Where("order_id = ?", order.ID).Find(&orderItemList)
		for _, orderItem := range orderItemList {
			var dish model.Dish
			mysql.Client.Where("id = ?", orderItem.DishID).First(&dish)
			var dishResp = resp.DishResp{
				Id:         dish.ID,
				Price:      dish.Price,
				Name:       dish.Name,
				PictureURL: dish.PictureURL,
			}
			orderResp.DishRespList = append(orderResp.DishRespList, dishResp)
		}
		orderListResp.OrderList = append(orderListResp.OrderList, orderResp)
	}
	return orderListResp, nil
}

func GetOrderListByStatus(req req.GetOrderListByStatusReq) (resp.OrderListResp, error) {
	var orderListResp resp.OrderListResp
	for _, status := range req.Status {
		var orderList []model.Order
		mysql.Client.Where("status = ?", status).Find(&orderList)
		if len(orderList) == 0 {
			continue
		}
		for _, order := range orderList {
			var orderResp = resp.Order{
				Price:         order.Price,
				ID:            order.ID,
				CreateAt:      order.CreatedAt,
				UpdateAt:      order.UpdatedAt,
				CustomerID:    order.CustomerID,
				DeliverymanID: order.DeliverymanID,
				EmployeeID:    order.EmployeeID,
				Destination:   order.Destination,
				Status:        order.Status,
			}
			var orderItemList []model.OrderItem
			mysql.Client.Where("order_id = ?", order.ID).Find(&orderItemList)
			for _, orderItem := range orderItemList {
				var dish model.Dish
				mysql.Client.Where("id = ?", orderItem.DishID).First(&dish)
				if dish.Price == 0 {
					continue
				}
				var dishResp = resp.DishResp{
					Id:         dish.ID,
					Price:      dish.Price,
					Name:       dish.Name,
					PictureURL: dish.PictureURL,
				}
				orderResp.DishRespList = append(orderResp.DishRespList, dishResp)
			}
			orderListResp.OrderList = append(orderListResp.OrderList, orderResp)
		}
	}
	return orderListResp, nil
}
