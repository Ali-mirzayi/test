import { NextResponse } from 'next/server';
import data from "../../data/blog.json";
 
export async function GET() { 
  return NextResponse.json(data)
}