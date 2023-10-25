package resp

// MetaData 响应元数据
type MetaData struct {
	Code int    `json:"HTTPCode"`
	Msg  string `json:"Msg"`
}

// T HTTP响应，包含MetaData元数据，及Result返回结果。
type T struct {
	MetaData *MetaData   `json:"ResponseMetadata"`
	Result   interface{} `json:"Result"`
}
