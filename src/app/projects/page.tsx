'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './projects.module.css';

interface Project {
  _id: string;
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  demoUrl: string;
  repoUrl: string;
  category: string;
  date: string;
}

interface ProjectsResponse {
  ok: boolean;
  data: Project[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProjects: number;
    projectsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number | null;
    prevPage: number | null;
  };
  filters: {
    category: string | null;
    search: string | null;
  };
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<ProjectsResponse['pagination'] | null>(null);
  
  const projectsPerPage = 9;

  // Función para obtener proyectos de la API
  const fetchProjects = async (page: number = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/projects?page=${page}&limit=${projectsPerPage}`);
      
      if (!response.ok) {
        throw new Error('Error al cargar proyectos');
      }
      
      const data: ProjectsResponse = await response.json();
      
      if (data.ok) {
        setProjects(data.data);
        setPagination(data.pagination);
      } else {
        throw new Error('Error en la respuesta de la API');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  // Cargar proyectos al montar el componente
  useEffect(() => {
    fetchProjects(currentPage);
  }, [currentPage]);

  // Manejar cambio de página
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPrevious = () => {
    if (pagination?.hasPrevPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (pagination?.hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Función para convertir URL de Google Drive a formato de imagen directa
  const getGoogleDriveImageUrl = (url: string) => {
    if (url.includes('drive.google.com/file/d/')) {
      const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
      if (fileId) {
        return `https://lh3.googleusercontent.com/d/${fileId}`;
      }
    }
    return url;
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingText}>Cargando proyectos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorText}>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mis Proyectos</h1>
      
      {/* Grid de proyectos */}
      <div className={styles.projectsGrid}>
        {projects.map((project) => (
          <div key={project._id} className={styles.projectCard}>
            {/* Imagen del proyecto */}
            {project.image && (
              <div className={styles.imageContainer}>
                <Image
                  src={getGoogleDriveImageUrl(project.image)}
                  alt={project.title}
                  fill
                  className={styles.projectImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            
            {/* Contenido del proyecto */}
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDescription}>{project.description}</p>
              
              {/* Tecnologías */}
              <div className={styles.technologiesContainer}>
                {project.technologies.map((tech, index) => (
                  <span key={index} className={styles.technologyTag}>
                    {tech}
                  </span>
                ))}
              </div>
              
              {/* Enlaces */}
              <div className={styles.linksContainer}>
                {project.demoUrl && (
                  <a 
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.demoLink}
                  >
                    Ver Demo
                  </a>
                )}
                {project.repoUrl && (
                  <a 
                    href={project.repoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.repoLink}
                  >
                    Ver Código
                  </a>
                )}
              </div>
              
              {/* Metadata */}
              <div className={styles.metadata}>
                {project.category && <div>Categoría: {project.category}</div>}
                {project.date && <div>Fecha: {project.date}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      {pagination && pagination.totalPages > 1 && (
        <div className={styles.paginationContainer}>
          <button 
            onClick={goToPrevious} 
            disabled={!pagination.hasPrevPage}
            className={styles.paginationButton}
          >
            Anterior
          </button>
          
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`${styles.pageNumber} ${currentPage === page ? styles.active : ''}`}
            >
              {page}
            </button>
          ))}
          
          <button 
            onClick={goToNext} 
            disabled={!pagination.hasNextPage}
            className={styles.paginationButton}
          >
            Siguiente
          </button>
        </div>
      )}

      {/* Info de paginación */}
      {pagination && (
        <div className={styles.paginationInfo}>
          <p>
            Mostrando {((currentPage - 1) * projectsPerPage) + 1} - {Math.min(currentPage * projectsPerPage, pagination.totalProjects)} de {pagination.totalProjects} proyectos
          </p>
        </div>
      )}
    </div>
  );
};

export default Projects;