import { z } from 'zod';

export const userSchema = z.object({
  login: z.string(),
  nome: z
    .string()
    .min(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
    .nonempty('Insira seu nome'),
  senha: z.string().nonempty('Insira uma senha'),
  telefone: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  rua: z.string().optional(),
  numero: z.string().optional(),
  fotoPerfilUrl: z.string().url('Insira uma URL válida').optional(),
});

export type UserSchema = z.infer<typeof userSchema>;
