import z from 'zod';

export const registrationSchema = z.object({
  cedula: z
    .string()
    .min(6, { message: 'La cédula debe tener al menos 6 dígitos' })
    .regex(/^\d+$/, { message: 'La cédula solo debe contener números' }),
  firstName: z
    .string()
    .min(1, { message: 'El nombre es obligatorio' }),
  lastName: z
    .string()
    .min(1, { message: 'El apellido es obligatorio' }),
  gender: z
    .enum(['M', 'F'], { message: 'El género debe ser "M" o "F"' }),
  age: z
    .string()
    .regex(/^\d{1,2}$/, { message: 'La edad debe ser un número de 1 o 2 dígitos' })
    .transform(Number),
  email: z
    .string()
    .email({ message: 'El correo electrónico no es válido' }),
  password: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
  confirmPassword: z
    .string()
    .min(6, { message: 'La confirmación de la contraseña debe tener al menos 6 caracteres' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});
