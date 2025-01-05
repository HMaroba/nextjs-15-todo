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

export async function GET(req :NextRequest) {
    
    const ITEM_PER_PAGE = 2;
    const {searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const search = searchParams.get('search') || ""
  try {
    
    const todos = await prisma.todo.findMany({
        where : {
            title: {
                contains : search,
            }
        },
        orderBy: {createdAt : 'desc'},
        take: ITEM_PER_PAGE,
        skip: (page - 1) * ITEM_PER_PAGE,
    });
    const totalItems = await prisma.todo.count();

    const totalPages = Math.ceil(totalItems / ITEM_PER_PAGE);

    return NextResponse.json({
        status : 200,
        todos : todos,
        currentPage: page,
        totalPages,
    })
  } catch (error) {
    return NextResponse.json({
        status : 500,
        message : 'Server error',
       }) 
  }  
}