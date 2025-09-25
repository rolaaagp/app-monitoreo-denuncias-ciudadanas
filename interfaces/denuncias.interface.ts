export interface PayloadCreateDenuncia {
  ubicacion: string;
  detalle: string;
  fecha_completa: string;
  user_id: number;
  tipo_denuncia: number;
  requerimiento_id: number;
  evidencias: {
    filename: string;
    base64Data: string;
    contentType: string;
  }[];
}
