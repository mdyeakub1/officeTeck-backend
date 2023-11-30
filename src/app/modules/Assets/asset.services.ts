import { PrismaClient, Asset } from "@prisma/client";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";

const prisma = new PrismaClient()

const createAsset = async (Data: Asset): Promise<Asset> => {
    const result = await prisma.asset.create({
        data: Data
    })

    return result
}

const getAllAsset = async (filters:any, options:any): Promise<IGenericResponse<Asset[]>> => {

    const { page, limit, skip } = paginationHelpers.calculatePagination(options)
    const { searchTerm } = filters
    
    let whereClause = {}

    if (searchTerm) {
        whereClause = {
            OR: [
                {
                    name: {
                        contains: searchTerm,
                        mode: 'insensitive'
                    }
                }
            ]
        }
    }
    

    const result = await prisma.asset.findMany({
        where: whereClause,
        include: {
            memberAssigned: {
                include: {
                    employee: {
                        select: {
                            name:true
                        }
                    }
                }
            }
        },
        skip,
        take: limit,
        orderBy: {
            createdAt: 'desc'
        }
    })
    const total = await prisma.asset.count()
   
    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    }
}

const getSingleAsset = async (id: string): Promise<Asset | null> => {
    const result = await prisma.asset.findUnique({
        where: {
            id: id
        }
    })
    return result
}

const updateAsset = async (id: string, updatedData: Asset): Promise<Asset | null> => {
    console.log(updatedData)
    const result = await prisma.asset.update({
        where: {
            id: id
        },
        data: updatedData
    })
    return result
}

const deleteAsset = async (id: string): Promise<Asset | null> => {
    const result = await prisma.asset.delete({
        where: {
            id: id
        }
    })
    return result
}



export const AssetService = {
    createAsset,
    getAllAsset,
    getSingleAsset,
    updateAsset,
    deleteAsset
}