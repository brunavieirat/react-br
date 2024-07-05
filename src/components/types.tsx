import { z } from 'zod';

export const schema = z.object({
    id: z.union([z.number(), z.string()]).optional(),
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email('Email inválido'),
  });
  
  export type FormData = z.infer<typeof schema>;
  
  export interface FormDialogProps {
    initialData?: FormData;
  }
  
  export interface FormDialogHandles {
    openDialog: () => void;
    closeDialog: () => void;
    submitDialog: () => void;
  }