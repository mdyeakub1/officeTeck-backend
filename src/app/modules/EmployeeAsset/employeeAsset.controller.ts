import { NextFunction, Request, Response } from "express";
import pick from "../../../shared/pick";
import { EmployeeAssetService } from "./employeeAsset.services";

const createEmployeeAsset =async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await EmployeeAssetService.createEmployeeAsset(req.body)
        res.status(200).json({
            status: 'success',
            message: 'Asset assigned successfully',
            data: result
        });
    } catch (error) {
        next(error)
    }
}

const getAllEmployeeAsset = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const filters = pick(req.query, ['searchTerm'])
        const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
        
        const result = await EmployeeAssetService.getAllEmployeeAsset(filters,options)
        res.status(200).json({
            status: 'success',
            message: 'Asset retrived successfully',
            meta: result.meta,
            data: result.data
        });
    } catch (error) {
        next(error)
    }
}

const getSingleEmployeeAsset = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params
        const result = await EmployeeAssetService.getSingleEmployeeAsset(id)
        res.status(200).json({
            status: 'success',
            message: 'Asset retrive successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const updateEmployeeAsset = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params
        const {...updatedData} = req.body
        const result = await EmployeeAssetService.updateEmployeeAsset(id, updatedData)
        res.status(200).json({
            status: 'success',
            message: 'Asset update successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const deleteEmployeeAsset = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params
        const result = await EmployeeAssetService.deleteEmployeeAsset(id)
        res.status(200).json({
            status: 'success',
            message: 'Asset deleted successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const EmployeeAssetController = {
    createEmployeeAsset,
    getAllEmployeeAsset,
    getSingleEmployeeAsset,
    updateEmployeeAsset,
    deleteEmployeeAsset
}