package model

import (
	"gorm.io/gorm"
)

type Order struct {
	gorm.Model
	Price       uint
	Status      uint
	Destination string
	//Deadline      time.Time
	CustomerID    uint
	DeliverymanID uint
	EmployeeID    uint
}

type OrderItem struct {
	gorm.Model
	OrderID uint
	DishID  uint
}
