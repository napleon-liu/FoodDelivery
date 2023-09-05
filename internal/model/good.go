package model

import "gorm.io/gorm"

type Good struct {
	gorm.Model
	Price uint
	Name  string
}
