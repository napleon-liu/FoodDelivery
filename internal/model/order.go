package model

import (
	"gorm.io/gorm"
	"time"
)

type Order struct {
	gorm.Model
	Price         uint
	Name          string
	Status        uint
	Destination   string
	Deadline      time.Time
	CustomerID    uint
	DeliverymanID uint
	DishID        uint
}

type OrderItem struct {
	gorm.Model
	OrderID uint
	DishID  uint
}
