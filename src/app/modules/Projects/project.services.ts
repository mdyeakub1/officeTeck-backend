import { Project, PrismaClient } from "@prisma/client";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";

const prisma = new PrismaClient()

const createProject = async (Data: Project): Promise<Project> => {
    const result = await prisma.project.create({
        data: Data
    })

    return result
}

const getAllProject = async (filters:any, options:any): Promise<IGenericResponse<Project[]>> => {

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
    

    const result = await prisma.project.findMany({
        where: whereClause,
        include: {
            memberAssinged: {
                include: {
                    employee: {
                        select: {
                            name: true,
                            image: true
                        }
                    }
                }
            }
        },
        skip,
        take: limit,
        // orderBy: {
        //     createdAt: 'desc'
        // }
    })
    const total = await prisma.project.count()
   
    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    }
}

const getSingleProject = async (id: string): Promise<Project | null> => {
    const result = await prisma.project.findUnique({
        where: {
            id: id
        }
    })
    return result
}

const updateProject = async (id: string, updatedData: Project): Promise<Project | null> => {
    console.log(updatedData)
    const result = await prisma.project.update({
        where: {
            id: id
        },
        data: updatedData
    })
    return result
}

const deleteProject = async (id: string): Promise<Project | null> => {
    const result = await prisma.project.delete({
        where: {
            id: id
        }
    })
    return result
}



export const ProjectService = {
    createProject,
    getAllProject,
    getSingleProject,
    updateProject,
    deleteProject
}