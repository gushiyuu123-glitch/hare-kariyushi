import { useMemo, useState } from "react";
import { useSectionReveal } from "../hooks/useSectionReveal";
import Reveal from "../components/Reveal";

import reveal from "../styles/SectionReveal.module.css";
import styles from "./Inquiry.module.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SUBJECTS = [
  { v: "stock", t: "在庫について" },
  { v: "size", t: "サイズ感について" },
  { v: "store", t: "取り扱い店舗について" },
  { v: "other", t: "その他" },
];

const INITIAL_FORM = {
  name: "",
  email: "",
  subject: "stock",
  message: "",
  website: "", // honeypot
};

export default function Inquiry() {
  const { ref, show } = useSectionReveal({
    threshold: 0.16,
    rootMargin: "0px 0px -14% 0px",
    once: true,
  });

  const ENDPOINT = import.meta.env?.VITE_INQUIRY_ENDPOINT ?? "";

  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState({ type: "idle", text: "" });
  const [touched, setTouched] = useState({});

  const isSending = status.type === "sending";

  const selectedSubject =
    SUBJECTS.find((subject) => subject.v === form.subject)?.t ?? "お問い合わせ";

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));

    if (status.type !== "idle") {
      setStatus({ type: "idle", text: "" });
    }
  };

  const setTouchedField = (key) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  };

  const errors = useMemo(() => {
    const next = {};

    if (!form.name.trim()) {
      next.name = "お名前を入力してください。";
    }

    if (!form.email.trim()) {
      next.email = "メールアドレスを入力してください。";
    } else if (!EMAIL_RE.test(form.email.trim())) {
      next.email = "メールアドレスの形式が正しくありません。";
    }

    if (!form.message.trim()) {
      next.message = "内容を入力してください。";
    }

    return next;
  }, [form.name, form.email, form.message]);

  const hasError = Object.keys(errors).length > 0;

  const getErrorId = (key) => `inq-${key}-error`;

  const hasFieldError = (key) => touched[key] && !!errors[key];

  const handleSubmit = async (event) => {
    event.preventDefault();

    setTouched({
      name: true,
      email: true,
      message: true,
    });

    if (form.website.trim()) {
      setStatus({ type: "success", text: "送信しました。" });
      setForm(INITIAL_FORM);
      setTouched({});
      return;
    }

    if (hasError) {
      setStatus({ type: "error", text: "入力内容を確認してください。" });
      return;
    }

    setStatus({ type: "sending", text: "送信中…" });

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject,
      subjectText: selectedSubject,
      message: form.message.trim(),
      page: typeof window !== "undefined" ? window.location.href : "",
      ua: typeof navigator !== "undefined" ? navigator.userAgent : "",
    };

    try {
      if (ENDPOINT) {
        const response = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        setStatus({
          type: "success",
          text: "送信しました。返信まで少しお待ちください。",
        });
        setForm(INITIAL_FORM);
        setTouched({});
        return;
      }

      const mailSubject = encodeURIComponent(`【HARE】${selectedSubject}`);
      const mailBody = encodeURIComponent(
        [
          `お名前：${payload.name}`,
          `メール：${payload.email}`,
          `件名：${payload.subjectText}`,
          "",
          payload.message,
          "",
          "----",
          `送信元：${payload.page}`,
        ].join("\n")
      );

      window.location.href = `mailto:hello@hare.example?subject=${mailSubject}&body=${mailBody}`;

      setStatus({
        type: "success",
        text: "メール作成画面を開きました。",
      });
    } catch (error) {
      setStatus({
        type: "error",
        text: "送信に失敗しました。時間をおいて再度お試しください。",
      });
    }
  };

  return (
    <section
      id="inquiry"
      ref={ref}
      className={`${styles.inquiry} ${reveal.reveal}`}
      data-show={show ? "true" : "false"}
      aria-labelledby="inquiry-title"
    >
      <div className={styles.inner}>
        <Reveal as="p" className={styles.meta} delay={0} direction="still">
          INQUIRY / CONTACT
        </Reveal>

        <div className={styles.frame}>
          <div className={styles.copy}>
            <Reveal
              as="h2"
              id="inquiry-title"
              className={styles.title}
              delay={90}
              direction="deep"
            >
              必要なときだけ、
              <br />
              連絡できる。
            </Reveal>

            <Reveal as="p" className={styles.lead} delay={190}>
              在庫、サイズ感、取り扱い店舗について。
              <br />
              確認だけでも構いません。
            </Reveal>

            <Reveal as="p" className={styles.hint} delay={270} direction="still">
              返信が必要な場合は、メールアドレスをご入力ください。
            </Reveal>
          </div>

          <Reveal
            as="form"
            className={styles.form}
            delay={320}
            direction="deep"
            onSubmit={handleSubmit}
            noValidate
          >
            <fieldset className={styles.fieldset} disabled={isSending}>
              <legend className={styles.srOnly}>お問い合わせフォーム</legend>

              <div className={styles.formHead} aria-hidden="true">
                <span>CONTACT FORM</span>
                <span>04 FIELDS</span>
              </div>

              <div className={styles.grid2}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="inq-name">
                    NAME
                  </label>

                  <input
                    id="inq-name"
                    className={styles.input}
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    placeholder="お名前"
                    onChange={(event) => setField("name", event.target.value)}
                    onBlur={() => setTouchedField("name")}
                    aria-invalid={hasFieldError("name") ? "true" : "false"}
                    aria-describedby={hasFieldError("name") ? getErrorId("name") : undefined}
                  />

                  {hasFieldError("name") && (
                    <p id={getErrorId("name")} className={styles.err} role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="inq-email">
                    EMAIL
                  </label>

                  <input
                    id="inq-email"
                    className={styles.input}
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={form.email}
                    placeholder="mail@example.com"
                    onChange={(event) => setField("email", event.target.value)}
                    onBlur={() => setTouchedField("email")}
                    aria-invalid={hasFieldError("email") ? "true" : "false"}
                    aria-describedby={hasFieldError("email") ? getErrorId("email") : undefined}
                  />

                  {hasFieldError("email") && (
                    <p id={getErrorId("email")} className={styles.err} role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="inq-subject">
                  SUBJECT
                </label>

                <select
                  id="inq-subject"
                  className={styles.select}
                  value={form.subject}
                  onChange={(event) => setField("subject", event.target.value)}
                >
                  {SUBJECTS.map((subject) => (
                    <option key={subject.v} value={subject.v}>
                      {subject.t}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="inq-message">
                  MESSAGE
                </label>

                <textarea
                  id="inq-message"
                  className={styles.textarea}
                  rows={6}
                  value={form.message}
                  placeholder="確認したい内容をご入力ください。"
                  onChange={(event) => setField("message", event.target.value)}
                  onBlur={() => setTouchedField("message")}
                  aria-invalid={hasFieldError("message") ? "true" : "false"}
                  aria-describedby={
                    hasFieldError("message") ? getErrorId("message") : undefined
                  }
                />

                {hasFieldError("message") && (
                  <p id={getErrorId("message")} className={styles.err} role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className={styles.trap} aria-hidden="true">
                <label htmlFor="inq-website">Website</label>
                <input
                  id="inq-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(event) => setField("website", event.target.value)}
                />
              </div>

              <div className={styles.submitRow}>
                <button className={styles.submit} type="submit" disabled={isSending}>
                  <span>{isSending ? "SENDING" : "SEND"}</span>
                  <span aria-hidden="true">→</span>
                </button>

                <p
                  className={styles.status}
                  aria-live="polite"
                  data-type={status.type}
                >
                  {status.text}
                </p>
              </div>
            </fieldset>
          </Reveal>
        </div>

        <Reveal
          as="div"
          className={styles.bottomLine}
          aria-hidden="true"
          delay={860}
          direction="still"
        />
      </div>
    </section>
  );
}