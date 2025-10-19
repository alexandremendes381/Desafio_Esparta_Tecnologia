import { toast } from 'react-toastify';

export async function fetchGet(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido na requisição';
    toast.error(`Falha na requisição: ${errorMessage}`);
    throw error;
  }
}
