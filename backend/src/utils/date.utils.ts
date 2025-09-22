// src/utils/date.util.ts
export function parseFlexibleDate(value?: string | null): string | null {
  if (!value) return null;
  const s = String(value).trim();
  if (!s) return null;

  // Try Date.parse first
  const d1 = new Date(s);
  if (!isNaN(d1.getTime())) return d1.toISOString();

  // Handle formats like M/D/YY H:MM
  const parts = s.split(' ');
  const datePart = parts[0];
  const timePart = parts[1] ?? '00:00';

  const m = datePart.split('/');
  if (m.length >= 2) {
    let month = Number(m[0]);
    let day = Number(m[1]);
    let year = Number(m[2]) ?? new Date().getFullYear();
    if (year < 100) year += 2000; // e.g. 25 → 2025
    const [hour = '0', minute = '0'] = timePart.split(':');
    const dt = new Date(year, month - 1, day, Number(hour), Number(minute));
    if (!isNaN(dt.getTime())) return dt.toISOString();
  }

  return null;
}
