import express from 'express'
import { EmployeeAssetController } from './employeeAsset.controller'

const router = express.Router()

router.post('/create-employee-Asset', EmployeeAssetController.createEmployeeAsset)
router.get('/', EmployeeAssetController.getAllEmployeeAsset)
router.get('/:id', EmployeeAssetController.getSingleEmployeeAsset)
router.patch('/:id', EmployeeAssetController.updateEmployeeAsset)
router.delete('/:id', EmployeeAssetController.deleteEmployeeAsset)


export const EmployeeAssetRoute = router