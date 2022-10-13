import connection from "../config/db.js";
import Joi from "joi";

//Get Resturent list
export const getResturentList = async (req, res, next) => {
  try {
    const sql = `SELECT * FROM resturants`;
    connection.query(sql, (err, result) => {
      if (err) return res.status(200).send({ success: false, message: err });
      res.status(200).send({ success: true, data: result });
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

//Create new Resturent
export const createNewResturent = async (req, res) => {
  const { name, image, description, pricing_range } = req.body;
  const created_at = new Date().toISOString().slice(0, 19).replace("T", " ");
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ data: null, message: error });
  try {
    const sql = `INSERT INTO resturants (name, image, description, pricing_range, created_at) VALUES ("${name}", "${image}", "${description}", "${pricing_range}", "${created_at}")`;
    await connection.query(sql, (err, result) => {
      if (err) {
        res.status(200).send({ success: false, message: err });
      }
      res.status(201).send({ success: true, message: "Successfully New Resturant created." });
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

//Update Existing Resturent
export const updateResturant = async (req, res) => {
  const id = req.params.id;
  const updated_at = new Date().toISOString().slice(0, 19).replace("T", " ");
  const { name, image, description, pricing_range } = req.body;
  try {
    const sql = `UPDATE resturants SET name="${name}", image="${image}", description="${description}", pricing_range="${pricing_range}", updated_at="${updated_at}" WHERE id=${id}`;
    connection.query(sql, (err, result) => {
      if (err) return res.status(200).send(err);
      if (result.affectedRows > 0)
        return res.status(200).send({ success: true, message: "Successfully updated" });
      res.status(200).send({ success: false, data: "Id not Exist" });
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
};

//Delete Resturant
export const deleteResturant = async (req, res) => {
  const id = req.params.id;
  try {
    const sql = `DELETE FROM resturants WHERE id=${id}`;
    connection.query(sql, (err, result) => {
      if (err) return res.status(200).send(err);
      if (result.affectedRows > 0)
        return res
          .status(200)
          .send({ success: true, message: "Successfully deleted" });
      res.status(200).send({ success: false, message: "Record not found" });
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

function validate(data) {
  const schema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    description: Joi.string().required(),
    pricing_range: Joi.string().required(),
  });
  return schema.validate(data);
}
