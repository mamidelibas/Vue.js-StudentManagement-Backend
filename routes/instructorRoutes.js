const express = require("express");
const router = express.Router();
const instructorController = require("../controllers/instructorController");

/**
 * @swagger
 * tags:
 *   - name: 'instructor'
 *     description: 'Operations related to instructors'
 *
 * paths:
 *   /instructor/create:
 *     post:
 *       tags:
 *         - 'instructor'
 *       summary: 'Create a new instructor'
 *       consumes:
 *         - 'application/json'
 *       produces:
 *         - 'application/json'
 *       parameters:
 *         - in: 'body'
 *           name: 'instructorData'
 *           description: 'Instructor data to be created'
 *           required: true
 *           schema:
 *             $ref: '#/definitions/Instructor'
 *       responses:
 *         '201':
 *           description: 'Instructor created successfully'
 *           schema:
 *             $ref: '#/definitions/Instructor'
 *         '400':
 *           description: 'Bad request - Check required fields'
 *         '500':
 *           description: 'Internal server error'
 *
 *   /instructor:
 *     get:
 *       tags:
 *         - 'instructor'
 *       summary: 'Get all instructors'
 *       produces:
 *         - 'application/json'
 *       responses:
 *         '200':
 *           description: 'List of instructors'
 *           schema:
 *             type: 'array'
 *             items:
 *               $ref: '#/definitions/Instructor'
 *         '500':
 *           description: 'Internal server error'
 *
 *   /instructor/{id}/update:
 *     put:
 *       tags:
 *         - 'instructor'
 *       summary: 'Update an instructor by ID'
 *       consumes:
 *         - 'application/json'
 *       produces:
 *         - 'application/json'
 *       parameters:
 *         - in: 'path'
 *           name: 'id'
 *           type: 'string'
 *           required: true
 *           description: 'ID of the instructor to be updated'
 *         - in: 'body'
 *           name: 'instructorData'
 *           description: 'Updated instructor data'
 *           required: true
 *           schema:
 *             $ref: '#/definitions/Instructor'
 *       responses:
 *         '200':
 *           description: 'Instructor updated successfully'
 *           schema:
 *             $ref: '#/definitions/Instructor'
 *         '400':
 *           description: 'Bad request - Check required fields'
 *         '500':
 *           description: 'Internal server error'
 *
 *   /instructor/{id}/delete:
 *     delete:
 *       tags:
 *         - 'instructor'
 *       summary: 'Delete an instructor by ID'
 *       produces:
 *         - 'application/json'
 *       parameters:
 *         - in: 'path'
 *           name: 'id'
 *           type: 'string'
 *           required: true
 *           description: 'ID of the instructor to be deleted'
 *       responses:
 *         '204':
 *           description: 'Instructor deleted successfully'
 *         '500':
 *           description: 'Internal server error'
 *
 * definitions:
 *   Instructor:
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
 *       course:
 *         type: 'string'
 *
 */

router.post("/create", instructorController.createInstructor);
router.get("/", instructorController.getInstructors);
router.put("/:id/update", instructorController.updateInstructor);
router.delete("/:id/delete", instructorController.deleteInstructor);

module.exports = router;
