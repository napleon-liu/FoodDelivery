package repository

import (
	"FoodDelivery/internal/model"
	"FoodDelivery/internal/repository/mysql"
)

func GetAllDishes() ([]model.Dish, error) {
	var dishes []model.Dish
	if result := mysql.Client.Find(&dishes); result.Error != nil {
		return nil, result.Error
	}
	return dishes, nil
}

func UpdateDish(dish model.Dish, updatesMap map[string]interface{}) error {
	// 选择性更新字段
	return mysql.Client.Model(&dish).
		Select("name", "price", "picture_url", "description").Updates(updatesMap).Error
}

func CreateDish(dish model.Dish) (uint, error) {
	if result := mysql.Client.Create(&dish); result.Error != nil {
		return 0, result.Error
	}
	return dish.ID, nil
}

func DeleteDish(ids []uint) error {
	for id := range ids {
		err := mysql.Client.Delete(&model.Dish{}, id).Error
		if err != nil {
			return err
		}
	}
	return nil
}

func GetDishByID(id uint) (model.Dish, error) {
	var dish model.Dish
	if result := mysql.Client.First(&dish, id); result.Error != nil {
		return model.Dish{}, result.Error
	}
	return dish, nil
}
