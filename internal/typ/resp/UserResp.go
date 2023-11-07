package resp

// LoginResp 用户登录响应
type LoginResp struct {
	UserID uint   `json:"userID"`
	Token  string `json:"token"`
}

// UserDetailResp 用户个人信息响应
type UserDetailResp struct {
	Account string `json:"account"`
	Role    int64  `json:"role"`
	Name    string `json:"name"`
	Avatar  string `json:"avatar"`
}
