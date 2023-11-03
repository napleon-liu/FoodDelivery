package model

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name     string
	Session  string
	Account  string
	Password string
	Role     int
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
