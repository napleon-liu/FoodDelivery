package service

import (
	"elemei/internal/model"
	"elemei/internal/repository"
	"elemei/internal/typ/req"
	"elemei/internal/typ/resp"
)

func CreateComment(req req.CreateCommentReq) error {
	var comment = model.Comment{
		Content:    req.Content,
		Rating:     req.Rating,
		OrderID:    req.OrderID,
		CustomerID: req.CustomerID,
	}
	return repository.CreateComment(comment)
}

func GetCommentList(commentReq req.GetCommentReq) (resp.GetCommentResp, error) {
	orderID := commentReq.OrderID
	return repository.GetCommentByOrderID(orderID)
}
