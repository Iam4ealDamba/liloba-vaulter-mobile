import { z } from "zod";

// Zod Users Schemas
export const ZodUserRegister = z.object({
  username: z.string().min(3, "Erreur: champs invalide.(3 chars. minimum)"),
  email: z.string().email("Erreur: L'adresse email est invalide."),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Erreur: doit contenir min. 8 chars, 1 chiffre, 1 symbole"
    ),
});

export const ZodUserLogin = z.object({
  email: z.string().email("Erreur: L'adresse email est invalide."),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Erreur: doit contenir min. 8 chars, 1 chiffre, 1 symbole"
    ),
});

export const ZodServiceCreate = z.object({
  service_name: z.string().min(3, "Erreur: champs invalide.(3 chars. minimum)"),
  service_email: z.string().email("Erreur: L'adresse email est invalide."),
  service_password: z.string().min(6, "Erreur: doit contenir min. 6 chars."),
});

export const ZodProfileModify = z.object({
  username: z.string().min(3, "Erreur: champs invalide.(3 chars. minimum)"),
  email: z.string().email("Erreur: L'adresse email est invalide."),
});

export const ZodProfilePasswordModify = z.object({
  old_password: z.string().min(6, "Erreur: doit contenir min. 6 chars."),
  new_password: z.string().min(6, "Erreur: doit contenir min. 6 chars."),
  confirm_password: z.string().min(6, "Erreur: doit contenir min. 6 chars."),
});
