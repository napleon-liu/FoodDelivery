package service

import (
	"elemei/internal/model"
	"elemei/internal/repository"
	"elemei/internal/typ/req"
	"elemei/internal/typ/resp"
)

func UserLogin(req req.UserLoginReq) (resp.LoginResp, error) {
	var r resp.LoginResp
	r, err := repository.UserLogin(req)
	return r, err
}

func UserDetail(req req.UserDetailReq) (resp.UserDetailResp, error) {
	user, err := repository.GetUserByID(req.ID)
	if err != nil {
		return user, err
	}
	return user, nil
}

func UserRegister(registerReq req.UserRegisterReq) error {
	var user = model.User{
		Name:     registerReq.Name,
		Account:  registerReq.Account,
		Password: registerReq.Password,
		Role:     registerReq.Role,
	}
	err := repository.CreateUser(user)
	if err != nil {
		return err
	}
	return nil
}
