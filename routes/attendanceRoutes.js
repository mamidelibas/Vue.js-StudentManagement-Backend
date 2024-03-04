/**
 * @swagger
 * tags:
 *   - name: 'attendance'
 *     description: 'Operations related to attendance'
 *
 * paths:
 *   /attendance/record:
 *     post:
 *       tags:
 *         - 'attendance'
 *       summary: 'Create or update attendance record'
 *       consumes:
 *         - 'application/json'
 *       produces:
 *         - 'application/json'
 *       parameters:
 *         - in: 'body'
 *           name: 'attendanceRecord'
 *           description: 'Attendance record to be created or updated'
 *           required: true
 *           schema:
 *             type: 'object'
 *             properties:
 *               attendanceDate:
 *                 type: 'string'
 *                 format: 'date'
 *               classId:
 *                 type: 'string'
 *               students:
 *                 type: 'array'
 *                 items:
 *                   type: 'string'
 *       responses:
 *         '201':
 *           description: 'Attendance record created successfully'
 *           schema:
 *             $ref: '#/definitions/Attendance'
 *         '200':
 *           description: 'Attendance record updated successfully'
 *           schema:
 *             $ref: '#/definitions/Attendance'
 *         '400':
 *           description: 'Bad request - Check required fields'
 *         '500':
 *           description: 'Internal server error'
 *
 *   /attendance/get:
 *     post:
 *       tags:
 *         - 'attendance'
 *       summary: 'Get attendance record'
 *       consumes:
 *         - 'application/json'
 *       produces:
 *         - 'application/json'
 *       parameters:
 *         - in: 'body'
 *           name: 'attendanceQuery'
 *           description: 'Query parameters to get attendance record'
 *           required: true
 *           schema:
 *             type: 'object'
 *             properties:
 *               attendanceDate:
 *                 type: 'string'
 *                 format: 'date'
 *               classId:
 *                 type: 'string'
 *       responses:
 *         '200':
 *           description: 'Attendance record retrieved successfully'
 *           schema:
 *             $ref: '#/definitions/Attendance'
 *         '500':
 *           description: 'Internal server error'
 *
 * definitions:
 *   Attendance:
 *     type: 'object'
 *     properties:
 *       _id:
 *         type: 'string'
 *       course:
 *         type: 'string'
 *       date:
 *         type: 'string'
 *         format: 'date'
 *       students:
 *         type: 'array'
 *         items:
 *           type: 'string'
 *
 */

const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");

router.post("/record", attendanceController.createOrUpdateAttendance);
router.post("/get", attendanceController.getAttendance);

module.exports = router;
