import Contact from "@/database/models/contacts";
import dbConnection from "@/helpers/dbconection";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await dbConnection();
    
    const body = await request.json();
    const { fullname, email, message } = body;
    
    const newContact = new Contact({ fullname, email, message });
    await newContact.save();
    
    return NextResponse.json({ 
      ok: true, 
      data: newContact 
    }, { status: 201 });
    
  } catch (error) {
    console.error("Error handling contact request:", error);
    return NextResponse.json({ 
      ok: false, 
      error: "Error al guardar contacto" 
    }, { status: 500 });
  }
}