package model

import (
	"time"

	"gorm.io/gorm"
)

type Transaction struct {
	gorm.Model
	Price       uint
	Name        string
	Status      uint
	Destination string
	Deadline    time.Time
}
