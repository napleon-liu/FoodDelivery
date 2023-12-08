package req

type OrderItem struct {
	DishID uint `json:"dishID"`
}

type CreateOrderReq struct {
	Price         uint        `json:"price"`
	Destination   string      `json:"destination"`
	CustomerID    uint        `json:"customerID"`
	OrderItemList []OrderItem `json:"orderItemList"`
}

type UpdateOrderReq struct {
	OrderID uint `json:"orderID"'`
	Role    uint `json:"role"`
	UserID  uint `json:"userID"`
	Status  uint `json:"status"`
}

type GetOrderListByStatusReq struct {
	Role   uint   `json:"role"`
	Status []uint `json:"status"`
}

type GetOrderListByUserIDReq struct {
	Role   uint `json:"role"`
	UserID uint `json:"userID"`
}
