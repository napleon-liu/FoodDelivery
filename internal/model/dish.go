package model

import "gorm.io/gorm"

type Dish struct {
	gorm.Model
	Price       uint
	Name        string
	PictureURL  string
	Description string
}
