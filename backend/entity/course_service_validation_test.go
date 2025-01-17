package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestCourseServiceValidate(t *testing.T) {
	g := NewGomegaWithT(t) // start testing

	t.Run("check course service conpletely", func(t *testing.T) {
		cs := CourseService{
			CRegisterDate: time.Now(),
			Agreement:     "Agree",
			Status:        "Active",
			RefundMessage: "He has a fierce character",
		}

		ok, err := govalidator.ValidateStruct(cs)
		// ok = true
		// err = nil

		// เช็ค ok เป็นจริง
		g.Expect(ok).To(BeTrue())

		// เช็ค err เป็นเท็จ
		g.Expect(err).To(BeNil())
	})

	t.Run("check agreement matches 'Agree'", func(t *testing.T) {
		cs := CourseService{
			CRegisterDate: time.Now(),
			Agreement:     "Disagree", // incorrect
			Status:        "Active",
			RefundMessage: "-",
		}

		ok, err := govalidator.ValidateStruct(cs)
		// ok = nil
		// err = true

		// เช็ค ok ไม่เป็นจริง (เพราะเกิด error ที่ Agreement)
		g.Expect(ok).NotTo(BeTrue())

		// เช็ค err ไม่เป็นเท็จ (เพราะเกิด error ที่ Agreement)
		g.Expect(err).ToNot(BeNil())

		// เช็ค err message เป็น Please check 'Agree' (เพราะเกิด error ที่ Agreement)
		g.Expect(err.Error()).To(Equal("Please check 'Agree'"))
	})

	t.Run("check date not past", func(t *testing.T) {
		cs := CourseService{
			CRegisterDate: time.Now().AddDate(0, -1, 0), // incorrect
			Agreement:     "Agree",
			Status:        "Active",
			RefundMessage: "-",
		}

		ok, err := govalidator.ValidateStruct(cs)
		// ok = nil
		// err = true

		// เช็ค ok ไม่เป็นจริง (เพราะเกิด error ที่ CRegisterDate)
		g.Expect(ok).NotTo(BeTrue())

		// เช็ค err ไม่เป็นเท็จ (เพราะเกิด error ที่ CRegisterDate)
		g.Expect(err).ToNot(BeNil())

		// เช็ค err message เป็น Date must not be in the past (เพราะเกิด error ที่ CRegisterDate)
		g.Expect(err.Error()).To(Equal("Date must not be in the past"))
	})

	t.Run("check date not future", func(t *testing.T) {
		cs := CourseService{
			CRegisterDate: time.Now().AddDate(0, 1, 0), // incorrect
			Agreement:     "Agree",
			Status:        "Active",
			RefundMessage: "-",
		}

		ok, err := govalidator.ValidateStruct(cs)
		// ok = nil
		// err = true

		// เช็ค ok ไม่เป็นจริง (เพราะเกิด error ที่ CRegisterDate)
		g.Expect(ok).NotTo(BeTrue())

		// เช็ค err ไม่เป็นเท็จ (เพราะเกิด error ที่ CRegisterDate)
		g.Expect(err).ToNot(BeNil())

		// เช็ค err message เป็น Date must not be in the future (เพราะเกิด error ที่ CRegisterDate)
		g.Expect(err.Error()).To(Equal("Date must not be in the future"))
	})

	t.Run("check agreement matches 'Agree'", func(t *testing.T) {
		cs := CourseService{
			CRegisterDate: time.Now(),
			Agreement:     "Disagree", // incorrect
			Status:        "Active",
			RefundMessage: "-",
		}

		ok, err := govalidator.ValidateStruct(cs)
		// ok = nil
		// err = true

		// เช็ค ok ไม่เป็นจริง (เพราะเกิด error ที่ Agreement)
		g.Expect(ok).NotTo(BeTrue())

		// เช็ค err ไม่เป็นเท็จ (เพราะเกิด error ที่ Agreement)
		g.Expect(err).ToNot(BeNil())

		// เช็ค err message เป็น Please check 'Agree' (เพราะเกิด error ที่ Agreement)
		g.Expect(err.Error()).To(Equal("Please check 'Agree'"))
	})

	t.Run("check refund message cannot be blank", func(t *testing.T) {
		cs := CourseService{
			CRegisterDate: time.Now(),
			Agreement:     "Agree",
			Status:        "Active",
			RefundMessage: "", // incorrect
		}

		ok, err := govalidator.ValidateStruct(cs)
		// ok = nil
		// err = true

		// เช็ค ok ไม่เป็นจริง (เพราะเกิด error ที่ RefundMessage)
		g.Expect(ok).NotTo(BeTrue())

		// เช็ค err ไม่เป็นเท็จ (เพราะเกิด error ที่ RefundMessage)
		g.Expect(err).ToNot(BeNil())

		// เช็ค err message เป็น Message cannot be blank (เพราะเกิด error ที่ RefundMessage)
		g.Expect(err.Error()).To(Equal("Message cannot be blank"))
	})
}
