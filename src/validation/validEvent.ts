import zod from 'zod';

export const validacaoEvent = zod.object({
    nome: zod.string().min(4, 'O nome deve conter no mínimo 4 caracteres.'),
})