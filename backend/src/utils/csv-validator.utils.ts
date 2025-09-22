export function validateRow(row: Record<string, string>) {
  if (!row.name || !row.email || !row.age) {
    return false;
  }
  return true;
}
