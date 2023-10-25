package api

import (
	"FoodDelivery/internal/handlers"
	"github.com/gin-gonic/gin"
)

func NewRouter() *gin.Engine {
	r := gin.Default()
	router := r.Group("/elemei/v1")
	{
		userRouter := router.Group("/user")
		userRouter.POST("/login", handlers.Login)
		userRouter.POST("/logout", handlers.Logout)
		userRouter.GET("/detail", handlers.GetUserDetail)
		userRouter.POST("/register", handlers.Register)
	}

	{
		dishRouter := router.Group("/dish")
		dishRouter.GET("/all")
		dishRouter.PUT("/update")
		dishRouter.POST("/create")
		dishRouter.DELETE("/delete")
		dishRouter.GET("/detail")
	}

	{
		orderRouter := router.Group("/order")
		orderRouter.POST("/create")  // 顾客创建订单
		orderRouter.PUT("/verify/1") // 餐厅员工确认订单
		orderRouter.PUT("/wait")     // 请求送餐
		orderRouter.PUT("/verify/2") // 送餐员确认送餐单
		orderRouter.PUT("/verify/3") // 顾客确认已经送达
	}

	{
		router.POST("/comment") // 评论
	}
	return r
}
