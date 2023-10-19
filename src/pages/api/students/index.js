import { Student } from "@app/server/database/sequelize";
import { validateRequest } from "@app/server/firebase/firebase";
import { Op } from "sequelize";

const searchStudents = async (req, res) => {
  const query = {
    ...req.query,
    pageIndex: +req.query.pageIndex || 0,
    itemsPerPage: +req.query.itemsPerPage || 5,
  };
  const where = {};
  if (req.query.searchTerm?.trim()) {
    where.name = {
      [Op.like]: `%${req.query.searchTerm}%`,
    };
  }
  if (req.query.gender?.trim()) {
    where.gender = {
      [Op.eq]: req.query.gender,
    };
  }
  const result = await Student.findAll({
    attributes: ["id", "name", "gender", "age"],
    where,
    offset: query.pageIndex * query.itemsPerPage,
    limit: query.itemsPerPage,
    order: [["name", "ASC"]],
  });
  const total = await Student.count({
    where,
  });
  console.log(result, total);

  res.status(200).json({
    data: result,
    total,
  });
};

const createStudent = async (req, res) => {
  const newStudent = JSON.parse(req.body);
  await Student.create({
    name: newStudent.name,
    age: newStudent.age,
    gender: newStudent.gender,
  });
  res.status(200).json({
    id,
  });
};

export default async function handler(req, res) {
  const user = await validateRequest(req);
  if (!user) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
  if (req.method === "POST") {
    return createStudent(req, res);
  } else if (req.method === "GET") {
    return searchStudents(req, res);
  }
  res.status(405).json({
    message: "Method not allowed",
  });
}
