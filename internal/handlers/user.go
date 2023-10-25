package handlers

import (
	"FoodDelivery/internal/service"
	"FoodDelivery/internal/typ/req"
	"FoodDelivery/internal/typ/resp"
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

func Login(ctx *gin.Context) {
	var req req.UserLoginReq
	if err := ctx.ShouldBindJSON(&req); err != nil {
		log.Println(fmt.Errorf("[LoginInfo] param bind error: %v", err))
		ctx.JSON(http.StatusBadRequest, &resp.T{
			MetaData: &resp.MetaData{
				Code: http.StatusBadRequest,
				Msg:  "An error message generated by ShouldBindJson: " + err.Error(),
			},
		})
		return
	}
	if err := service.UserLogin(req); err != nil {
		log.Println(fmt.Sprintf("[UserLogin] wrong: %v", err))
		ctx.JSON(http.StatusBadRequest, &resp.T{
			MetaData: &resp.MetaData{
				Code: http.StatusBadRequest,
				Msg:  "An error message generated by service.CreateRecruitmentInfo: " + err.Error(),
			},
		})
		return
	}
}

func Logout(ctx *gin.Context) {

}

func GetUserDetail(ctx *gin.Context) {

}

func Register(ctx *gin.Context) {

}
