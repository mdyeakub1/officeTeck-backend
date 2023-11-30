import { Employee, PrismaClient } from "@prisma/client";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";

const prisma = new PrismaClient()

const createEmployee = async (employeeData: Employee): Promise<Employee> => {
    const result = await prisma.employee.create({
        data: employeeData
    })

    return result
}

const getAllEmployee = async (filters:any, options:any): Promise<IGenericResponse<Employee[]>> => {

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
                },
                {
                    email: {
                        contains: searchTerm,
                        mode: 'insensitive'
                    }
                }
            ]
        }
    }
    

    const result = await prisma.employee.findMany({
        where: whereClause,
        include: {
            projectsAssigned: {
                include: {
                    project: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                }
            },
        },
        skip,
        take: limit,
        orderBy: {
            createdAt: 'desc'
        }
    })
    const total = await prisma.employee.count()
   
    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    }
}

const getSingleEmployee = async (id: string): Promise<Partial<Employee> | null> => {
    const result = await prisma.employee.findUnique({
        where: {
            id: id
        },
        include: {
            projectsAssigned: {
                include: {
                    project: {
                        select: {
                            name: true,
                        }
                   }
               }
            },
            assetAssigned: true
        }
    })
    return result
}

const updateEmployee = async (id: string, updatedData: Employee): Promise<Employee | null> => {
    console.log(updatedData)
    const result = await prisma.employee.update({
        where: {
            id: id
        },
        data: updatedData
    })
    return result
}

const deleteEmployee = async (id: string): Promise<Employee | null> => {
    const result = await prisma.employee.delete({
        where: {
            id: id
        }
    })
    return result
}



export const EmployeeService = {
    createEmployee,
    getAllEmployee,
    getSingleEmployee,
    updateEmployee,
    deleteEmployee
}