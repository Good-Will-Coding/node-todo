const express = require("express");
const router = express.Router();
const db = require("../../database");

router.get("/", (req, res) => {
  // to execute query, use .then
  db.select()
    .from("todo")
    .orderBy("id")
    .then(data => {
      res.send(data);
    });
});

router.post("/", (req, res) => {
  // INSERT INTO db
  db.insert(req.body)
    // returning everything to not make second query
    .returning("*")
    .into("todo")
    .then(data => {
      res.send(data);
    });
});

router.patch("/:id", (req, res) => {
  // select * from todo where id = ourid
  db("todo")
    .where({ id: req.params.id })
    .update(req.body)
    .returning("*")
    .then(data => {
      res.send(data);
    });
});

router.put("/:id", (req, res) => {
  // select * from todo where id = ourid
  db("todo")
    .where({ id: req.params.id })
    .update({
      title: req.body.title || null,
      is_done: req.body.is_done || null
    })
    .returning("*")
    .then(data => {
      res.send(data);
    });
});

router.delete("/:id", (req, res) => {
  db("todo")
    .where({ id: req.params.id })
    .del()
    .then(() => {
      res.json({ success: true });
    });
});

router.get("/:id", (req, res) => {
  db("todo")
    .where({ id: req.params.id })
    .select()
    .then(data => {
      res.send(data);
    });
});

module.exports = router;
