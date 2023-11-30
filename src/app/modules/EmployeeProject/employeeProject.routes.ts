import express from 'express'
import { EmployeeProjectController } from './employeeProject.controller'

const router = express.Router()

router.post('/create-employee-project', EmployeeProjectController.createEmployeeProject)
router.get('/', EmployeeProjectController.getAllEmployeeProject)
router.get('/:id', EmployeeProjectController.getSingleEmployeeProject)
router.patch('/:id', EmployeeProjectController.updateEmployeeProject)
router.delete('/:id', EmployeeProjectController.deleteEmployeeProject)


export const EmployeeProjectRoute = router