package service

import (
	"FoodDelivery/internal/model"
	"FoodDelivery/internal/repository"
	"FoodDelivery/internal/typ/req"
	"FoodDelivery/internal/typ/resp"
)

func GetAllDishes() ([]resp.DishResp, error) {
	dishes, err := repository.GetAllDishes()
	if err != nil {
		return nil, err
	}

	var dishResponses []resp.DishResp
	for _, dish := range dishes {
		dishResponses = append(dishResponses, resp.DishResp{
			Id:         dish.ID,
			Price:      dish.Price,
			Name:       dish.Name,
			PictureURL: dish.PictureURL,
		})
	}

	return dishResponses, nil
}

func UpdateDish(req req.UpdateDishReq) error {

	dish, err := repository.GetDishByID(req.ID)
	if err != nil {
		return err
	}

	updates := map[string]interface{}{}

	if req.Name != "" {
		updates["name"] = req.Name
	}
	if req.Price != 0 {
		updates["price"] = req.Price
	}
	if req.PictureURL != "" {
		updates["picture_url"] = req.PictureURL
	}
	if req.Description != "" {
		updates["description"] = req.Description
	}

	return repository.UpdateDish(dish, updates)
}

func CreateDish(req req.CreateDishReq) (uint, error) {
	id, err := repository.CreateDish(model.Dish{
		Price:       req.Price,
		Name:        req.Name,
		PictureURL:  req.PictureURL,
		Description: req.Description,
	})
	return id, err
}

func DeleteDish(id uint) error {
	return repository.DeleteDish(id)
}

func GetDishDetail(id uint) (resp.DishResp, error) {
	dish, err := repository.GetDishByID(id)
	if err != nil {
		return resp.DishResp{}, err
	}

	return resp.DishResp{
		Id:          dish.ID,
		Price:       dish.Price,
		Name:        dish.Name,
		PictureURL:  dish.PictureURL,
		Description: dish.Description,
	}, nil
}
