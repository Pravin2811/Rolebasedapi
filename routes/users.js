const router = require("express").Router();

const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  serializeUser
} = require("../utils/Auth");


router.post("/register-student", async (req, res) => {
  await userRegister(req.body, "student", res);
});


router.post("/register-teacher", async (req, res) => {
  await userRegister(req.body, "teacher", res);
});


router.post("/register-principal", async (req, res) => {
  await userRegister(req.body, "principal", res);
});


router.post("/login-student", async (req, res) => {
  await userLogin(req.body, "student", res);
});


router.post("/login-teacher", async (req, res) => {
  await userLogin(req.body, "teacher", res);
});


router.post("/login-principal", async (req, res) => {
  await userLogin(req.body, "principal", res);
});


router.get("/profile", userAuth, async (req, res) => {
  return res.json(serializeUser(req.user));
});


router.get("/student",userAuth,checkRole(["student"]),async (req, res) => {
    return res.json("Hello Student");
  }
);


router.get("/teacher",userAuth,checkRole(["teacher"]),async (req, res) => {
    return res.json("Hello Teacher");
  }
);


router.get("/principal",userAuth,checkRole(["principal"]),async (req, res) => {
    return res.json("Hello Principal");
  }
);


module.exports = router;
