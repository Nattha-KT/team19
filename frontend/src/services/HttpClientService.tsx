import { CourseDetailInterface } from "../interfaces/ICourseDetail";
import { CourseServiceInterface } from "../interfaces/ICourseService";
import { UserInterface } from "../interfaces/IUser";
import { ReviewInterface } from "../interfaces/IReview";
import { SignInInterface } from "../interfaces/ISignIn";
import { BlogInterface } from "../interfaces/IBlog";
import { useState } from "react";
import { FoodInformationInterface } from "../interfaces/IFoodInformation";
import { NutrientInterface } from "../interfaces/INutrient";
import { PaymentInterface } from "../interfaces/IPayment";

const apiUrl = `http://localhost:8080`;

const requestOptionsGet = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
};

async function Login(data: SignInInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/login`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("uid", res.data.id);
        localStorage.setItem("firstname", res.data.firstname);
        localStorage.setItem("lastname", res.data.lastname);
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetCourseService() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/course_services`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetUser() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/users`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetCourseDetail() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/course_details`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        console.log(res.data);
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetTrainer() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/trainers`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function CreateCourseService(data: UserInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/course_services/create`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function CourseServices(data: CourseServiceInterface) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/course_services`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetAdmin() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/admins`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        console.log(res.data);
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetPrice() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/prices`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        console.log(res.data);
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetDescription() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/descriptions`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        console.log(res.data);
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

// ------------- Review -----------------
const GetReviews = async () => {
  let res = await fetch(`${apiUrl}/reviews`, requestOptionsGet)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const GetReviewByID = async (id: string) => {
  let res = await fetch(`${apiUrl}/review/${id}`, requestOptionsGet)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const CreateReviews = async (data: ReviewInterface) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/reviews`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const UpdateReview = async (data: BlogInterface) => {
  const requestOptions = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/update-review`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const DeleteReview = async (id: string) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/delete-review/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const GetRanks = async () => {
  let res = await fetch(`${apiUrl}/ranks`, requestOptionsGet)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

// ------------- Blog -----------------
const GetBlogs = async () => {
  let res = await fetch(`${apiUrl}/blogs`, requestOptionsGet)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const GetBlogByID = async (id: string) => {
  // let { id } = useParams();
  let res = await fetch(`${apiUrl}/blog/${id}`, requestOptionsGet)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const CreateBlog = async (data: BlogInterface) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/blogs`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const UpdateBlog = async (data: BlogInterface) => {
  const requestOptions = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/update-blog`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const DeleteBlog = async (id: string) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/delete-blog/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const GetCategories = async () => {
  let res = await fetch(`${apiUrl}/categories`, requestOptionsGet)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const GetTags = async () => {
  let res = await fetch(`${apiUrl}/tags`, requestOptionsGet)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

// ----------------------FoodInformation----------------------
const GetFoodTypes = async () => {
  let res = await fetch(`${apiUrl}/food_types`, requestOptionsGet)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const GetMainIngredients = async () => {
  let res = await fetch(`${apiUrl}/main_ingredients`, requestOptionsGet)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const CreateFoodInformation = async (data: FoodInformationInterface) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/food_informations`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const GetAdminByID = async () => {
  const id = localStorage.getItem("uid");

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/admin/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const GetFoodInformations = async () => {
  let res = await fetch(`${apiUrl}/food_informations`, requestOptionsGet)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const DeleteFoodInformation = async (id: string) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/delete-food_information/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const GetInfoBody = async () => {
  let res = await fetch(`${apiUrl}/bodies`, requestOptionsGet)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const DeleteInfoBody = async (id: string) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/body/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

// ============================== Nutrient ==============================
const GetMostNutrient = async () => {
  let res = await fetch(`${apiUrl}/most_nutrients`, requestOptionsGet)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const CreateNutrient = async (data: NutrientInterface) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/nutrients`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

//===========================Member===========================

const CreateMember= async (data: UserInterface) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/member`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const DeleteNutrient = async (id: string) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/delete-nutrient/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};


async function GetCourseDetailByID(id: number | undefined) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/course_detail/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function SelectCourseDetail(id: number | undefined) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/course_detail/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });
  return res;
}

async function GetPayment() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/payments`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        console.log(res)
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetDuration() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/durations`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetDiscountByCode(code: string | undefined) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/discount/${code}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetDurationByID(id: number | undefined) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/duration/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetCourseServiceBYUID() {
  const uid = localStorage.getItem("uid")
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/course_service_by_uid/${uid}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function Payments(data: PaymentInterface) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/payment`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        console.log(res.data)
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

export {
  GetUser,
  GetCourseDetail,
  GetTrainer,
  GetAdmin,
  GetPrice,
  GetDescription,
  CreateCourseService,
  // CourseService
  GetCourseService,
  GetCourseDetailByID,
  SelectCourseDetail,
  CourseServices,
  // Payment
  GetPayment,
  GetDuration,
  GetDiscountByCode,
  GetDurationByID,
  GetCourseServiceBYUID,
  Payments,
  Login,
  // Blog
  CreateBlog,
  UpdateBlog,
  DeleteBlog,
  GetBlogs,
  GetBlogByID,
  GetCategories,
  GetTags,
  // FoodInformation
  GetFoodTypes,
  GetMainIngredients,
  CreateFoodInformation,
  GetAdminByID,
  GetFoodInformations,
  DeleteFoodInformation,
  // Review
  CreateReviews,
  UpdateReview,
  DeleteReview,
  GetReviews,
  GetReviewByID,
  GetRanks,
  // Nutrient
  GetMostNutrient,
  CreateNutrient,
  DeleteNutrient,
  // Member
  CreateMember,
  //Body
  DeleteInfoBody,
  GetInfoBody,
};
