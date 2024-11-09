import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";
import jwt from "jsonwebtoken";

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

export const createJwtToken = (userId: number) => {

    const payload = { id: userId, }
    
    return jwt.sign(
        payload, 
        process.env.JWT_SECRET as string, 
        { expiresIn: '365 days' }
    )

}

export const getUserById = async (userId: string) => {

    const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) }
    })

    if (user) return user;
    return null;

}

export const getUserByEmailAndPassword = async (email: string, password: string) => {

    const user = await prisma.user.findFirst({
        where: { email, password }
    })

    if (user) return user;
    return null;

}