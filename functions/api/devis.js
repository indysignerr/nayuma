// POST /api/devis : demande de devis ou d'échantillons pro, envoyée par email via Resend.
// Variables Cloudflare Pages : RESEND_API_KEY (obligatoire), DEVIS_TO_EMAIL et DEVIS_FROM_EMAIL (facultatives).

const LIMITS = {
  name: 120,
  company: 160,
  email: 200,
  phone: 40,
  activity: 80,
  request: 80,
  city: 120,
  siret: 40,
  message: 4000,
};
const REQUIRED = ["name", "company", "email", "message"];

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== "POST") {
    return json({ error: "method_not_allowed" }, 405, { Allow: "POST" });
  }
  if (!isSameOrigin(request)) {
    return json({ error: "forbidden" }, 403);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }
  if (!body || typeof body !== "object") {
    return json({ error: "invalid_json" }, 400);
  }

  // Champ piège invisible : seul un robot le remplit. On répond comme si tout allait bien.
  if (body.website) {
    return json({ ok: true });
  }

  const fields = {};
  for (const [key, max] of Object.entries(LIMITS)) {
    const value = typeof body[key] === "string" ? body[key].trim() : "";
    if (value.length > max) return json({ error: "too_long", field: key }, 400);
    fields[key] = value;
  }

  const missing = REQUIRED.filter((key) => !fields[key]);
  if (missing.length > 0 || body.consent !== "on") {
    return json({ error: "missing_fields", missing }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    return json({ error: "invalid_email" }, 400);
  }

  if (!env.RESEND_API_KEY) {
    return json({ error: "not_configured" }, 503);
  }

  const rows = [
    ["Nom", fields.name],
    ["Établissement", fields.company],
    ["Activité", fields.activity],
    ["Objet", fields.request],
    ["Email", fields.email],
    ["Téléphone", fields.phone],
    ["Ville", fields.city],
    ["SIRET", fields.siret],
  ].filter(([, value]) => value);

  const subject = `[Pro] ${fields.request || "Demande"} — ${fields.company}`.replace(/[\r\n]+/g, " ");
  const text = `${rows.map(([label, value]) => `${label} : ${value}`).join("\n")}\n\n${fields.message}`;
  const html = `<table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">${rows
    .map(([label, value]) => `<tr><td style="color:#6b6254">${label}</td><td><strong>${escapeHtml(value)}</strong></td></tr>`)
    .join("")}</table><p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(fields.message)}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.DEVIS_FROM_EMAIL || "NAYUMA Pro <pro@nayumatea.com>",
      to: [env.DEVIS_TO_EMAIL || "contact@nayumatea.com"],
      reply_to: fields.email,
      subject,
      text,
      html,
    }),
  });

  if (!res.ok) {
    return json({ error: "send_failed" }, 502);
  }
  return json({ ok: true });
}

function isSameOrigin(request) {
  const origin = request.headers.get("Origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...headers },
  });
}
