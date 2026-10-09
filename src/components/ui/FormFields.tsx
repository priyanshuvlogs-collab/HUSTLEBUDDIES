import type { ReactNode } from 'react';
import type { FieldError, UseFormRegister } from 'react-hook-form';
import { SERVICE_OPTIONS, type ContactInput } from '../../lib/schema';

export const inputClass =
  'mt-2 block w-full rounded-xl border bg-bg-dark px-4 py-3 text-text-primary placeholder:text-text-muted/70 transition-colors focus:border-accent focus:outline-none focus-visible:outline-2';

/** Inline error that shakes on appearance (CSS transform animation, disabled under reduced motion). */
function ErrorText({ id, error }: { id: string; error?: FieldError | { message?: string } }) {
  if (!error?.message) return null;
  return (
    <p
      id={id}
      role="alert"
      key={error.message}
      className="animate-shake mt-2 text-sm text-[#fca5a5]"
    >
      {error.message}
    </p>
  );
}

export function Field({
  name,
  label,
  required,
  error,
  children,
}: {
  name: string;
  label: string;
  required?: boolean;
  error?: FieldError;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-text-primary">
        {label}
        {required && (
          <span aria-hidden="true" className="text-cta">
            {' '}
            *
          </span>
        )}
      </label>
      {children}
      <ErrorText id={`${name}-error`} error={error} />
    </div>
  );
}

/** Multi-select for services, as an accessible checkbox group. */
export function ServicesField({
  register,
  error,
}: {
  register: UseFormRegister<ContactInput>;
  error?: FieldError;
}) {
  return (
    <fieldset className="sm:col-span-2" aria-describedby={error ? 'services-error' : undefined}>
      <legend className="text-sm font-medium text-text-primary">
        Services of interest
        <span aria-hidden="true" className="text-cta">
          {' '}
          *
        </span>
      </legend>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {SERVICE_OPTIONS.map((s) => (
          <label
            key={s}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/15 px-4 py-3 text-sm text-text-primary transition-colors has-[:checked]:border-accent has-[:checked]:bg-accent/10"
          >
            <input
              type="checkbox"
              value={s}
              {...register('services')}
              className="h-4 w-4 accent-[#3B82F6]"
            />
            {s}
          </label>
        ))}
      </div>
      <ErrorText id="services-error" error={error} />
    </fieldset>
  );
}
