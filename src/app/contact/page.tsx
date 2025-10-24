'use client';

import { useState } from 'react';
import { postContact } from '@/services/contactServices';
import styles from './contact.module.css';

interface FormData {
  fullname: string;
  email: string;
  message: string;
}

interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    fullname: '',
    email: '',
    message: ''
  });
  
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    error: null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar errores cuando el usuario empiece a escribir
    if (formState.error) {
      setFormState(prev => ({ ...prev, error: null }));
    }
  };

  const resetForm = () => {
    setFormData({
      fullname: '',
      email: '',
      message: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setFormState({
      isSubmitting: true,
      isSuccess: false,
      error: null
    });

    try {
      // Transformar los datos para que coincidan con la API
      const contactData = {
        fullName: formData.fullname,
        email: formData.email,
        message: formData.message
      };
      
      await postContact(contactData);
      
      setFormState({
        isSubmitting: false,
        isSuccess: true,
        error: null
      });
      
      resetForm();
      
      // Limpiar mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setFormState(prev => ({ ...prev, isSuccess: false }));
      }, 5000);
      
    } catch (error) {
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        error: error instanceof Error ? error.message : 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.'
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <div className={styles.header}>
            <h1 className={styles.title}>Contacto</h1>
            <p className={styles.subtitle}>¿Tienes alguna pregunta o proyecto en mente? ¡Hablemos!</p>
          </div>

          {/* Mensaje de éxito */}
          {formState.isSuccess && (
            <div className={styles.successMessage}>
              <div className={styles.messageContent}>
                <div className={styles.messageIcon}>
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className={styles.messageText}>
                  ¡Mensaje enviado correctamente! Te contactaré pronto.
                </div>
              </div>
            </div>
          )}

          {/* Mensaje de error */}
          {formState.error && (
            <div className={styles.errorMessage}>
              <div className={styles.messageContent}>
                <div className={styles.messageIcon}>
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className={styles.messageText}>
                  {formState.error}
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.fieldGroup}>
              <label htmlFor="fullname" className={styles.label}>
                Nombre completo
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="Tu nombre completo"
                disabled={formState.isSubmitting}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="tu.email@ejemplo.com"
                disabled={formState.isSubmitting}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="message" className={styles.label}>
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
                className={styles.textarea}
                placeholder="Cuéntame sobre tu proyecto o pregunta..."
                disabled={formState.isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={formState.isSubmitting}
              className={styles.submitButton}
            >
              {formState.isSubmitting ? (
                <>
                  <svg className={styles.spinner} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className={styles.spinnerCircle} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className={styles.spinnerPath} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </>
              ) : (
                'Enviar mensaje'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;