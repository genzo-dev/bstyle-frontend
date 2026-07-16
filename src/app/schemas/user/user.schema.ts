import { z } from 'zod';
import { isValidPhone } from '../../utils/masks/phone-mask';

export const userSchema = z.object({
  login: z.string().nonempty('Informe um login'),
  nome: z
    .string()
    .min(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
    .nonempty('Insira seu nome'),
  senha: z.string().nonempty('Insira uma senha'),
  telefone: z
    .string()
    .refine((val) => !val || isValidPhone(val), {
      message: 'Telefone inválido. Use o formato (XX) XXXXX-XXXX',
    })
    .optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  rua: z.string().optional(),
  numero: z.string().optional(),
});

export const userCreateBase = z.object({
  login: z.string().nonempty('Informe um login'),
  nome: z
    .string()
    .min(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
    .nonempty('Insira seu nome'),
  senha: z.string().nonempty('Insira uma senha'),
  senha2: z.string().nonempty('Confirme a senha'),
  telefone: z
    .string()
    .refine((val) => !val || isValidPhone(val), {
      message: 'Telefone inválido. Use o formato (XX) XXXXX-XXXX',
    })
    .optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  rua: z.string().optional(),
  numero: z.string().optional(),
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
  .transform(({ login, nome, senha, telefone, cidade, estado, rua, numero }) => {
    return { login, nome, senha, telefone, cidade, estado, rua, numero };
  });

export const userUpdateSchema = z.object({
  nome: z
    .string()
    .min(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
    .or(z.literal(''))
    .optional(),
  telefone: z
    .string()
    .refine((val) => !val || isValidPhone(val), {
      message: 'Telefone inválido. Use o formato (XX) XXXXX-XXXX',
    })
    .optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  rua: z.string().optional(),
  numero: z.string().optional(),
});

export type UserSchema = z.infer<typeof userSchema>;
export type UserCreateSchema = z.infer<typeof userCreateSchema>;
export type UserUpdateSchema = z.infer<typeof userUpdateSchema>;
