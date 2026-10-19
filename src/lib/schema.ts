import { z } from 'zod';

/** Shared by the client form and the /api/contact handlers so validation never drifts. */
export const SERVICE_OPTIONS = [
  'AI Content Creation',
  'Paid Advertising Optimization',
  'SEO and Search Visibility',
  'Marketing Automation',
  'AI Strategy Consulting',
  'Analytics and Reporting',
] as const;

export const BUDGET_OPTIONS = [
  'Under $1,000 / month',
  '$1,000 – $3,000 / month',
  '$3,000 – $7,500 / month',
  '$7,500+ / month',
  'Not sure yet',
] as const;

const optionalUrl = z
  .string()
  .trim()
  .max(200)
  .refine((v) => v === '' || /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/\S*)?$/i.test(v), {
    message: 'Enter a valid website, e.g. example.com',
  });

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your full name').max(100),
  email: z.string().trim().email('Enter a valid work email').max(160),
  company: z.string().trim().min(1, 'Please enter your company').max(120),
  website: optionalUrl,
  budget: z.enum(BUDGET_OPTIONS, { errorMap: () => ({ message: 'Choose a budget range' }) }),
  services: z.array(z.enum(SERVICE_OPTIONS)).min(1, 'Pick at least one service'),
  message: z.string().trim().min(10, 'Tell us a little more (10+ characters)').max(2000),
  // Honeypot: real users never see or fill this field.
  botField: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
