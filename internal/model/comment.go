package model

import "gorm.io/gorm"

type Comment struct {
	gorm.Model
	Content    string
	Rating     uint
	OrderID    uint
	CustomerID uint
}
