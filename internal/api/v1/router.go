package api

import (
	"elemei/internal/handlers"
	"elemei/internal/middlewares"
	"github.com/gin-gonic/gin"
)

func NewRouter() *gin.Engine {
	r := gin.Default()

	r.Use(middlewares.Cors())

	router := r.Group("/elemei/v1")
	{
		userRouter := router.Group("/user")
		userRouter.POST("/login", handlers.Login)
		userRouter.POST("/detail", handlers.GetUserDetail)
		userRouter.POST("/register", handlers.Register)
	}

	{
		dishRouter := router.Group("/dish")
		dishRouter.POST("/all", handlers.GetDishList)
		dishRouter.PUT("/update", handlers.UpdateDish)
		dishRouter.POST("/create", handlers.CreateDish)
		dishRouter.DELETE("/delete", handlers.DeleteDish)
		dishRouter.POST("/detail", handlers.GetDishDetail)
	}

	{
		orderRouter := router.Group("/order")
		orderRouter.POST("/create", handlers.CreateOrder) // 顾客创建订单 status:1
		orderRouter.PUT("/update", handlers.UpdateStatus) // 餐厅员工确认订单 status:2
		// 餐厅员工请求送餐 status:3
		// 送餐员确认送餐单 status:4
		// 顾客确认已经送达 status:5
		orderRouter.POST("/orderListByUserID", handlers.GetOrderListByUserID)
		orderRouter.POST("/orderListByStatus", handlers.GetOrderListByStatus)
	}

	{
		commentRouter := router.Group("/comment")
		commentRouter.POST("/create", handlers.CreateComment) // 顾客创建一条评论
		commentRouter.POST("/all", handlers.GetCommentList)   // 获取对某条菜品的所有评价
	}
	return r
}
