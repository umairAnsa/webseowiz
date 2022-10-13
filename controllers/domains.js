import connection from "../config/db.js";
import Joi from "joi";

//Get Domains list
export const getDomainsList = async (req, res, next) => {
  try {
    const sql = `SELECT * FROM offer_cards`;
    connection.query(sql, (err, result) => {
      if (err) return res.status(200).send({ success: false, message: err });
      res.status(200).send({ success: true, data: result });
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

//Create new Domains
export const createNewDomains = async (req, res) => {
  const { name, image, description, price, is_active } = req.body;
  const created_at = new Date().toISOString().slice(0, 19).replace("T", " ");
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ data: null, message: error });
  try {
    const sql = `INSERT INTO offer_cards (name, image, description, price, is_active, created_at) VALUES ("${name}", "${image}", "${description}", "${price}", "${is_active}", "${created_at}")`;
    await connection.query(sql, (err, result) => {
      if (err) return res.status(200).send({ success: false, message: err });
      res.status(201).send({ success: true, message: "Successfully created new domain" });
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

//Update Existing Domains
export const updateDomains = async (req, res) => {
  const id = req.params.id;
  const updated_at = new Date().toISOString().slice(0, 19).replace("T", " ");
  const { name, image, description, price, is_active } = req.body;
  try {
    const sql = `UPDATE offer_cards SET name="${name}", image="${image}", description="${description}", price="${price}", is_active="${is_active}", updated_at="${updated_at}" WHERE id=${id}`;
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

//Delete Domains
export const deleteDomains = async (req, res) => {
  const id = req.params.id;
  try {
    const sql = `DELETE FROM offer_cards WHERE id=${id}`;
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
    price: Joi.string().required(),
    is_active: Joi.string().required(),
  });
  return schema.validate(data);
}
