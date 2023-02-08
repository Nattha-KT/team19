package entity

import (
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("nutrition.db"), &gorm.Config{})

	if err != nil {
		panic("Failed to connect database!")
	}

	// Migrate the schema

	database.AutoMigrate(
		// Activity ย่อย
		&ActivitiesType{},
		&MealTimes{},
		&FoodAllergies{},
		&BedTimes{},
		// Meal Plan ย่อย
		&AvoidFood{},
		&MealsOfDay{},
		&BreakFast{},
		&Lunch{},
		&Dinner{},
		&Nutritious{},
		// Member
		&Status{},
		&Religion{},
		&Gender{},
		&Member{},
		// Blog
		&Category{},
		&Tag{},
		&Blog{},
		// CourseDetail
		&Price{},
		&Description{},
		&Admin{},
		&CourseDetail{},
		// Review
		&Rank{},
		&Review{},
		// Trainer
		&FormOfWork{},
		&Education{},
		&Trainer{},
		// Body ref.-> {member,trainer,courseDetail}
		Body{},
		// CourseService
		&CourseService{},
		// FoodInformation
		&FoodInformation{},
		&FoodType{},
		&MainIngredient{},
		// Activity หลัก
		&DailyActivities{},
		// MealPlans
		&MealPlans{},
		//Advice
		&Advice{},
		// Payment
		&Discount{},
		&Duration{},
		&Payment{},
		// Nutrient
		&MostNutrient{},
		&Nutrient{},
		//Behavior
		&Behavior{},
		&Taste{},
		&Exercise{},
	)

	db = database

	Status1 := Status{
		Name: "สมรส",
	}
	db.Model(&Status{}).Create(&Status1)

	Statuses := []Status{
		{Name: "โสด"},
		{Name: "หย่า"},
		{Name: "หม้าย"},
	}
	db.Model(&Status{}).Create(&Statuses)

	Gender1 := Gender{
		Name: "Male",
	}
	db.Model(&Gender{}).Create(&Gender1)
	Gender2 := Gender{
		Name: "Female",
	}
	db.Model(&Gender{}).Create(&Gender2)

	// Admin Part -------------------------------------------------------------
	passwordA, _ := bcrypt.GenerateFromPassword([]byte("123456"), 14)
	AdminA := Admin{
		Email:    "Admin001@gmail.com",
		Name:     "ผู้ดูแล001",
		Password: string(passwordA),
	}
	db.Model(&Admin{}).Create(&AdminA)

	passwordB, _ := bcrypt.GenerateFromPassword([]byte("1150"), 14)
	AdminB := Admin{
		Email:    "Admin002@gmail.com",
		Name:     "ผู้ดูแล002",
		Password: string(passwordB),
	}
	db.Model(&Admin{}).Create(&AdminB)

	passwordC, _ := bcrypt.GenerateFromPassword([]byte("1112"), 14)
	AdminC := Admin{
		Email:    "Admin003@gmail.com",
		Name:     "ผู้ดูแล003",
		Password: string(passwordC),
	}
	db.Model(&Admin{}).Create(&AdminC)

	//**************************************************************************

	Religion1 := Religion{
		Name: "พุธ",
	}
	db.Model(&Religion{}).Create(&Religion1)
	Religion2 := Religion{
		Name: "อิสลาม",
	}
	db.Model(&Religion{}).Create(&Religion2)
	Religion3 := Religion{
		Name: "คริสต์",
	}
	db.Model(&Religion{}).Create(&Religion3)
	Religion4 := Religion{
		Name: "ฮินดู",
	}
	db.Model(&Religion{}).Create(&Religion4)

	Password, _ := bcrypt.GenerateFromPassword([]byte("111"), 14)

	Member1 := Member{
		Firstname:   "Fname1",
		Lastname:    "Lname1",
		Email:       "User1@mail.com",
		Password:    string(Password),
		ProfileUser: "https://cdn-icons-png.flaticon.com/512/1946/1946429.png",
		Status:      Status1,
		Gender:      Gender1,
		Religion:    Religion1,
	}
	db.Model(&Member{}).Create(&Member1)

	Member2 := Member{
		Firstname:   "ชูเกียรติ",
		Lastname:    "ก๋าอินตา",
		Email:       "b6303044@g.sut.ac.th",
		Password:    string(Password),
		ProfileUser: "https://cdn-icons-png.flaticon.com/512/1946/1946429.png",
		Status:      Status1,
		Gender:      Gender2,
		Religion:    Religion2,
	}
	db.Model(&Member{}).Create(&Member2)
	Member3 := Member{
		Firstname:   "Fname3",
		Lastname:    "Lname3",
		Email:       "User3@mail.com",
		Password:    string(Password),
		ProfileUser: "https://cdn-icons-png.flaticon.com/512/1946/1946429.png",
		Status:      Status1,
		Gender:      Gender1,
		Religion:    Religion3,
	}
	db.Model(&Member{}).Create(&Member3)

	//Description Part ----------------------------------------------------------------------------------------------

	Description1 := Description{
		Description: "หุ่นดีได้ง่าย ๆ ห่างไกลจากโรคแทรกซ้อน ทำได้ง่าย ๆ ที่บ้านด้วยตัวเอง",
		CourseType:  "เพิ่มน้ำหนัก",
		Goal:        "เพิ่มน้ำหนักได้ 1-2 kg",
	}
	db.Model(&Description{}).Create(&Description1)

	Description2 := Description{
		Description: "สุขภาพดี หุ่นดี ได้ง่ายๆ ด้วยคอร์สลดน้ำหนักออนไลน์ เพื่อผลลัพธ์แบบยั่งยืน ทำได้ด้วยตัวเอง",
		CourseType:  "ลดน้ำหนัก",
		Goal:        "ลดน้ำหนักได้ 3-5 kg",
	}
	db.Model(&Description{}).Create(&Description2)

	Description3 := Description{
		Description: "ฟิตหุ่นให้ดี กระชับกล้ามเนื้อให้เฟิร์ม ผลลัพธ์แบบยั่งยืน ทำได้ด้วยตัวเอง",
		CourseType:  "เพิ่มกล้ามเนื้อ",
		Goal:        "เพิ่มกล้ามให้ชัดขึ้น",
	}
	db.Model(&Description{}).Create(&Description3)

	// Price Part ----------------------------------------------------------------------------------------
	Price1 := Price{
		Price:    399,
		Duration: "30 วัน",
	}
	db.Model(&Price{}).Create(&Price1)

	Price2 := Price{
		Price:    599,
		Duration: "60 วัน",
	}
	db.Model(&Price{}).Create(&Price2)

	Price3 := Price{
		Price:    999,
		Duration: "90 วัน",
	}
	db.Model(&Price{}).Create(&Price3)

	//Course Details Part -----------------------------------------------------------------------------
	CourseDetail1 := CourseDetail{
		CourseName:  "บอกลาร่างผอม",
		CoverPage:   "https://www.iglss.org/wp-content/uploads/2019/02/diet-plan.jpg",
		Description: Description1,
		Admin:       AdminA,
		Price:       Price3,
	}
	db.Model(&CourseDetail{}).Create(&CourseDetail1)

	CourseDetail2 := CourseDetail{
		CourseName:  "ลดพุงกู้ร่างกลับคืน",
		CoverPage:   "https://bgh.sgp1.digitaloceanspaces.com/old-site/inline-images/before-weight-loss-01.jpg",
		Description: Description2,
		Admin:       AdminB,
		Price:       Price1,
	}
	db.Model(&CourseDetail{}).Create(&CourseDetail2)

	CourseDetail3 := CourseDetail{
		CourseName:  "ปั้นกล้ามสร้างพลัง",
		CoverPage:   "https://s.isanook.com/he/0/rp/rc/w670h402/yatxacm1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL2hlLzAvdWQvNS8yODg2MS93ZWlnaHRsaWZ0aW5nLmpwZw==.jpg",
		Description: Description3,
		Admin:       AdminC,
		Price:       Price2,
	}
	db.Model(&CourseDetail{}).Create(&CourseDetail3)

	//----------------------------------------------------------------------------------

	form1 := FormOfWork{
		Name: "งานประจำ",
	}
	db.Model(&FormOfWork{}).Create(&form1)

	form := []FormOfWork{
		{Name: "งานนอกเวลา"},
		{Name: "งานอิสระ"},
		{Name: "นักศึกษางาน"},
		{Name: "สัญญาจ้าง"},
		{Name: "สหกิจศึกษา"},
	}
	db.Model(&FormOfWork{}).Create(&form)

	education1 := Education{
		EducationLevel: "ต่ำกว่าปริญาตรี",
	}
	db.Model(&Education{}).Create(&education1)

	educations := []Education{
		{EducationLevel: "ปริญาตรี"},
		{EducationLevel: "ปริญาโท"},
		{EducationLevel: "ปริญาเอก"},
	}
	db.Model(&Education{}).Create(&educations)

	// -------------------(Create value Trainer)------------------------------
	pass1, _ := bcrypt.GenerateFromPassword([]byte("123456"), 14)
	Trainer1 := Trainer{
		Name:       "Natthaphon",
		University: "SUT",
		Gpax:       3.83,
		Gender:     "ชาย",
		Age:        21,
		Address:    "90/8 บ.โคกก่อง",
		Email:      "Aonaon_123@gmail.com",
		Password:   string(pass1),
		FormOfWork: form1,
		Status:     Status1,
		Religion:   Religion1,
		Education:  education1,
	}
	db.Model(&Trainer{}).Create(&Trainer1)

	pass2, _ := bcrypt.GenerateFromPassword([]byte("123456"), 14)
	Trainer2 := Trainer{
		Name:       "opopopo",
		University: "SUT",
		Gpax:       3.73,
		Gender:     "ชาย",
		Age:        21,
		Address:    "90/8 บ.โคกก่อง",
		Email:      "Aonaon_1234@gmail.com",
		Password:   string(pass2),
		FormOfWork: form1,
		Status:     Status1,
		Religion:   Religion2,
		Education:  education1,
	}
	db.Model(&Trainer{}).Create(&Trainer2)

	// Review
	RankA := Rank{
		Name: "แย่",
	}
	db.Model(&Rank{}).Create(&RankA)

	RankB := Rank{
		Name: "พอใช้",
	}
	db.Model(&Rank{}).Create(&RankB)

	RankC := Rank{
		Name: "ปานกลาง",
	}
	db.Model(&Rank{}).Create(&RankC)

	RankD := Rank{
		Name: "ดี",
	}
	db.Model(&Rank{}).Create(&RankD)

	RankE := Rank{
		Name: "ดีมาก",
	}
	db.Model(&Rank{}).Create(&RankE)

	ReviewA := Review{
		Content:      "Test Der",
		Image:        "https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
		CourseDetail: CourseDetail1,
		Rank:         RankE,
		Member:       Member1,
	}
	db.Model(&Review{}).Create(&ReviewA)

	// Blog
	CategoryA := Category{
		Name: "การกิน",
	}
	db.Model(&Category{}).Create(&CategoryA)

	CategoryB := Category{
		Name: "ออกกำลังกาย",
	}
	db.Model(&Category{}).Create(&CategoryB)

	TagA := Tag{
		Name: "มทส",
	}
	db.Model(&Tag{}).Create(&TagA)

	TagB := Tag{
		Name: "ออกกำลังกายด้วยงบ 0 บาท",
	}
	db.Model(&Tag{}).Create(&TagB)

	TagC := Tag{
		Name: "อาหารคลีนงบประหยัด",
	}
	db.Model(&Tag{}).Create(&TagC)

	BlogA := Blog{
		CoverImage: "data:image/jpeg;base64,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",
		Title:      "อาหารคลีน",
		Content:    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		Member:     Member1,
		Category:   CategoryA,
		Tag:        TagA,
	}
	db.Model(&Blog{}).Create(&BlogA)

	// ------------ Food Information ------------
	MainIngredientA := MainIngredient{
		Name:    "ไข่",
		Carolie: 155,
		Type:    "วัตถุดิบจากสัตว์",
	}
	db.Model(&MainIngredient{}).Create(&MainIngredientA)

	MainIngredientB := MainIngredient{
		Name:    "ผัก",
		Carolie: 65,
		Type:    "วัตถุดิบจากพืช",
	}
	db.Model(&MainIngredient{}).Create(&MainIngredientB)

	MainIngredientC := MainIngredient{
		Name:    "แป้ง",
		Carolie: 364,
		Type:    "วัตถุดิบจากพืช",
	}
	db.Model(&MainIngredient{}).Create(&MainIngredientC)

	MainIngredientD := MainIngredient{
		Name:    "เนื้อหมู",
		Carolie: 242,
		Type:    "วัตถุดิบจากสัตว์",
	}
	db.Model(&MainIngredient{}).Create(&MainIngredientD)

	MainIngredientE := MainIngredient{
		Name:    "เนื้อวัว",
		Carolie: 250,
		Type:    "วัตถุดิบจากสัตว์",
	}
	db.Model(&MainIngredient{}).Create(&MainIngredientE)

	MainIngredientF := MainIngredient{
		Name:    "ยีสต์",
		Carolie: 325,
		Type:    "วัตถุดิบจากจุลลินทรีย์",
	}
	db.Model(&MainIngredient{}).Create(&MainIngredientF)

	MainIngredientG := MainIngredient{
		Name:    "ผลไม้",
		Carolie: 88,
		Type:    "วัตถุดิบจากพืช",
	}
	db.Model(&MainIngredient{}).Create(&MainIngredientG)

	MainIngredientH := MainIngredient{
		Name:    "เนื้อกุ้ง",
		Carolie: 99,
		Type:    "วัตถุดิบจากสัตว์",
	}
	db.Model(&MainIngredient{}).Create(&MainIngredientH)

	FoodTypeA := FoodType{
		Name: "อาหารคาว",
	}
	db.Model(&FoodType{}).Create(&FoodTypeA)

	FoodTypeB := FoodType{
		Name: "อาหารหวาน",
	}
	db.Model(&FoodType{}).Create(&FoodTypeB)

	FoodInformationA := FoodInformation{
		Name:           "ล็อบสเตอร์อบชีส",
		Datetime:       "25/1/2566 18:29:33",
		Image:          "https://img.wongnai.com/p/1920x0/2018/05/03/1d12ded0c8b943a7a8a7d281d694876b.jpg",
		Admin:          AdminA,
		MainIngredient: MainIngredientH,
		FoodType:       FoodTypeA,
	}
	db.Model(&FoodInformation{}).Create(&FoodInformationA)

	FoodInformationB := FoodInformation{
		Name:           "เค้กเรดเวลเวท",
		Datetime:       "26/1/2566 19:45:54",
		Image:          "https://s359.kapook.com/pagebuilder/9568b809-b606-404a-8253-26fe7287bda7.jpg",
		Admin:          AdminB,
		MainIngredient: MainIngredientC,
		FoodType:       FoodTypeB,
	}
	db.Model(&FoodInformation{}).Create(&FoodInformationB)

	FoodInformationC := FoodInformation{
		Name:           "สเต๊กเนื้อ",
		Datetime:       "26/1/2566 19:45:54",
		Image:          "https://img.wongnai.com/p/1920x0/2019/03/23/73a95587aa2f46e0b160e5a7d9ef430f.jpg",
		Admin:          AdminC,
		MainIngredient: MainIngredientE,
		FoodType:       FoodTypeA,
	}
	db.Model(&FoodInformation{}).Create(&FoodInformationC)

	// BodyMakeup for bodychange recording system --------------------------------------------------------------------------------------
	BodyChangeA := Body{
		Height:       176.00,
		Weight:       64.87,
		Hip:          32.4,
		UpperArm:     46.2,
		Thigh:        53.3,
		NarrowWaist:  34.2,
		NavelWaist:   36.23,
		Bmi:          20.94,
		Note:         "หิววววววววววว",
		Trainer:      Trainer2,
		Member:       Member2,
		CourseDetail: CourseDetail2,
	}
	db.Model(&Body{}).Create(&BodyChangeA)

	BodyChangeB := Body{
		Height:       175.6,
		Weight:       64.87,
		Hip:          32.4,
		UpperArm:     46.2,
		Thigh:        53.3,
		NarrowWaist:  34.2,
		NavelWaist:   36.23,
		Bmi:          21.037,
		Note:         "อยากกินกะหรี่..ปั้บ",
		Trainer:      Trainer1,
		Member:       Member1,
		CourseDetail: CourseDetail1,
	}
	db.Model(&Body{}).Create(&BodyChangeB)

	Discount1 := Discount{
		DiscountCode:       "NOCODE",
		DiscountPercentage: 0,
	}
	db.Model(&Discount{}).Create(&Discount1)
	Discount2 := Discount{
		DiscountCode:       "HEALTHY",
		DiscountPercentage: 10,
	}
	db.Model(&Discount{}).Create(&Discount2)
	Discount3 := Discount{
		DiscountCode:       "LOVE20",
		DiscountPercentage: 20,
	}
	db.Model(&Discount{}).Create(&Discount3)
	Discount4 := Discount{
		DiscountCode:       "S02G19",
		DiscountPercentage: 50,
	}
	db.Model(&Discount{}).Create(&Discount4)

	Duration1 := Duration{
		NumberOfDays:       30,
		DurationPercentage: 0,
	}
	db.Model(&Duration{}).Create(&Duration1)
	Duration2 := Duration{
		NumberOfDays:       60,
		DurationPercentage: 2,
	}
	db.Model(&Duration{}).Create(&Duration2)
	Duration3 := Duration{
		NumberOfDays:       90,
		DurationPercentage: 5,
	}
	db.Model(&Duration{}).Create(&Duration3)
	Duration4 := Duration{
		NumberOfDays:       180,
		DurationPercentage: 10,
	}
	db.Model(&Duration{}).Create(&Duration4)
	Duration5 := Duration{
		NumberOfDays:       365,
		DurationPercentage: 20,
	}
	db.Model(&Duration{}).Create(&Duration5)

	// --------------------------------------------------------------------------------------------------
	// ----------------------------------------  MealPlans  ----------------------------------------------
	// --------------------------------------------------------------------------------------------------
	MealsOfDayA := MealsOfDay{
		Name: "beakfast",
	}
	db.Model(&MealsOfDay{}).Create(&MealsOfDayA)

	MealsOfDayB := MealsOfDay{
		Name: "lunch",
	}
	db.Model(&MealsOfDay{}).Create(&MealsOfDayB)

	MealsOfDayC := MealsOfDay{
		Name: "dinner",
	}
	db.Model(&MealsOfDay{}).Create(&MealsOfDayC)

	BreakFastA := BreakFast{
		FoodInformation: FoodInformationA,
	}
	db.Model(&BreakFast{}).Create(&BreakFastA)

	BreakFastB := BreakFast{
		FoodInformation: FoodInformationB,
	}
	db.Model(&BreakFast{}).Create(&BreakFastB)

	BreakFastC := BreakFast{
		FoodInformation: FoodInformationC,
	}
	db.Model(&BreakFast{}).Create(&BreakFastC)
	LunchA := Lunch{
		FoodInformation: FoodInformationA,
	}
	db.Model(&Lunch{}).Create(&LunchA)
	LunchB := Lunch{
		FoodInformation: FoodInformationB,
	}
	db.Model(&Lunch{}).Create(&LunchB)
	LunchC := Lunch{
		FoodInformation: FoodInformationC,
	}
	db.Model(&Lunch{}).Create(&LunchC)
	DinnerA := Dinner{
		FoodInformation: FoodInformationA,
	}
	db.Model(&Dinner{}).Create(&DinnerA)
	DinnerB := Dinner{
		FoodInformation: FoodInformationB,
	}
	db.Model(&Dinner{}).Create(&DinnerB)
	DinnerC := Dinner{
		FoodInformation: FoodInformationC,
	}
	db.Model(&Dinner{}).Create(&DinnerC)

	NutritiousA := Nutritious{
		Calories:     271.1,
		Carbohydrate: 10,
		Protein:      21.5,
	}
	db.Model(&Nutritious{}).Create(&NutritiousA)

	NutritiousB := Nutritious{
		Calories:     252,
		Carbohydrate: 21.5,
		Protein:      25,
	}
	db.Model(&Nutritious{}).Create(&NutritiousB)

	NutritiousC := Nutritious{
		Calories:     311.5,
		Carbohydrate: 19,
		Protein:      12.5,
	}
	db.Model(&Nutritious{}).Create(&NutritiousC)

	AvoidFoodA := AvoidFood{
		Name: "ถั่ว",
	}
	db.Model(&AvoidFood{}).Create(&AvoidFoodA)

	AvoidFoodB := AvoidFood{
		Name: "นม",
	}
	db.Model(&AvoidFood{}).Create(&AvoidFoodB)

	AvoidFoodC := AvoidFood{
		Name: "ไข่",
	}
	db.Model(&AvoidFood{}).Create(&AvoidFoodC)

	//Main Entity
	MealPlansA := MealPlans{
		Date:        time.Date(2023, time.January, 3, 15, 03, 00, 0, time.UTC),
		Description: "รับประทานโปรตีนเพิ่ม",

		MealsOfDay: MealsOfDayA,
		AvoidFood:  AvoidFoodA,
		Nutritious: NutritiousA,
		Admin:      AdminA,
		Member:     Member1,
	}
	db.Model(&MealPlans{}).Create(&MealPlansA)

	MealPlansB := MealPlans{
		Date:        time.Date(2023, time.January, 4, 10, 05, 00, 0, time.UTC),
		Description: "รับประทานอาหารเพิ่มเป็น 4 มื้อ",

		MealsOfDay: MealsOfDayB,
		AvoidFood:  AvoidFoodB,
		Nutritious: NutritiousB,
		Admin:      AdminB,
		Member:     Member2,
	}
	db.Model(&MealPlans{}).Create(&MealPlansB)
	MealPlansC := MealPlans{
		Date:        time.Date(2023, time.January, 4, 10, 02, 01, 0, time.UTC),
		Description: "งดอาหารรสจัด",

		MealsOfDay: MealsOfDayC,
		AvoidFood:  AvoidFoodC,
		Nutritious: NutritiousC,
		Admin:      AdminC,
		Member:     Member3,
	}
	db.Model(&MealPlans{}).Create(&MealPlansC)

	//--------------------------------------------------------------------------------------------------
	//----------------------------------------  DailyActivities  ---------------------------------------
	//--------------------------------------------------------------------------------------------------
	FoodAllergiesA := FoodAllergies{
		Allergen:      "ไข่ นม",
		AllergyType:   "ชนิดไม่เฉียบพลัน",
		Reaction:      "อาการจะค่อยๆ เกิดขึ้นหลังจากทานอาหารเข้าไปแล้ว หลายชั่วโมงหรืออาจเป็นวัน เช่น เป็นผื่นโดยจะมีผื่นแดง",
		LastReactDate: time.Date(2023, time.January, 3, 15, 03, 00, 0, time.UTC),
	}
	db.Model(&FoodAllergies{}).Create(&FoodAllergiesA)

	FoodAllergiesB := FoodAllergies{
		Allergen:      "ถั่ว",
		AllergyType:   "ชนิดเฉียบพลัน",
		Reaction:      "อาการจะเกิดขึ้นภายใน 30 นาที-1 ชั่วโมง หลังจากทานอาหารเข้าไปและมีความเสี่ยงที่จะเกิดอาการแพ้รุนแรงได้ เช่น มีอาการตาบวม ปากบวม ผื่นลมพิษ หลอดลมตีบ ไอ แน่นหน้าอก หายใจไม่ออก ปวดท้อง อาเจียน",
		LastReactDate: time.Date(2023, time.January, 3, 15, 03, 00, 0, time.UTC),
	}
	db.Model(&FoodAllergies{}).Create(&FoodAllergiesB)

	FoodAllergiesC := FoodAllergies{
		Allergen:      "อาหารทะเล",
		AllergyType:   "ชนิดรุนแรง",
		Reaction:      "เป็นอาการแพ้ในระดับรุนแรงที่สุดและเป็นอันตรายถึงชีวิต โดยอาการอาจเกิดขึ้นทันทีที่ทานอาหารที่แพ้เข้าไป อาการที่เกิดขึ้นได้แก่ ผื่นแดงตามผิวหนัง ลมพิษ คัน ผิวหนัง แดงหรือซีด เวียนศีรษะ หน้ามืดคล้ายจะเป็นลม คลื่นไส้ อาเจียน ปวดท้อง หรือท้องเสีย",
		LastReactDate: time.Date(2023, time.January, 3, 15, 03, 00, 0, time.UTC),
	}
	db.Model(&FoodAllergies{}).Create(&FoodAllergiesC)

	ActivitiesTypeA := ActivitiesType{
		Name: "Balance",
	}
	db.Model(&ActivitiesType{}).Create(&ActivitiesTypeA)

	ActivitiesTypeB := ActivitiesType{
		Name: "Aerobic",
	}
	db.Model(&ActivitiesType{}).Create(&ActivitiesTypeB)

	ActivitiesTypeC := ActivitiesType{
		Name: "Muscle-strengthening",
	}
	db.Model(&ActivitiesType{}).Create(&ActivitiesTypeC)

	DailyActivitiesA := DailyActivities{
		Name:           "เดิน",
		Duration:       "45 นาที",
		Date:           time.Date(2023, time.January, 3, 15, 03, 00, 0, time.UTC),
		ActivitiesType: ActivitiesTypeA,
		Admin:          AdminA,
		Member:         Member1,
	}
	db.Model(&DailyActivities{}).Create(&DailyActivitiesA)

	DailyActivitiesB := DailyActivities{
		Name:           "วิ่ง",
		Duration:       "1 ชั่วโมง",
		Date:           time.Date(2023, time.January, 3, 15, 03, 00, 0, time.UTC),
		ActivitiesType: ActivitiesTypeB,
		Admin:          AdminB,
		Member:         Member2,
	}
	db.Model(&DailyActivities{}).Create(&DailyActivitiesB)

	DailyActivitiesC := DailyActivities{
		Name:           "ปืนเขา",
		Duration:       "2 ชั่ว",
		Date:           time.Date(2023, time.January, 3, 15, 03, 00, 0, time.UTC),
		ActivitiesType: ActivitiesTypeC,
		Admin:          AdminC,
		Member:         Member3,
	}
	db.Model(&DailyActivities{}).Create(&DailyActivitiesC)

	// Advice part ------------------------------------------------------
	Advice1 := Advice{
		Advice:          "กินโปรตีนเพิ่มให้ได้ 2 g ต่อน้ำหนักตัว 1 kg",
		RecordingDate:   time.Date(2023, time.January, 4, 14, 14, 00, 0, time.UTC),
		Member:          Member1,
		Trainer:         Trainer1,
		Body:            BodyChangeA,
		DailyActivities: DailyActivitiesA,
	}
	db.Model(&Advice{}).Create(&Advice1)

	Advice2 := Advice{
		Advice:          "ออกกำลังกายแบบคาร์ดิโอเพิ่มเป็นสัปดาห์ละ 4 วัน วันละ 1 ชม.",
		RecordingDate:   time.Date(2023, time.January, 25, 12, 30, 00, 0, time.UTC),
		Member:          Member2,
		Trainer:         Trainer2,
		Body:            BodyChangeB,
		DailyActivities: DailyActivitiesB,
	}
	db.Model(&Advice{}).Create(&Advice2)

	Advice3 := Advice{
		Advice:          "เล่นเวทเทรนนิ่ง เพิ่มเป็นสัปดาห์ละ 3 วัน วันละ 1.5 ชม.",
		RecordingDate:   time.Date(2023, time.January, 27, 11, 47, 00, 0, time.UTC),
		Member:          Member3,
		Trainer:         Trainer2,
		Body:            BodyChangeA,
		DailyActivities: DailyActivitiesC,
	}
	db.Model(&Advice{}).Create(&Advice3)

	//==========================ระบบจัดการสารอาหาร==========================

	MostNutrientA := MostNutrient{
		Name:           "คาร์โบไฮเดรต",
		CaloriePerGram: 4,
	}
	db.Model(&MostNutrient{}).Create(&MostNutrientA)

	MostNutrientB := MostNutrient{
		Name:           "โปรตีน",
		CaloriePerGram: 4,
	}
	db.Model(&MostNutrient{}).Create(&MostNutrientB)

	MostNutrientC := MostNutrient{
		Name:           "ไขมัน",
		CaloriePerGram: 9,
	}
	db.Model(&MostNutrient{}).Create(&MostNutrientC)

	MostNutrientD := MostNutrient{
		Name:           "เกลือแร่",
		CaloriePerGram: 0,
	}
	db.Model(&MostNutrient{}).Create(&MostNutrientD)

	MostNutrientE := MostNutrient{
		Name:           "วิตามิน",
		CaloriePerGram: 0,
	}
	db.Model(&MostNutrient{}).Create(&MostNutrientE)

	NutrientA := Nutrient{
		FoodInformation: FoodInformationA,
		MostNutrient:    MostNutrientB,
		TotalCalorie:    253,
		Comment:         "กินเยอะจะไม่ดีกับสุขภาพ",
		Admin:           AdminA,
		Date:            "20/12/2022 15:00",
	}
	db.Model(&Nutrient{}).Create(&NutrientA)

	NutrientB := Nutrient{
		FoodInformation: FoodInformationB,
		MostNutrient:    MostNutrientA,
		TotalCalorie:    400,
		Comment:         "อร่อยม๊ากกกก !!!",
		Admin:           AdminB,
		Date:            "21/12/2022 16:00",
	}
	db.Model(&Nutrient{}).Create(&NutrientB)

	/////////////////////////////////////Behavior/////////////////////////////////////////////
	Taste1 := Taste{
		Name: "รสขม",
	}
	db.Model(&Taste{}).Create(&Taste1)

	Tastes := []Taste{
		{Name: "รสหวาน"},
		{Name: "รสเปรี้ยว"},
		{Name: "รสเค็ม"},
		{Name: "รสเผ็ด"},
	}
	db.Model(&Taste{}).Create(&Tastes)

	Exercise1 := Exercise{
		Name: "ไม่ออกเลย",
	}
	db.Model(&Exercise{}).Create(&Exercise1)

	Exercises := []Exercise{
		{Name: "มาก(5-7วัน/สัปดาห์)"},
		{Name: "ปกติ(3-4วัน/สัปดาห์)"},
		{Name: "น้อย(1-2วัน/สัปดาห์)"},
	}
	db.Model(&Exercise{}).Create(&Exercises)

	BehaviorA := Behavior{
		Meals:    "กินวันละ 4 มื้อ",
		Time:     "21/12/2022 17:00",
		Member:   Member1,
		Exercise: Exercise1,
		Taste:    Taste1,
	}
	db.Model(&Behavior{}).Create(&BehaviorA)

	BehaviorB := Behavior{
		Meals:    "กินวันละ 4 มื้อ",
		Time:     "21/12/2022 15:00",
		Member:   Member1,
		Exercise: Exercise1,
		Taste:    Taste1,
	}
	db.Model(&Behavior{}).Create(&BehaviorB)

}
