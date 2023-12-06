package resp

import "time"

type Order struct {
	DishRespList  []DishResp `json:"dishRespList"`
	ID            uint       `json:"id"`
	CreateAt      time.Time  `json:"createAt"`
	UpdateAt      time.Time  `json:"updateAt"`
	Price         uint       `json:"price"`
	Destination   string     `json:"destination"`
	Status        uint       `json:"status"`
	CustomerID    uint       `json:"customerID"`
	DeliverymanID uint       `json:"deliverymanID"`
	EmployeeID    uint       `json:"employeeID"`
}

type OrderListResp struct {
	OrderList []Order `json:"orderList"`
}
