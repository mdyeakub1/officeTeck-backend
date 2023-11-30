import { NextFunction, Request, Response } from "express";
import pick from "../../../shared/pick";
import { ProjectService } from "./project.services";

const createProject =async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body)
        const result = await ProjectService.createProject(req.body)
        res.status(200).json({
            status: 'success',
            message: 'Project created successfully',
            data: result
        });
    } catch (error) {
        next(error)
    }
}

const getAllProject = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const filters = pick(req.query, ['searchTerm'])
        const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
        
        const result = await ProjectService.getAllProject(filters,options)
        res.status(200).json({
            status: 'success',
            message: 'Project retrived successfully',
            meta: result.meta,
            data: result.data
        });
    } catch (error) {
        next(error)
    }
}

const getSingleProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params
        const result = await ProjectService.getSingleProject(id)
        res.status(200).json({
            status: 'success',
            message: 'project retrive successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const updateProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params
        const {...updatedData} = req.body
        const result = await ProjectService.updateProject(id, updatedData)
        res.status(200).json({
            status: 'success',
            message: 'Project update successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params
        const result = await ProjectService.deleteProject(id)
        res.status(200).json({
            status: 'success',
            message: 'project deleted successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const ProjectController = {
    createProject,
    getAllProject,
    getSingleProject,
    updateProject,
    deleteProject
}