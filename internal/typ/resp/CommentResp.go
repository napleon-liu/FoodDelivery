package resp

type Comment struct {
	CommentID  uint   `json:"commentID"`
	Content    string `json:"content"`
	Rating     uint   `json:"rating"`
	DishID     uint   `json:"dishID"`
	CustomerID uint   `json:"customerID"`
}

type GetCommentResp struct {
	CommentList []Comment
}
