package service

import (
	"FoodDelivery/internal/model"
	"FoodDelivery/internal/repository"
	"FoodDelivery/internal/typ/req"
	"FoodDelivery/internal/typ/resp"
)

func CreateComment(req req.CreateCommentReq) error {
	var comment = model.Comment{
		Content:    req.Content,
		Rating:     req.Rating,
		DishID:     req.DishID,
		CustomerID: req.CustomerID,
	}
	return repository.CreateComment(comment)
}

func GetCommentList(commentReq req.GetCommentReq) (resp.GetCommentResp, error) {
	dishID := commentReq.DishID
	return repository.GetCommentByDishID(dishID)
}
