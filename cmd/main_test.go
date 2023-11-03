package main

import (
	"FoodDelivery/internal/model"
	"FoodDelivery/internal/repository/mysql"
	"testing"
)

func TestGenerate(t *testing.T) {
	_ = Init()
	migrator := mysql.Client.Migrator()

	_ = migrator.DropTable(&model.Order{})
	_ = migrator.DropTable(&model.Comment{})
	_ = migrator.DropTable(&model.Customer{})
	_ = migrator.DropTable(&model.Stuff{})
	_ = migrator.DropTable(&model.Deliveryman{})
	_ = migrator.DropTable(&model.Dish{})
	_ = migrator.DropTable(&model.User{})
	_ = migrator.DropTable(&model.OrderItem{})

	_ = migrator.CreateTable(&model.Order{})
	_ = migrator.CreateTable(&model.Comment{})
	_ = migrator.CreateTable(&model.Customer{})
	_ = migrator.CreateTable(&model.Stuff{})
	_ = migrator.CreateTable(&model.Deliveryman{})
	_ = migrator.CreateTable(&model.Dish{})
	_ = migrator.CreateTable(&model.User{})
	_ = migrator.CreateTable(&model.OrderItem{})
}
