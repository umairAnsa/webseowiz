import connection from "../config/db.js";
import Joi from "joi";

//get all cards list
export const getCardsList = (req, res) => {
  try {
    connection.query("SELECT * FROM cards", function (err, result, fields) {
      if (err) throw err;
      res.json({ success: true, data: result });
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
};

//Create new Card
export const createNewCard = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ data: null, message: error });
  const { card_holder_name, card_no, expiry_date } = req.body;
  const time = new Date().toISOString().slice(0, 19).replace("T", " ");

  try {
    await connection.query(
      `INSERT INTO cards (card_holder_name,card_no,expiry_date,created_at) values("${card_holder_name}", "${card_no}", "${expiry_date}", "${time}")`,
      function (err, result, fields) {
        // if any error while executing above query, throw error
        if (err) return res.status(400).send(err);
        // if there is no error, you have the result
        if (result.affectedRows > 0)
          return res.status(201).send({
            success: true,
            message: "Successfully new cards created",
          });
        res.status(201).json({
          success: false,
          message: result.details,
        });
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteCard = async (req, res) => {
  try {
    const id = req.params.id;
    var sql = `DELETE FROM cards WHERE id = ${id}`;
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(200).send({ message: err });
      }
      if (result.affectedRows > 0)
        return res.status(200).send({
          success: true,
          message: "Successfully deleted",
        });
      res.status(200).send({ success: false, message: "Record not found!" });
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
};

export const updateCard = async (req, res, next) => {
  try {
    const update_time = new Date().toISOString().slice(0, 19).replace("T", " ");
    const id = req.params.id;
    const { card_holder_name, card_no, expiry_date } = req.body;
    var sql = `UPDATE cards SET card_holder_name = '${card_holder_name}', card_no= '${card_no}', expiry_date= '${expiry_date}', updated_at= '${update_time}'  WHERE id = ${id}`;
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(200).send({ message: err });
      }
      if (result.affectedRows > 0) {
        res.send({
          success: true,
          message: "Successfully updated card",
        });
      } else {
        res.send({
          success: false,
          message: "Record not Exist",
        });
      }
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
};

function validate(data) {
  const schema = Joi.object({
    card_holder_name: Joi.string().required(),
    card_no: Joi.string().required(),
    expiry_date: Joi.string().required(),
  });
  return schema.validate(data);
}
