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
		dishRouter.GET("/all", handlers.GetDishList)
		dishRouter.PUT("/update", handlers.UpdateDish)
		dishRouter.POST("/create", handlers.CreateDish)
		dishRouter.DELETE("/delete", handlers.DeleteDish)
		dishRouter.GET("/detail", handlers.GetDishDetail)
	}

	{
		orderRouter := router.Group("/order")
		orderRouter.POST("/create", handlers.CreateOrder)                  // 顾客创建订单
		orderRouter.PUT("/employee/verify", handlers.EmployeeVerify)       // 餐厅员工确认订单
		orderRouter.PUT("/query/delivery", handlers.QueryDelivery)         // 餐厅员工请求送餐
		orderRouter.PUT("/deliveryman/verify", handlers.DeliverymanVerify) // 送餐员确认送餐单
		orderRouter.PUT("/customer/verify", handlers.CustomerVerify)       // 顾客确认已经送达
	}

	{
		commentRouter := router.Group("/order")
		commentRouter.POST("/create", handlers.CreateComment) // 顾客创建一条评论
		commentRouter.GET("/all", handlers.GetCommentList)    // 获取对某条菜品的所有评价
	}
	return r
}
