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

export const userCreateBase = z.object({
  login: z.string(),
  nome: z
    .string()
    .min(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
    .nonempty('Insira seu nome'),
  senha: z.string().nonempty('Insira uma senha'),
  senha2: z.string().nonempty(),
  telefone: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  rua: z.string().optional(),
  numero: z.string().optional(),
  fotoPerfilUrl: z.string().url('Insira uma URL válida').optional(),
});

export const userCreateSchema = userCreateBase
  .refine(
    (data) => {
      return data.senha === data.senha2;
    },
    {
      path: ['senha2'],
      message: 'As senhas não coincidem',
    },
  )
  .transform(({ login, nome, senha, telefone, cidade, estado, rua, numero, fotoPerfilUrl }) => {
    return { login, nome, senha, telefone, cidade, estado, rua, numero, fotoPerfilUrl };
  });

export type UserCreateSchema = z.infer<typeof userCreateSchema>;
export type UserSchema = z.infer<typeof userSchema>;
