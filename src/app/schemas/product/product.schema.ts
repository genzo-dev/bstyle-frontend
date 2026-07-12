import { z } from 'zod';

export const productCreateSchema = z.object({
  nome: z
    .string()
    .min(1, 'O nome do produto é obrigatório')
    .min(3, 'O nome deve ter pelo menos 3 caracteres'),
  descricao: z
    .string()
    .min(1, 'A descrição do produto é obrigatória'),
  preco: z
    .number({ message: 'O preço deve ser um número' })
    .min(0, 'O preço não pode ser negativo'),
  quantidade: z
    .number({ message: 'A quantidade deve ser um número' })
    .int({ message: 'A quantidade deve ser um número inteiro' })
    .min(1, 'A quantidade deve ser pelo menos 1'),
  tipoId: z
    .number({ message: 'Selecione um tipo de produto' })
    .min(1, 'Selecione um tipo de produto'),
  coresIds: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^(\d+,)*\d+$/.test(val),
      'Formato inválido. Use números separados por vírgula (ex: 1,2,3)',
    ),
  tagsIds: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^(\d+,)*\d+$/.test(val),
      'Formato inválido. Use números separados por vírgula (ex: 1,2,3)',
    ),
});

export type ProductCreateSchema = z.infer<typeof productCreateSchema>;
