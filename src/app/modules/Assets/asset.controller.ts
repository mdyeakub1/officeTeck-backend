import { NextFunction, Request, Response } from "express";
import pick from "../../../shared/pick";
import { AssetService } from "./asset.services";

const createAsset =async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await AssetService.createAsset(req.body)
        res.status(200).json({
            status: 'success',
            message: 'Asset created successfully',
            data: result
        });
    } catch (error) {
        next(error)
    }
}

const getAllAsset = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const filters = pick(req.query, ['searchTerm'])
        const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
        
        const result = await AssetService.getAllAsset(filters,options)
        res.status(200).json({
            status: 'success',
            message: 'assets retrived successfully',
            meta: result.meta,
            data: result.data
        });
    } catch (error) {
        next(error)
    }
}

const getSingleAsset = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params
        const result = await AssetService.getSingleAsset(id)
        res.status(200).json({
            status: 'success',
            message: 'asset retrive successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const updateAsset = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params
        const {...updatedData} = req.body
        const result = await AssetService.updateAsset(id, updatedData)
        res.status(200).json({
            status: 'success',
            message: 'asset update successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const deleteAsset = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params
        const result = await AssetService.deleteAsset(id)
        res.status(200).json({
            status: 'success',
            message: 'asset deleted successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const AssetController = {
    createAsset,
    getAllAsset,
    getSingleAsset,
    updateAsset,
    deleteAsset
}