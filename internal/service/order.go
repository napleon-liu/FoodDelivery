package service

import (
	"elemei/internal/model"
	"elemei/internal/repository"
	"elemei/internal/typ/req"
	"elemei/internal/typ/resp"
)

func CreateOrder(req req.CreateOrderReq) error {
	var order = model.Order{
		Price:       req.Price,
		Status:      1,
		Destination: req.Destination,
		CustomerID:  req.CustomerID,
	}
	orderID, err := repository.CreateOrder(order)
	if err != nil {
		return err
	}
	var orderItemList []model.OrderItem
	for _, v := range req.OrderItemList {
		var orderItem = model.OrderItem{
			OrderID: orderID,
			DishID:  v.DishID,
		}
		orderItemList = append(orderItemList, orderItem)
	}
	err = repository.CreateOrderItemList(orderItemList)
	if err != nil {
		return err
	}
	return nil
}

func UpdateOrder(req req.UpdateOrderReq) error {
	if err := repository.UpdateOrderStatus(req); err != nil {
		return err
	}
	return nil
}

func GetOrderListByUserID(req req.GetOrderListByUserIDReq) (resp.OrderListResp, error) {
	orderList, err := repository.GetOrderListByUserID(req)
	if err != nil {
		return orderList, err
	}
	return orderList, nil
}

func GetOrderListByStatus(req req.GetOrderListByStatusReq) (resp.OrderListResp, error) {
	orderList, err := repository.GetOrderListByStatus(req)
	if err != nil {
		return orderList, err
	}
	return orderList, nil
}
