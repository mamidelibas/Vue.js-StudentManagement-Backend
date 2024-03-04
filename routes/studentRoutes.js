/**
 * @swagger
 * tags:
 *   - name: 'student'
 *     description: 'Operations related to students'
 *
 * paths:
 *   /student/create:
 *     post:
 *       tags:
 *         - 'student'
 *       summary: 'Create a new student'
 *       consumes:
 *         - 'application/json'
 *       produces:
 *         - 'application/json'
 *       parameters:
 *         - in: 'body'
 *           name: 'studentData'
 *           description: 'Student data to be created'
 *           required: true
 *           schema:
 *             $ref: '#/definitions/Student'
 *       responses:
 *         '201':
 *           description: 'Student created successfully'
 *           schema:
 *             $ref: '#/definitions/Student'
 *         '400':
 *           description: 'Bad request - Check required fields'
 *         '500':
 *           description: 'Internal server error'
 *
 *   /student/{id}/update:
 *     put:
 *       tags:
 *         - 'student'
 *       summary: 'Update a student by ID'
 *       consumes:
 *         - 'application/json'
 *       produces:
 *         - 'application/json'
 *       parameters:
 *         - in: 'path'
 *           name: 'id'
 *           type: 'string'
 *           required: true
 *           description: 'ID of the student to be updated'
 *         - in: 'body'
 *           name: 'studentData'
 *           description: 'Updated student data'
 *           required: true
 *           schema:
 *             $ref: '#/definitions/Student'
 *       responses:
 *         '200':
 *           description: 'Student updated successfully'
 *           schema:
 *             $ref: '#/definitions/Student'
 *         '400':
 *           description: 'Bad request - Check required fields'
 *         '500':
 *           description: 'Internal server error'
 *
 *   /student/{id}/delete:
 *     delete:
 *       tags:
 *         - 'student'
 *       summary: 'Delete a student by ID'
 *       produces:
 *         - 'application/json'
 *       parameters:
 *         - in: 'path'
 *           name: 'id'
 *           type: 'string'
 *           required: true
 *           description: 'ID of the student to be deleted'
 *       responses:
 *         '204':
 *           description: 'Student deleted successfully'
 *         '500':
 *           description: 'Internal server error'
 *
 *   /student:
 *     get:
 *       tags:
 *         - 'student'
 *       summary: 'Get all students'
 *       produces:
 *         - 'application/json'
 *       responses:
 *         '200':
 *           description: 'List of students'
 *           schema:
 *             type: 'array'
 *             items:
 *               $ref: '#/definitions/Student'
 *         '500':
 *           description: 'Internal server error'
 *
 * definitions:
 *   Student:
 *     type: 'object'
 *     properties:
 *       _id:
 *         type: 'string'
 *       name:
 *         type: 'string'
 *       lastName:
 *         type: 'string'
 *       mail:
 *         type: 'string'
 *       phoneNumber:
 *         type: 'string'
 *       courses:
 *         type: 'array'
 *         items:
 *           type: 'string'
 *
 */

const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// Define routes
router.post("/create", studentController.createStudent);
router.put("/:id/update", studentController.updateStudent);
router.delete("/:id/delete", studentController.deleteStudent);
router.get("/", studentController.getStudents);

module.exports = router;
