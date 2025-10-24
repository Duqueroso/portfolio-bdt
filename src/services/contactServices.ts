import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const CONTACT_ENDPOINT = `${API_BASE_URL}/api/contact`;

export interface ContactData {
  fullName: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  message: string;
  data?: {
    _id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
  };
}

export const postContact = async (data: ContactData): Promise<ContactResponse> => {
  try {
    const response = await axios.post<ContactResponse>(CONTACT_ENDPOINT, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 segundos de timeout
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Error de la API
      if (error.response) {
        throw new Error(error.response.data?.error || 'Error del servidor');
      }
      // Error de red
      if (error.request) {
        throw new Error('Error de conexión. Verifica tu conexión a internet.');
      }
    }
    // Error desconocido
    throw new Error('Error inesperado. Por favor, inténtalo de nuevo.');
  }
};

