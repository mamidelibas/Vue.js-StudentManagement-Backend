const express = require("express");
const router = express.Router();
const classController = require("../controllers/classController");

/**
 * @swagger
 * tags:
 *   - name: 'class'
 *     description: 'Operations related to classes'
 *
 * paths:
 *   /class/create:
 *     post:
 *       tags:
 *         - 'class'
 *       summary: 'Create a new class'
 *       consumes:
 *         - 'application/json'
 *       produces:
 *         - 'application/json'
 *       parameters:
 *         - in: 'body'
 *           name: 'classData'
 *           description: 'Class data to be created'
 *           required: true
 *           schema:
 *             $ref: '#/definitions/Class'
 *       responses:
 *         '201':
 *           description: 'Class created successfully'
 *           schema:
 *             $ref: '#/definitions/Class'
 *         '400':
 *           description: 'Bad request - Check required fields'
 *         '500':
 *           description: 'Internal server error'
 *
 *   /class/{id}/update:
 *     put:
 *       tags:
 *         - 'class'
 *       summary: 'Update a class by ID'
 *       consumes:
 *         - 'application/json'
 *       produces:
 *         - 'application/json'
 *       parameters:
 *         - in: 'path'
 *           name: 'id'
 *           type: 'string'
 *           required: true
 *           description: 'ID of the class to be updated'
 *         - in: 'body'
 *           name: 'classData'
 *           description: 'Updated class data'
 *           required: true
 *           schema:
 *             $ref: '#/definitions/Class'
 *       responses:
 *         '200':
 *           description: 'Class updated successfully'
 *           schema:
 *             $ref: '#/definitions/Class'
 *         '400':
 *           description: 'Bad request - Check required fields'
 *         '500':
 *           description: 'Internal server error'
 *
 *   /class/{id}/delete:
 *     delete:
 *       tags:
 *         - 'class'
 *       summary: 'Delete a class by ID'
 *       produces:
 *         - 'application/json'
 *       parameters:
 *         - in: 'path'
 *           name: 'id'
 *           type: 'string'
 *           required: true
 *           description: 'ID of the class to be deleted'
 *       responses:
 *         '200':
 *           description: 'Class deleted successfully'
 *           schema:
 *             $ref: '#/definitions/ClassDeleteResponse'
 *         '400':
 *           description: 'Bad request - Check required fields'
 *         '500':
 *           description: 'Internal server error'
 *
 *   /class/{id}:
 *     get:
 *       tags:
 *         - 'class'
 *       summary: 'Get class by ID'
 *       produces:
 *         - 'application/json'
 *       parameters:
 *         - in: 'path'
 *           name: 'id'
 *           type: 'string'
 *           required: true
 *           description: 'ID of the class to be retrieved'
 *       responses:
 *         '200':
 *           description: 'Class retrieved successfully'
 *           schema:
 *             $ref: '#/definitions/Class'
 *         '500':
 *           description: 'Internal server error'
 *
 *   /class:
 *     get:
 *       tags:
 *         - 'class'
 *       summary: 'Get all classes'
 *       produces:
 *         - 'application/json'
 *       responses:
 *         '200':
 *           description: 'List of classes'
 *           schema:
 *             type: 'array'
 *             items:
 *               $ref: '#/definitions/Class'
 *         '500':
 *           description: 'Internal server error'
 *
 *   /class/{id}/students:
 *     get:
 *       tags:
 *         - 'class'
 *       summary: 'Get students by class ID'
 *       produces:
 *         - 'application/json'
 *       parameters:
 *         - in: 'path'
 *           name: 'id'
 *           type: 'string'
 *           required: true
 *           description: 'ID of the class to get students'
 *       responses:
 *         '200':
 *           description: 'List of students in the class'
 *           schema:
 *             type: 'array'
 *             items:
 *               type: 'string'
 *         '500':
 *           description: 'Internal server error'
 *
 * definitions:
 *   Class:
 *     type: 'object'
 *     properties:
 *       _id:
 *         type: 'string'
 *       startDate:
 *         type: 'string'
 *         format: 'date'
 *       endDate:
 *         type: 'string'
 *         format: 'date'
 *       totalHours:
 *         type: 'number'
 *       instructor:
 *         type: 'string'
 *       students:
 *         type: 'array'
 *         items:
 *           type: 'string'
 *       courseName:
 *         type: 'string'
 *
 *   ClassDeleteResponse:
 *     type: 'object'
 *     properties:
 *       message:
 *         type: 'string'
 *
 */

router.post("/create", classController.createClass);
router.put("/:id/update", classController.updateClass);
router.delete("/:id/delete", classController.deleteClass);
router.get("/:id", classController.getClassById);
router.get("/", classController.getClasses);
router.get("/:id/students", classController.getStudentsByClassId);

module.exports = router;
