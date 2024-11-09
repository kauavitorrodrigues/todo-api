import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";

export const getTasks = async () => {
    try {
        return await prisma.task.findMany({
            select: {
                id: true,
                title: true,
                done: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    } catch (err) {
        return false
    }
}

export const createTask = async (data: Prisma.TaskCreateInput) => {
    try {
        return await prisma.task.create({ data })
    } catch (err) {
        return false
    }
}

export const updateTask = async (taskId: number, data: Prisma.TaskUpdateInput) => {
    try {
        return await prisma.task.update({ 
            where: { id: taskId }, 
            data 
        })
    } catch (err) {
        return false
    }
}

export const deleteTask = async (taskId: number) => {
    try {
        return await prisma.task.delete({ 
            where: { id: taskId }
        })
    } catch (err) {
        return false
    }
}