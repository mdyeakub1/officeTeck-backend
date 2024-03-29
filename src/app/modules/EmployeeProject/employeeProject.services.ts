import { PrismaClient, EmployeeProject } from "@prisma/client";

const prisma = new PrismaClient()

const createEmployeeProject = async (data: EmployeeProject): Promise<EmployeeProject> => {
    // Start a transaction
    return prisma.$transaction(async (prisma) => {
        const existingAssignment = await prisma.employeeProject.findFirst({
            where: {
                projectId: data.projectId,
                employeeId: data.employeeId,
            },
        });

        if (existingAssignment) {
            throw new Error("Project already assigned to the employee");
        }

        // Assuming you want to update the projectStatus to "Assigned" when creating an EmployeeProject
        await prisma.employee.update({
            where: { id: data.employeeId },
            data: { projectStatus: "Assigned" },
        });

        const result = await prisma.employeeProject.create({
            data: data,
        });

        return result;
    });
};


const getAllEmployeeProject = async (searchTerm:any): Promise<EmployeeProject[]> => {


    let whereClause = {}

    if (searchTerm) {
        whereClause = {
            OR: [
                {
                    projectId: {
                        contains: searchTerm,
                        mode: 'insensitive'
                    }
                }
            ],
            
        }
    }
    

    const result = await prisma.employeeProject.findMany({
        where: whereClause,
        // orderBy: {
        //     createdAt: 'desc'
        // }
    })
   
    return result

}

const getSingleEmployeeProject = async (id: string): Promise<EmployeeProject | null> => {
    const result = await prisma.employeeProject.findUnique({
        where: {
            id: id
        }
    })
    return result
}

const updateEmployeeProject = async (id: string, updatedData: EmployeeProject): Promise<EmployeeProject | null> => {
    console.log(updatedData)
    const result = await prisma.employeeProject.update({
        where: {
            id: id
        },
        data: updatedData
    })
    return result
}

const deleteEmployeeProject = async (id: string): Promise<EmployeeProject | null> => {
    const result = await prisma.employeeProject.delete({
        where: {
            id: id
        }
    })
    return result
}



export const EmployeeProjectService = {
    createEmployeeProject,
    getAllEmployeeProject,
    getSingleEmployeeProject,
    updateEmployeeProject,
    deleteEmployeeProject
}