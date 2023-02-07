const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../ulti/mongoose");

class MeController {
  // [GET] /me/stored/courses
  storeCourses(req, res, next) {
    Promise.all([Course.find({}).sortable(req), Course.countDocumentsDeleted()])
      .then(([courses, deletedCount]) =>
        res.render("me/stored-courses", {
          deletedCount,
          courses: mutipleMongooseToObject(courses),
        })
      )
      .catch(next);
  }

  // [GET] /me/trash/courses
  trashCourses(req, res, next) {
    Course.findDeleted({})
      .then((courses) =>
        res.render("me/trash-courses", {
          courses: mutipleMongooseToObject(courses),
        })
      )
      .catch(next);
  }
}

module.exports = new MeController();
