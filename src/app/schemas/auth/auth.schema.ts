import z from 'zod';
import { userSchema } from '../user/user.schema';

export const loginSchema = z.object({
  login: z.string().nonempty('Login não pode estar vazio'),
  senha: z.string().nonempty('Insira sua senha'),
});

export type UserSchema = z.infer<typeof userSchema>;
