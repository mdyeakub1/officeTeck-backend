import { PrismaClient, EmployeeAsset } from "@prisma/client";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";

const prisma = new PrismaClient()

const createEmployeeAsset = async (Data: EmployeeAsset): Promise<EmployeeAsset> => {
    const result = await prisma.employeeAsset.create({
        data: Data
    })

    return result
}

const getAllEmployeeAsset = async (filters:any, options:any): Promise<IGenericResponse<EmployeeAsset[]>> => {

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
    

    const result = await prisma.employeeAsset.findMany({
        where: whereClause,
        skip,
        take: limit,
        // orderBy: {
        //     createdAt: 'desc'
        // }
    })
    const total = await prisma.employeeAsset.count()
   
    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    }
}

const getSingleEmployeeAsset = async (id: string): Promise<EmployeeAsset | null> => {
    const result = await prisma.employeeAsset.findUnique({
        where: {
            id: id
        }
    })
    return result
}

const updateEmployeeAsset = async (id: string, updatedData: EmployeeAsset): Promise<EmployeeAsset | null> => {
    console.log(updatedData)
    const result = await prisma.employeeAsset.update({
        where: {
            id: id
        },
        data: updatedData
    })
    return result
}

const deleteEmployeeAsset = async (id: string): Promise<EmployeeAsset | null> => {
    const result = await prisma.employeeAsset.delete({
        where: {
            id: id
        }
    })
    return result
}



export const EmployeeAssetService = {
    createEmployeeAsset,
    getAllEmployeeAsset,
    getSingleEmployeeAsset,
    updateEmployeeAsset,
    deleteEmployeeAsset
}