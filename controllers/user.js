import connection from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//Register user
export const register = (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!email || !password || !name)
      return res.status(400).send({
        success: false,
        message: "Enter email and password correctly!",
      });

    connection.query(
      "SELECT email FROM users WHERE email = ?",
      [email],
      (err, result) => {
        if (err) return res.status(404).send({ success: false, message: err });
        if (result[0])
          return res
            .status(200)
            .send({ success: false, message: "Email already exist!" });
        else {
          const salt = bcrypt.genSaltSync(10);
          const hashPassword = bcrypt.hashSync(password, salt);
          const created_at = new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
          const token = jwt.sign(
            { email: email, password: password },
            process.env.JWT_KEY
          );
          connection.query(
            `INSERT INTO users (name, email, password, remember_token, created_at) VALUES("${name}", "${email}", "${hashPassword}", "${token}", "${created_at}")`,
            (err, result) => {
              if (err) return res.status(401).send({ message: err });
              res.status(201).send({
                success: true,
                message: "Successfully registerd",
                token,
              });
            }
          );
        }
      }
    );
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
};

//Login call
export const login = (req, res) => {
  try {
    const { email, password } = req.body;
    connection.query(
      `SELECT * FROM users WHERE email = '${email}'`,
      (err, result) => {
        if (err) return res.status(404).send({ success: false, message: err });
        if (!result[0] || !bcrypt.compareSync(password, result[0].password)) {
          res
            .status(200)
            .send({ success: false, message: "You are not authenticated!" });
        } else {
          const token = jwt.sign(
            { id: result[0].id, email: result[0].email },
            process.env.JWT_KEY
          );
          res
            .status(200)
            .cookie("access_token", token)
            .send({ success: true, token });
        }
      }
    );
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
};

//forget password user
export const forgetPassword = (req, res) => {
  try {
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const updated_at = new Date().toISOString().slice(0, 19).replace("T", " ");
    connection.query(
      `UPDATE users SET password='${hashPassword}', updated_at='${updated_at}' WHERE email='${email}'`,
      (err, result) => {
        if (err) return res.status(200).send({ success: false, message: err });
        console.log(result)
        if (result.affectedRows > 0) {
          res
            .status(200)
            .send({ success: true, message: "Successfully update" });
        } else {
          res.status(400).send({ success: false, message: "User not valid!" });
        }
      }
    );
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
};
