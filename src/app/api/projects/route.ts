import Project from "@/database/models/projects";
import dbConnection from "@/helpers/dbconection";
import { NextRequest, NextResponse } from "next/server";

interface ProjectFilters {
  category?: { $regex: string; $options: string };
  $or?: Array<{
    title?: { $regex: string; $options: string };
    description?: { $regex: string; $options: string };
    technologies?: { $in: RegExp[] };
  }>;
}

export async function GET(request: NextRequest) {
  try {
    await dbConnection();

    // Obtener parámetros de query
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '9');
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    // Validar parámetros
    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json({
        ok: false,
        error: "Parámetros de paginación inválidos"
      }, { status: 400 });
    }

    // Construir filtros
    const filters: ProjectFilters = {};
    
    if (category && category !== 'all') {
      filters.category = { $regex: category, $options: 'i' };
    }
    
    if (search) {
      filters.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { technologies: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Calcular skip para paginación
    const skip = (page - 1) * limit;

    // Obtener proyectos con paginación
    const [projects, totalProjects] = await Promise.all([
      Project.find(filters)
        .sort({ id: -1 }) // Ordenar por ID descendente (más recientes primero)
        .skip(skip)
        .limit(limit)
        .lean(), // Usar lean() para mejor performance
      Project.countDocuments(filters)
    ]);

    // Calcular metadatos de paginación
    const totalPages = Math.ceil(totalProjects / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      ok: true,
      data: projects,
      pagination: {
        currentPage: page,
        totalPages,
        totalProjects,
        projectsPerPage: limit,
        hasNextPage,
        hasPrevPage,
        nextPage: hasNextPage ? page + 1 : null,
        prevPage: hasPrevPage ? page - 1 : null
      },
      filters: {
        category: category || null,
        search: search || null
      }
    }, { 
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    });

  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({
      ok: false,
      error: "Error al obtener proyectos",
      details: process.env.NODE_ENV === 'development' ? error : undefined
    }, { status: 500 });
  }
}
