import { z } from 'zod';

export const userSchema = z.object({
  login: z.string(),
  senha: z.string().nonempty('Insira uma senha'),
  nome: z.string().min(3).nonempty('Insira seu nome'),
  telefone: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  rua: z.string().optional(),
  numero: z.string().optional(),
  fotoPerfilUrl: z.string().url('Insira uma URL válida').optional(),
});

export type UserSchema = z.infer<typeof userSchema>;
