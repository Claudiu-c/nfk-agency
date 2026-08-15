"use client";

import * as Select from "@radix-ui/react-select";
import { startTransition, useActionState, useEffect, useRef } from "react";

import { submitApplication, type JoinFormState } from "./actions";

import styles from "./Join.module.scss";

const initialState: JoinFormState = {
  success: false,
  message: "",
};

export default function JoinForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, pending] = useActionState(
    submitApplication,
    initialState,
  );

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    startTransition(() => {
      formAction(formData);
    });
  };

  useEffect(() => {
    const form = formRef.current;

    if (!form) {
      return;
    }

    if (state.success) {
      form.reset();
      return;
    }

    if (!state.invalidFields?.length) {
      return;
    }

    for (const fieldName of state.invalidFields) {
      const field = form.elements.namedItem(fieldName);

      if (
        field instanceof HTMLInputElement ||
        field instanceof HTMLSelectElement ||
        field instanceof HTMLTextAreaElement
      ) {
        field.value = "";
      }
    }

    const firstInvalidField = form.elements.namedItem(state.invalidFields[0]);

    if (firstInvalidField instanceof HTMLElement) {
      firstInvalidField.focus();
    }
  }, [state]);

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Personal details</legend>

        <div className={styles.fields}>
          <div className={styles.field}>
            <label htmlFor="firstName">First name *</label>

            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="lastName">Last name *</label>

            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email *</label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="phone">Phone *</label>

            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="country">Country *</label>

            <input
              id="country"
              name="country"
              type="text"
              autoComplete="country-name"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="instagram">Instagram</label>

            <input
              id="instagram"
              name="instagram"
              type="text"
              autoComplete="@username"
            />
          </div>

          <div className={styles.field}>
            <span className={styles.fieldLabel}>Date of birth *</span>

            <div
              className={styles.dobFields}
              role="group"
              aria-label="Date of birth"
            >
              <input
                id="birthDay"
                name="birthDay"
                type="text"
                inputMode="numeric"
                autoComplete="bday-day"
                maxLength={2}
                placeholder="DD"
                aria-label="Day"
                required
              />

              <input
                id="birthMonth"
                name="birthMonth"
                type="text"
                inputMode="numeric"
                autoComplete="bday-month"
                maxLength={2}
                placeholder="MM"
                aria-label="Month"
                required
              />

              <input
                id="birthYear"
                name="birthYear"
                type="text"
                inputMode="numeric"
                autoComplete="bday-year"
                maxLength={4}
                placeholder="YYYY"
                aria-label="Year"
                required
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="gender">Gender *</label>

            <Select.Root name="gender" required>
              <Select.Trigger
                id="gender"
                className={styles.selectTrigger}
                aria-label="Gender"
              >
                <Select.Value placeholder="Select gender" />

                <Select.Icon className={styles.selectIcon}>↓</Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content
                  className={styles.selectContent}
                  position="popper"
                  sideOffset={6}
                >
                  <Select.Viewport className={styles.selectViewport}>
                    <Select.Item value="female" className={styles.selectItem}>
                      <Select.ItemText>Female</Select.ItemText>

                      <Select.ItemIndicator className={styles.selectIndicator}>
                        ✓
                      </Select.ItemIndicator>
                    </Select.Item>

                    <Select.Item value="male" className={styles.selectItem}>
                      <Select.ItemText>Male</Select.ItemText>

                      <Select.ItemIndicator className={styles.selectIndicator}>
                        ✓
                      </Select.ItemIndicator>
                    </Select.Item>

                    <Select.Item value="other" className={styles.selectItem}>
                      <Select.ItemText>Other</Select.ItemText>

                      <Select.ItemIndicator className={styles.selectIndicator}>
                        ✓
                      </Select.ItemIndicator>
                    </Select.Item>

                    <Select.Item
                      value="prefer-not-to-say"
                      className={styles.selectItem}
                    >
                      <Select.ItemText>Prefer not to say</Select.ItemText>

                      <Select.ItemIndicator className={styles.selectIndicator}>
                        ✓
                      </Select.ItemIndicator>
                    </Select.Item>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          <div className={styles.field}>
            <label htmlFor="height">Height (cm) *</label>

            <input
              id="height"
              name="height"
              type="number"
              inputMode="numeric"
              min="100"
              max="230"
              required
            />
          </div>
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>About you</legend>

        <div className={styles.aboutFields}>
          <div className={`${styles.field} ${styles.fullField}`}>
            <label htmlFor="experience">Experience *</label>

            <textarea
              id="experience"
              name="experience"
              rows={4}
              placeholder="Previous modelling, campaigns, shoots, agencies or relevant experience..."
              required
            />
          </div>

          <div className={`${styles.field} ${styles.fullField}`}>
            <label htmlFor="message">Tell us about yourself</label>

            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Location, availability or anything else you'd like us to know..."
            />
          </div>
        </div>
      </fieldset>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Documents</legend>

        <div className={styles.uploads}>
          <div className={styles.uploadField}>
            <div className={styles.uploadInfo}>
              <label htmlFor="portfolio">Portfolio *</label>

              <p>Upload your portfolio in PDF format.</p>
            </div>

            <input
              id="portfolio"
              name="portfolio"
              type="file"
              accept=".pdf,application/pdf"
              required
            />
          </div>

          <div className={styles.uploadField}>
            <div className={styles.uploadInfo}>
              <label htmlFor="resume">Resume *</label>

              <p>Upload your resume in PDF format.</p>
            </div>

            <input
              id="resume"
              name="resume"
              type="file"
              accept=".pdf,application/pdf"
              required
            />
          </div>
        </div>
      </fieldset>
      <div className={styles.formBottom}>
        <div>
          <p className={styles.note}>Fields marked with * are required.</p>

          {state.message && (
            <div
              className={
                state.success ? styles.successMessage : styles.errorMessage
              }
              aria-live="polite"
            >
              <span className={styles.messageLabel}>
                {state.success ? "Application sent" : "Please check the form"}
              </span>

              <p>{state.message}</p>
            </div>
          )}
        </div>

        <button type="submit" className={styles.submit} disabled={pending}>
          {pending ? "Sending..." : "Submit application"}

          {!pending && <span aria-hidden="true">{"\u2197\uFE0E"}</span>}
        </button>
      </div>
    </form>
  );
}
