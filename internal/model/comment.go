package model

import "gorm.io/gorm"

type Comment struct {
	gorm.Model
	Content    string
	Rating     uint
	DishID     uint
	CustomerID uint
	CommentID  uint
}
