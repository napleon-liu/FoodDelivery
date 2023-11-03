package repository

import (
	"FoodDelivery/internal/model"
	"FoodDelivery/internal/repository/mysql"
	"FoodDelivery/internal/typ/req"
	"FoodDelivery/internal/typ/resp"
	"errors"
)

func UserLogin(req req.UserLoginReq) error {
	var user model.User
	res := mysql.Client.Where("account = ?", req.Account).Find(&user)
	if res.Error != nil {
		return errors.New("user not found")
	}
	if user.Password == req.Password {
		return nil
	}
	return errors.New("password wrong")
}

func GetUserByID(id uint) (resp.UserDetailResp, error) {
	var user model.User
	res := mysql.Client.Where("id = ?", id).Find(&user)
	if res.Error != nil {
		return resp.UserDetailResp{}, errors.New("user not found")
	}
	userResp := resp.UserDetailResp{
		Account: user.Account,
		Name:    user.Name,
		Avatar:  user.Avatar,
		Role:    user.Role,
	}
	return userResp, nil
}

func CreateUser(user model.User) error {
	resp := mysql.Client.Create(&user)
	if resp.Error != nil {
		return resp.Error
	}
	return nil
}
