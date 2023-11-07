package repository

import (
	"FoodDelivery/internal/model"
	"FoodDelivery/internal/repository/mysql"
	"FoodDelivery/internal/typ/resp"
)

func CreateComment(comment model.Comment) error {
	return mysql.Client.Create(&comment).Error
}

func GetCommentByDishID(dishID uint) (resp.GetCommentResp, error) {
	var commentList []model.Comment
	db := mysql.Client.Model(&model.Comment{}).Where("dish_id = ?", dishID).Find(&commentList)
	if db.Error != nil {
		return resp.GetCommentResp{}, db.Error
	}
	var getCommentResp resp.GetCommentResp
	for _, v := range commentList {
		var comment = resp.Comment{
			CommentID:  v.ID,
			Content:    v.Content,
			Rating:     v.Rating,
			DishID:     v.DishID,
			CustomerID: v.CustomerID,
		}
		getCommentResp.CommentList = append(getCommentResp.CommentList, comment)
	}
	return getCommentResp, nil
}
