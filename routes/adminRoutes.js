/**
 * @swagger
 * tags:
 *   - name: 'admin'
 *     description: 'Operations related to admin users'
 *
 * paths:
 *   /admin/create:
 *     post:
 *       tags:
 *         - 'admin'
 *       summary: 'Create a new admin'
 *       consumes:
 *         - 'application/json'
 *       produces:
 *         - 'application/json'
 *       parameters:
 *         - in: 'body'
 *           name: 'admin'
 *           description: 'Admin object to be created'
 *           required: true
 *           schema:
 *             type: 'object'
 *             properties:
 *               name:
 *                 type: 'string'
 *               lastName:
 *                 type: 'string'
 *               mail:
 *                 type: 'string'
 *               phoneNumber:
 *                 type: 'string'
 *               password:
 *                 type: 'string'
 *               role:
 *                 type: 'string'
 *       responses:
 *         '201':
 *           description: 'Admin created successfully'
 *           schema:
 *             $ref: '#/definitions/Admin'
 *         '400':
 *           description: 'Bad request - Check required fields'
 *         '500':
 *           description: 'Internal server error'
 *
 *   /admin/{id}/delete:
 *     delete:
 *       tags:
 *         - 'admin'
 *       summary: 'Delete an admin by ID'
 *       produces:
 *         - 'application/json'
 *       parameters:
 *         - in: 'path'
 *           name: 'id'
 *           type: 'string'
 *           required: true
 *           description: 'ID of the admin to be deleted'
 *       responses:
 *         '200':
 *           description: 'Admin deleted successfully'
 *           schema:
 *             $ref: '#/definitions/Admin'
 *         '500':
 *           description: 'Internal server error'
 *
 *   /admin:
 *     get:
 *       tags:
 *         - 'admin'
 *       summary: 'Get all admins'
 *       produces:
 *         - 'application/json'
 *       responses:
 *         '200':
 *           description: 'List of admins'
 *           schema:
 *             type: 'object'
 *             properties:
 *               admins:
 *                 type: 'array'
 *                 items:
 *                   $ref: '#/definitions/Admin'
 *         '500':
 *           description: 'Internal server error'
 *
 *   /admin/login:
 *     post:
 *       tags:
 *         - 'admin'
 *       summary: 'Login as an admin'
 *       consumes:
 *         - 'application/json'
 *       produces:
 *         - 'application/json'
 *       parameters:
 *         - in: 'body'
 *           name: 'credentials'
 *           description: 'Admin login credentials'
 *           required: true
 *           schema:
 *             type: 'object'
 *             properties:
 *               mail:
 *                 type: 'string'
 *               password:
 *                 type: 'string'
 *       responses:
 *         '200':
 *           description: 'Admin login successful'
 *           schema:
 *             $ref: '#/definitions/AdminLoginResponse'
 *         '400':
 *           description: 'Bad request - Check required fields'
 *         '500':
 *           description: 'Internal server error'
 *
 * definitions:
 *   Admin:
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
 *       role:
 *         type: 'string'
 *
 *   AdminLoginResponse:
 *     type: 'object'
 *     properties:
 *       status:
 *         type: 'string'
 *       data:
 *         $ref: '#/definitions/Admin'
 *
 */

const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/create", adminController.createAdmin);

router.delete("/:id/delete", adminController.deleteAdmin);

router.get("/", adminController.getAdmins);

router.post("/login", adminController.loginAdmin);

module.exports = router;
