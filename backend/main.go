package main

import (
	"os"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/controller"
	Advice "github.com/sut65/team19/controller/Advice"
	behavior "github.com/sut65/team19/controller/Behavior"
	CourseDetail "github.com/sut65/team19/controller/CourseDetail"
	CourseService "github.com/sut65/team19/controller/CourseService"
	DailyRoutine "github.com/sut65/team19/controller/DailyRoutine"
	foodInformation "github.com/sut65/team19/controller/FoodInformation"
	MealPlan "github.com/sut65/team19/controller/MealPlan"
	member "github.com/sut65/team19/controller/Member"
	nutrient "github.com/sut65/team19/controller/Nutrient"
	Payment "github.com/sut65/team19/controller/Payment"
	trainer "github.com/sut65/team19/controller/Trainer"
	blog "github.com/sut65/team19/controller/blog"
	review "github.com/sut65/team19/controller/review"
	"github.com/sut65/team19/entity"
	"github.com/sut65/team19/middlewares"
)

const PORT = "8080"

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, PATCH, DELETE")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}

func main() {
	// Delete database file before BUILD and RUN
	os.Remove("./nutrition.db")

	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	router := r.Group("/")
	{
		router.Use(middlewares.Authorizes())
		{
			// Subtable for trainers and members
			r.GET("/status/:id", controller.GetStatus)
			r.GET("/statuses", controller.ListStatus)

			r.GET("/religion/:id", controller.GetReligion)
			r.GET("/religions", controller.ListReligion)

			r.GET("/gender/:id", controller.GetGender)
			r.GET("/genders", controller.Listgenders)

			r.GET("/exercise/:id", behavior.GetExercise)
			r.GET("/exercises", behavior.ListExercise)

			r.GET("/taste/:id", behavior.GetTaste)
			r.GET("/tastes", behavior.ListTaste)

			// course_service Routes
			router.POST("/course_service", CourseService.CreateCourseService)
			router.GET("/course_service/:id", CourseService.GetCourseService)
			router.GET("/course_services", CourseService.ListCourseServices)
			router.GET("/course_service_by_uid/:uid", CourseService.GetCourseServiceByUID)
			router.GET("/course_service_by_tid/:uid", CourseService.GetCourseServiceByTID)
			router.GET("/course_service_by_uid_and_status/:uid", CourseService.GetCourseServiceByUidAndStatus)
			router.DELETE("/course_service/:id", CourseService.DeleteCourseService)
			router.PATCH("/course_services", CourseService.UpdateCourseService)

			// course_detail Routes
			router.POST("/course_detail", CourseDetail.CreateCourseDetail)
			router.GET("/course_detail/:id", CourseDetail.GetCourseDetail)
			router.GET("/course_details", CourseDetail.ListCourseDetails)
			router.DELETE("/course_detail/:id", CourseDetail.DeleteCourseDetail)
			router.PATCH("/course_details", CourseDetail.UpdateCourseDetail)

			router.GET("/course_type/:id", CourseDetail.GetCourseType)
			router.GET("/course_types", CourseDetail.ListCourseTypes)

			router.GET("/price/:id", CourseDetail.GetPrice)
			router.GET("/prices", CourseDetail.ListPrices)

			// member Routes
			router.GET("/member/:id", member.GetMember)
			router.GET("/members", member.ListMembers)
			router.DELETE("/member/:id", member.DeleteMember)
			router.PATCH("/update-member", member.UpdateMember)

			// DailyRoutine Routes
			r.POST("/daily_routines", DailyRoutine.CreateDailyRoutine)
			r.GET("/daily_routine/:id", DailyRoutine.GetDailyRoutineByID)
			r.GET("/daily_routines", DailyRoutine.GetDailyRoutines)
			r.PATCH("/daily_routines", DailyRoutine.UpdateDailyRoutine)
			r.DELETE("/daily_routines/:id", DailyRoutine.DeleteDailyRoutine)
			r.GET("/activity_type/:id", DailyRoutine.GetActivityTypesByID)

			// MealPlan Routes
			r.POST("/mealplans", MealPlan.CreateMealPlan)
			r.GET("/mealplan/:id", MealPlan.GetMealPlan)
			r.GET("/mealplans", MealPlan.GetMealPlans)
			r.PATCH("/mealplans", MealPlan.UpdateMealPlan)
			r.DELETE("/mealplans/:id", MealPlan.DeleteMealPlan)

			r.GET("/mealtype/:id", MealPlan.GetMealType)
			r.GET("/mealtypes/", MealPlan.GetMealTypes)

			// trainer Routes
			r.GET("/trainer/:id", trainer.GetTrainer)
			r.GET("/trainer", trainer.ListTrainers)
			r.POST("/trainer", trainer.CreateTrainder)
			router.DELETE("/trainer/:id", trainer.DeleteTrainer)
			router.PATCH("/trainers", trainer.UpdateTrainer)
			router.PATCH("/trainers-nopass", trainer.UpdateTrainerNotPassword)

			r.GET("/form/:id", trainer.GetForm)
			r.GET("/forms", trainer.ListForms)

			r.GET("/education/:id", trainer.GetEducation)
			r.GET("/educations", trainer.ListEducation)

			// Body routes
			router.POST("/body", controller.CreateBody)
			router.GET("/body/:id", controller.GetBody)
			router.GET("/body/byMember/:id", controller.GetBodyByIDMember)
			router.GET("/bodies", controller.ListBodies)
			router.PATCH("/body", controller.UpdateBody)
			router.DELETE("/body/:id", controller.DeleteBody)

			// FoodInformation Routes
			router.GET("/food_informations", foodInformation.ListFoodInformations)
			router.GET("/food_information/:id", foodInformation.GetFoodInformation)
			router.POST("/food_informations", foodInformation.CreateFoodInformation)
			router.PATCH("/update-food_information", foodInformation.UpdateFoodInformation)
			router.DELETE("/delete-food_information/:id", foodInformation.DeleteFoodInformation)

			router.GET("/food_types", foodInformation.ListFoodTypes)
			router.GET("/food_type/:id", foodInformation.GetFoodInformation)
			router.GET("/main_ingredients", foodInformation.ListMainIngredients)
			router.GET("/main_ingredient/:id", foodInformation.GetMainIngredient)

			// Review Routes
			router.GET("/reviews", review.ListReviews)
			router.GET("/review/:id", review.GetReview)
			router.GET("/review-cid/:id", review.GetReviewByCourseID)
			router.POST("/reviews", review.CreateReview)
			router.PATCH("/update-review", review.UpdateReview)
			router.DELETE("/delete-review/:id", review.DeleteReview)

			router.GET("/ranks", review.ListRanks)
			router.GET("/rank/:id", review.GetRank)

			// Blog Routes
			router.GET("/blogs", blog.ListBlogs)
			router.GET("/blog/:id", blog.GetBlog)
			router.POST("/blogs", blog.CreateBlog)
			router.PATCH("/update-blog", blog.UpdateBlog)
			router.DELETE("/delete-blog/:id", blog.DeleteBlog)

			router.GET("/categories", blog.ListCategories)
			router.GET("/category/:id", blog.GetCategory)
			router.GET("/tags", blog.ListTags)
			router.GET("/tag/:id", blog.GetTag)

			// admin Routes
			router.POST("/admin", controller.CreateAdmin)
			router.GET("/admin/:id", controller.GetAdmin)
			router.GET("/admins", controller.ListAdmins)
			router.DELETE("/admin/:id", controller.DeleteAdmin)
			router.PATCH("/admins", controller.UpdateAdmin)

			// advice Routes
			router.POST("/advice", Advice.CreateAdvice)
			router.GET("/advice/:id", Advice.GetAdvice)
			router.GET("/advices", Advice.ListAdvice)
			router.GET("/advices-by-course/:id", Advice.GetAdviceByCourseService)
			router.DELETE("/advice/:id", Advice.DeleteAdvice)
			router.PATCH("/advices", Advice.UpdateAdvice)

			// Nutrient Routes
			router.GET("/nutrients", nutrient.ListNutrients)
			router.GET("/nutrient/:id", nutrient.GetNutrient)
			router.POST("/nutrients", nutrient.CreateNutrient)
			router.PATCH("/update-nutrient", nutrient.UpdateNutrient)
			router.DELETE("/delete-nutrient/:id", nutrient.DeleteNutrient)

			router.GET("/most_nutrients", nutrient.ListMostNutrients)
			router.GET("/most_nutrient/:id", nutrient.GetMostNutrient)

			// Behavior Routes
			router.POST("/behavior", behavior.CreateBehavior)
			router.GET("/behavior/:id", behavior.GetBehavior)
			router.GET("/behaviors", behavior.ListBehaviors)
			router.DELETE("/behavior/:id", behavior.DeleteBehavior)
			router.PATCH("/behaviors", behavior.UpdateBehavior)

			// discount Routes
			router.POST("/discount", Payment.CreateDiscount)
			router.GET("/discount/:discount_code", Payment.GetDiscount)
			router.GET("/discounts", Payment.ListDiscounts)
			router.DELETE("/discount/:id", Payment.DeleteDiscount)
			router.PATCH("/discounts", Payment.UpdateDiscount)

			// duration Routes
			router.POST("/duration", Payment.CreateDuration)
			router.GET("/duration/:id", Payment.GetDuration)
			router.GET("/durations", Payment.ListDurations)
			router.DELETE("/duration/:id", Payment.DeleteDuration)
			router.PATCH("/durations", Payment.UpdateDuration)

			// payment Routes
			router.POST("/payment", Payment.CreatePayment)
			router.GET("/payment/:id", Payment.GetPayment)
			router.GET("/payments", Payment.ListPayments)
			router.GET("/payment-history/:uid", Payment.GetPaymentByUID)
			router.GET("/payment-historys/:uid", Payment.ListPaymentByUID)
			router.DELETE("/payment/:cid", Payment.DeletePaymentByCID)
		}
	}
	// login User Route
	r.POST("/login", controller.Login)
	r.POST("/trainerLogin", controller.LoginTrainer)
	r.POST("/adminLogin", controller.LoginAdmin)

	r.POST("/member", member.CreateMember)

	// Run the server go run main.go
	r.Run("localhost: " + PORT)
}
