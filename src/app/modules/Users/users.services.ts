import { PrismaClient, OfficeUser } from "@prisma/client";


const prisma = new PrismaClient()

const createUser = async (userData: OfficeUser): Promise<OfficeUser> => {

    const result = await prisma.officeUser.create({
        data: userData
    });
    return result;
};

const getAllUser = async (): Promise<OfficeUser[] | any> => {
    const result = await prisma.officeUser.findMany()
    const total = await prisma.officeUser.count()
    return {
        meta: {
            total
        },
        data: {
            result
        }
    }
}

const getSingleUser = async (id: string): Promise<OfficeUser | null> => {
    const result = await prisma.officeUser.findUnique({
        where: {
            id: id
        }
    })
    return result
}

const updateUser = async (id: string, updatedData: OfficeUser): Promise<OfficeUser | null> => {
    const result = await prisma.officeUser.update({
        where: {
            id: id
        },
        data: updatedData
    })
    return result
}
const deleteUser = async (id: string): Promise<OfficeUser | null> => {
    const result = await prisma.officeUser.delete({
        where: {
            id: id
        }
    })
    return result
}

export const UserServices = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser
}