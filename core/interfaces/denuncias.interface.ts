export interface PayloadCreateDenuncia {
  ubicacion: string;
  detalle: string;
  fecha_completa: string;
  user_id: number;
  tipo_denuncia: number;
  requerimiento_id: number;
  evidencias?: {
    filename: string;
    base64Data: string;
    contentType: string;
  }[];
}

export interface GetListDenuncias {
  id: number;
  folio: number | null;
  users_id: number;
  tipos_denuncias_id: number;
  requerimientos_id: number;
  detalle: string;
  ubicacion: string;
  fecha: Date;
}
