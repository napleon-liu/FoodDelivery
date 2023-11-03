package model

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name     string
	Session  string
	Account  string
	Password string
	Role     int // 1. customer 2. employee 3. deliveryman
	Avatar   string
}

type Customer struct {
	User
}

type Deliveryman struct {
	User
}

type Stuff struct {
	User
}
