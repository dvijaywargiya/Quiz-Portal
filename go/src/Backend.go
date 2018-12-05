package main

import (
   "fmt"
   "github.com/gin-contrib/cors"                        // Why do we need this package?
   "github.com/gin-gonic/gin"
   "github.com/jinzhu/gorm"
   _ "github.com/jinzhu/gorm/dialects/sqlite"           // If you want to use mysql or any other db, replace this line
)

var db *gorm.DB                                         // declaring the db globally
var err error

type Quiz struct {
   ID uint `json:"id"`
   Category string `json:"Category"`
   Name string `json:"Name"`
   Question string `json:"Question"`
   ImageLink string `json:"ImageLink"`
   Option1 string `json:"Option1"`
   Option2 string `json:"Option2"`
   Option3 string `json:"Option3"`
   Option4 string `json:"Option4"`
   Answer1 bool `json:"Answer1"`
   Answer2 bool `json:"Answer2"`
   Answer3 bool `json:"Answer3"`
   Answer4 bool `json:"Answer4"`
}

type Users struct{
   ID uint `json:"id"`
   Username string `json:"Username"`
   Admin bool `json:"Admin"`
}

type Categories struct{
   ID uint `json:"id"`
   Category string `json:"Category"`
}

type UserStats struct {
   ID uint `json:"id"`
   Username string `json:"Username"`
   Category string `json:"Category"`
   Name string `json:"Name"`
   Score uint `json:"Score"`
}

func main() {
   db, err = gorm.Open("sqlite3", "./gorm.db")
   if err != nil{
      fmt.Println(err)
   }
   defer db.Close()
   db.AutoMigrate(&UserStats{})
   db.AutoMigrate(&Quiz{})
   db.AutoMigrate(&Categories{})
   db.AutoMigrate(&Users{})
   r := gin.Default()
   r.GET("/CheckAdmin/:user", CheckAdmin)
   r.POST("/AddUser/:user",AddUser)
   r.GET("/getOverallLeaderBoard/",getOverallLeaderBoard)
   r.GET("/getCategoryWiseLB/:cat", getCategoryWiseLB)
   r.GET("/getCategories/", getCategories)
   r.POST("/addCategory/:cat", addCategory)
   r.GET("/viewStats/:user", ViewStats)
   r.DELETE("/deleteStats/:cat/:name", deleteStats)
   r.POST("/userStat/:user/:cat/:name", EnterStats)
   r.GET("/name/:cat", GetAllNames)
   r.GET("/quizCount/:cat/:name", GetquizCount)                             // Creating routes for each functionality
   r.GET("/quiz/:cat/:name", Getquiz)   
   r.GET("/quiz/", GetAllQuestions)
   r.POST("/addquiz", AddQuiz)
   r.PUT("/quiz/:id", Updatequiz)
   r.DELETE("/quiz1/:cat/:name", Deletequiz)
   r.Use((cors.Default()))
   r.Run(":8080")                                           // Run on port 8080
}

func GetquizCount(c *gin.Context) {
   cat := c.Params.ByName("cat")
   name := c.Params.ByName("name")
   type Result struct {
    Records int
   }
   var result Result
   if err := db.Raw("select count(*) as records from quizzes where category=? and name = ?",cat,name).Scan(&result).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, result)
   }
}

func deleteStats(c *gin.Context) {
   cat := c.Params.ByName("cat")
   name := c.Params.ByName("name")
   var userstats UserStats
   d := db.Where("Category = ? and Name = ?", cat, name).Delete(&userstats)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"Quiz #" + cat: "deleted"})
}

func AddUser(c *gin.Context) {
   username := c.Params.ByName("user")
   var users Users
   c.BindJSON(&users)
   db.FirstOrCreate(&users, Users{Username:username})
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200, users)
}

func CheckAdmin(c *gin.Context) {
   username := c.Params.ByName("user")
   fmt.Println(username);
   var users Users
   if err := db.Where("Username = ?",username).First(&users).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, users)
   }
}

func getOverallLeaderBoard(c *gin.Context) {
   type Result struct {
    Username string
    Score int
   }
   var result []Result
   if err := db.Raw("select username,sum(score) as score FROM user_stats group by username order by sum(score) desc").Scan(&result).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, result)
   }
}

func getCategoryWiseLB(c *gin.Context) {
   type Result struct {
    Username string
    category  string
    Score int
   }
   var result []Result
   category := c.Params.ByName("cat")
   if err := db.Raw("select username,category,sum(score) as score from user_stats where category = ? group by score order by sum(score) desc",category).Scan(&result).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, result)
   }
}

func getCategories(c *gin.Context) {
   var categories []Categories
   if err := db.Find(&categories).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, categories)
   }
}

func addCategory(c *gin.Context) {
   cat := c.Params.ByName("cat")
   var category Categories
   c.BindJSON(&category)
   db.FirstOrCreate(&category,Categories{Category: cat})
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200, category)
} 

func ViewStats(c *gin.Context) {
   username := c.Params.ByName("user")
   var userstats []UserStats
   if err := db.Where("Username = ?", username).Find(&userstats).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, userstats)
   }
}

func EnterStats(c *gin.Context) {
   var userstats UserStats
   username := c.Params.ByName("user")
   category := c.Params.ByName("cat")
   name := c.Params.ByName("name")
   c.BindJSON(&userstats)
   db.FirstOrCreate(&userstats, UserStats{Username: username, Category: category, Name: name})
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200, userstats)
}

func Deletequiz(c *gin.Context) {
   cat := c.Params.ByName("cat")
   name := c.Params.ByName("name")
   var quiz Quiz
   d := db.Where("Category = ? and Name = ?", cat, name).Delete(&quiz)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"Quiz #" + cat: "deleted"})
}

func Updatequiz(c *gin.Context) {
   var quiz Quiz
   id := c.Params.ByName("id")
   if err := db.Where("id = ?", id).First(&quiz).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   }
   c.BindJSON(&quiz)
   db.Save(&quiz)
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200, quiz)
}

func AddQuiz(c *gin.Context) {
   var quiz Quiz
   c.BindJSON(&quiz)
   db.Create(&quiz)
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200, quiz)
}

func Getquiz(c *gin.Context) {
   cat := c.Params.ByName("cat")
   name := c.Params.ByName("name")
   var quiz []Quiz
   if err := db.Where("Category = ? and Name = ?", cat, name).Find(&quiz).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, quiz)
   }
}

func GetAllQuestions(c *gin.Context) {
   var quiz []Quiz
   if err := db.Find(&quiz).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, quiz)
   }
}

func GetAllNames(c *gin.Context) {
   var quiz []Quiz
   cat := c.Params.ByName("cat")
   if err := db.Raw("select distinct(name) from quizzes where category=?",cat).Find(&quiz).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, quiz)
   }
}
