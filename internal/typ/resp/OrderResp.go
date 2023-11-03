package resp

type Order struct {
	DishRespList []DishResp `json:"dishRespList"`
	Price        uint       `json:"price"`
	Destination  string     `json:"destination"`
}

type OrderListResp struct {
	OrderList []Order `json:"orderList"`
}
