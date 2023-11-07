package req

type CreateCommentReq struct {
	Content    string `json:"content"`
	Rating     uint   `json:"rating"`
	DishID     uint   `json:"dishID"`
	CustomerID uint   `json:"customerID"`
}

type GetCommentReq struct {
	DishID uint `json:"dishID"`
}
