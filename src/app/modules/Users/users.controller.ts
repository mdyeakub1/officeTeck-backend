import { NextFunction, Request, Response } from "express";
import { UserServices } from "./users.services";
import bcrypt from 'bcrypt'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { password } = req.body
         const hashedPassword = await bcrypt.hash(password, 10);
         const userData = {
             ...req.body,
             password: hashedPassword
         };
        const result = await UserServices.createUser(userData)
        res.status(200).json({
            status: 'success',
            message: 'User created successfully',
            data: result
        });

    } catch (error) {
        next(error)
    }
}

const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await UserServices.getAllUser()
        res.status(200).json({
            status: 'success',
            message: 'User retrive successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}
const getSingleUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params
        const result = await UserServices.getSingleUser(id)
        res.status(200).json({
            status: 'success',
            message: 'User retrive successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params
        const {...updatedData} = req.body
        const result = await UserServices.updateUser(id, updatedData)
        res.status(200).json({
            status: 'success',
            message: 'User update successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params
        const result = await UserServices.deleteUser(id)
        res.status(200).json({
            status: 'success',
            message: 'User delete successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}


export const UserController = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser
}