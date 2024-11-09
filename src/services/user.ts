import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";

export const getUsers = async () => {
    try {
        return await prisma.user.findMany({
            select: {
                id: true,
                name: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    } catch (err) {
        return false
    }
}

export const createUser = async (data: Prisma.UserCreateInput) => {
    try {
        return await prisma.user.create({ data })
    } catch (err) {
        return false
    }
}

export const updateUser = async (userId: number, data: Prisma.UserUpdateInput) => {
    try {
        return await prisma.user.update({ 
            where: { id: userId }, 
            data 
        })
    } catch (err) {
        return false
    }
}

export const deleteUser = async (userId: number) => {
    try {
        return await prisma.user.delete({ 
            where: { id: userId }
        })
    } catch (err) {
        return false
    }
}