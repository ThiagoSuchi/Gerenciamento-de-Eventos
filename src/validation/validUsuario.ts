import zod from 'zod';

export const validacao = zod.object({
    nome: zod.string().min(4, 'O nome deve conter no mínimo 4 caracteres.'),
    email: zod.string().email('Email inválido.'),
    senha: zod.string()
        .min(8, 'A senha deve conter no mínimo 8 caracteres')
        .regex(/[!@#$%^&*(),.?":{}|<>]/, 'A senha deve conter pelo menos um caractere especial')
        .regex(/\d/, 'A senha deve conter pelo menos um número')
})