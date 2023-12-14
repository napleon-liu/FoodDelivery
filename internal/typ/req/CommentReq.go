package req

type CreateCommentReq struct {
	Content    string `json:"content"`
	Rating     uint   `json:"rating"`
	OrderID    uint   `json:"orderID"`
	CustomerID uint   `json:"customerID"`
}

type GetCommentReq struct {
	OrderID uint `json:"orderID"`
}
