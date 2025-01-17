package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team19/entity"
	"gorm.io/gorm/clause"
)

// POST /admin
func CreateAdmin(c *gin.Context) {
	var admin entity.Admin
	if err := c.ShouldBindJSON(&admin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&admin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": admin})
}

// GET /admin/:id
func GetAdmin(c *gin.Context) {
	var admin entity.Admin
	id := c.Param("id")
	if tx := entity.DB().Preload(clause.Associations).Preload("CourseDetail."+clause.Associations).Preload("FoodInformation."+clause.Associations).Where("id = ?", id).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": admin})
}

// GET /admins
func ListAdmins(c *gin.Context) {
	var admins []entity.Admin
	if err := entity.DB().Preload(clause.Associations).Preload("CourseDetail." + clause.Associations).Preload("FoodInformation." + clause.Associations).Raw("SELECT * FROM admins").Scan(&admins).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": admins})
}

// DELETE /admins/:id
func DeleteAdmin(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM admins WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admins not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /admins
func UpdateAdmin(c *gin.Context) {
	var admins entity.Admin
	if err := c.ShouldBindJSON(&admins); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", admins.ID).First(&admins); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admins not found"})
		return
	}

	if err := entity.DB().Save(&admins).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": admins})
}
