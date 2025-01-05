import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient();

export async function POST(req : NextRequest) {
    try {
        const {title, description } = await req.json();
        const todoData = await prisma.todo.create({
            data: {
                title,description
            }
        })

        return NextResponse.json({
            status : 201,
            message : 'Todo Created Successfully',
            data : todoData,
        })
    } catch (error) {
       return NextResponse.json({
        status : 500,
        message : 'Server error',
       }) 
    }
}

export async function GET() {
    const ITEM_PER_PAGE = 2;
  try {
    const todos = await prisma.todo.findMany({
        orderBy: {createdAt : 'desc'},
        take: ITEM_PER_PAGE,
    });

    return NextResponse.json({
        status : 200,
        todos : todos,
    })
  } catch (error) {
    return NextResponse.json({
        status : 500,
        message : 'Server error',
       }) 
  }  
}