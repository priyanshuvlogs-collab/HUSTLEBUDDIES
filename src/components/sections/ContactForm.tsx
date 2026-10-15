import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useForm, type FieldError } from 'react-hook-form';
import { contact, site } from '../../content';
import { trackEvent } from '../../lib/analytics';
import { BUDGET_OPTIONS, contactSchema, type ContactInput } from '../../lib/schema';
import { Confetti } from '../ui/Confetti';
import { Field, inputClass as input, ServicesField } from '../ui/FormFields';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error' | 'preview'>(
    'idle',
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
    defaultValues: { services: [], website: '', botField: '' },
  });

  const a11y = (name: keyof ContactInput) => ({
    id: name,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  });
  const border = (name: keyof ContactInput) =>
    errors[name] ? 'border-[#f87171]' : 'border-white/15';

  const onSubmit = async (data: ContactInput) => {
    // Static preview builds have no backend: show a clear notice instead of an error.
    if (import.meta.env.VITE_PREVIEW_MODE === '1') {
      setStatus('preview');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('success');
      trackEvent('generate_lead', { form: 'contact' });
      reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="relative">
      <Confetti fire={status === 'success'} />
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          <motion.div
            key="ok"
            role="status"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid min-h-[420px] place-items-center rounded-card border border-line bg-bg-elevated p-10 text-center"
          >
            <div>
              <h3 className="text-text-primary">{contact.successTitle}</h3>
              <p className="mt-3 text-text-muted">{contact.successBody}</p>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            exit={{ opacity: 0 }}
            className="grid gap-6 rounded-card border border-line bg-bg-elevated p-6 sm:grid-cols-2 md:p-10"
          >
            <p className="text-sm text-text-muted sm:col-span-2">
              Fields marked <span className="text-cta">*</span> are required.
            </p>
            <Field name="fullName" label="Full name" required error={errors.fullName}>
              <input
                {...register('fullName')}
                {...a11y('fullName')}
                autoComplete="name"
                aria-required="true"
                className={`${input} ${border('fullName')}`}
              />
            </Field>
            <Field name="email" label="Work email" required error={errors.email}>
              <input
                {...register('email')}
                {...a11y('email')}
                type="email"
                autoComplete="email"
                aria-required="true"
                className={`${input} ${border('email')}`}
              />
            </Field>
            <Field name="company" label="Company" required error={errors.company}>
              <input
                {...register('company')}
                {...a11y('company')}
                autoComplete="organization"
                aria-required="true"
                className={`${input} ${border('company')}`}
              />
            </Field>
            <Field name="website" label="Website" error={errors.website}>
              <input
                {...register('website')}
                {...a11y('website')}
                inputMode="url"
                autoComplete="url"
                placeholder="example.com"
                className={`${input} ${border('website')}`}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field name="budget" label="Monthly budget range" required error={errors.budget}>
                <select
                  {...register('budget')}
                  {...a11y('budget')}
                  aria-required="true"
                  defaultValue=""
                  className={`${input} ${border('budget')}`}
                >
                  <option value="" disabled>
                    Select a range
                  </option>
                  {BUDGET_OPTIONS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <ServicesField register={register} error={errors.services as FieldError | undefined} />
            <div className="sm:col-span-2">
              <Field name="message" label="Message" required error={errors.message}>
                <textarea
                  {...register('message')}
                  {...a11y('message')}
                  rows={5}
                  aria-required="true"
                  className={`${input} ${border('message')} resize-y`}
                />
              </Field>
            </div>
            {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="botField">Leave this empty</label>
              <input id="botField" tabIndex={-1} autoComplete="off" {...register('botField')} />
            </div>
            <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileTap={{ scale: 0.97 }}
                className="shimmer-border inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-cta px-8 font-heading font-semibold text-[#0a0b10] transition-shadow hover:shadow-[0_0_32px_rgba(249,115,22,0.45)] disabled:opacity-70"
              >
                {status === 'sending' && (
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 animate-[spin_0.8s_linear_infinite] rounded-full border-2 border-[#0a0b10]/30 border-t-[#0a0b10]"
                  />
                )}
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </motion.button>
              {status === 'preview' && (
                <p role="status" className="text-sm text-text-muted">
                  This is a preview, so messages aren&apos;t sent yet. Your details look valid.
                </p>
              )}
              {status === 'error' && (
                <p role="alert" className="text-sm text-[#fca5a5]">
                  Something went wrong. Please try again, or email us at {site.email}.
                </p>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
