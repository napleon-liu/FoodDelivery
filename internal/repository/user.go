package repository

import (
	"FoodDelivery/internal/model"
	"FoodDelivery/internal/repository/mysql"
	"FoodDelivery/internal/typ/req"
	"FoodDelivery/internal/typ/resp"
	"errors"
)

func UserLogin(req req.UserLoginReq) (resp.LoginResp, error) {
	var user model.User
	var r resp.LoginResp
	res := mysql.Client.Where("account = ?", req.Account).Find(&user)
	if res.Error != nil {
		return r, errors.New("user not found")
	}
	r.UserID = user.ID
	r.Token = ""
	if user.Password == req.Password {
		return r, nil
	}
	return r, errors.New("password wrong")
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
	create := mysql.Client.Create(&user)
	if create.Error != nil {
		return create.Error
	}
	return nil
}
