const { CollectorDetails } = require("../model");
const { Users } = require("../model");

module.exports.register_company_controller = async (req, res) => {
  const {
    login_id,
    login_password,
    user_name,
    user_type,
    wallet_address,
    wallet_privatekey,
    company_name,
  } = req.body;

  console.log("hello");
  try {
    if (!login_id) {
      console.log("if!");
      return res
        .status(400)
        .send({ message: "login_id 값이 유효하지 않습니다." });
    }
    const existingUser = await Users.findOne({ where: { login_id } });
    console.log("if!");
    if (existingUser) {
      return res.status(409).send({ message: "이미 존재하는 ID입니다." });
    }
    console.log("if!");
    const createdUser = await Users.create({
      login_id,
      login_password,
      user_name,
      user_type,
      wallet_address,
      wallet_privatekey,
    });

    const created_CollectorDetails = await CollectorDetails.create({
      user_id: createdUser.user_id,
      company_name,
    });

    console.log("if!");
    console.log({ message: "회원 가입에 성공하였습니다." });
  } catch (error) {
    console.error(error);
    console.log({ message: "회원 가입에 실패하였습니다." });
  }
};
