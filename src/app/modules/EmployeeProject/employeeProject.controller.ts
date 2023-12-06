import { NextFunction, Request, Response } from "express";
import { EmployeeProjectService } from "./employeeProject.services";

const createEmployeeProject =async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await EmployeeProjectService.createEmployeeProject(req.body)
        res.status(200).json({
            status: 'success',
            message: 'Project assigned successfully',
            data: result
        });
    } catch (error) {
        next(error)
    }
}

const getAllEmployeeProject = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const searchTerm = req.query

        console.log({searchTerm})

        
        const result = await EmployeeProjectService.getAllEmployeeProject(searchTerm)
        res.status(200).json({
            status: 'success',
            message: 'Project retrived successfully',
            data: result
        });
    } catch (error) {
        next(error)
    }
}

const getSingleEmployeeProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params
        const result = await EmployeeProjectService.getSingleEmployeeProject(id)
        res.status(200).json({
            status: 'success',
            message: 'project retrive successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const updateEmployeeProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params
        const {...updatedData} = req.body
        const result = await EmployeeProjectService.updateEmployeeProject(id, updatedData)
        res.status(200).json({
            status: 'success',
            message: 'Project update successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const deleteEmployeeProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params
        const result = await EmployeeProjectService.deleteEmployeeProject(id)
        res.status(200).json({
            status: 'success',
            message: 'project deleted successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const EmployeeProjectController = {
    createEmployeeProject,
    getAllEmployeeProject,
    getSingleEmployeeProject,
    updateEmployeeProject,
    deleteEmployeeProject
}