import { NextFunction, Request, Response } from "express";
import { EmployeeService } from "./employee.services";
import pick from "../../../shared/pick";

const createEmployee =async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await EmployeeService.createEmployee(req.body)
        res.status(200).json({
            status: 'success',
            message: 'Employee created successfully',
            data: result
        });
    } catch (error) {
        next(error)
    }
}

const getAllEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const filters = pick(req.query, ['searchTerm'])
        const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
        
        const result = await EmployeeService.getAllEmployee(filters,options)
        res.status(200).json({
            status: 'success',
            message: 'Employee retrived successfully',
            meta: result.meta,
            data: result.data
        });
    } catch (error) {
        next(error)
    }
}

const getSingleEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params
        const result = await EmployeeService.getSingleEmployee(id)
        res.status(200).json({
            status: 'success',
            message: 'Employee retrive successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        
        const {...updatedData} = req.body
        const result = await EmployeeService.updateEmployee(id, updatedData)
        res.status(200).json({
            status: 'success',
            message: 'Employee update successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        console.log("from delete req", id)
        const result = await EmployeeService.deleteEmployee(id)
        res.status(200).json({
            status: 'success',
            message: 'Employee deleted successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const EmployeeController = {
    createEmployee,
    getAllEmployee,
    getSingleEmployee,
    updateEmployee,
    deleteEmployee
}