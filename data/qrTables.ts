export type QrTable = {
  locationId: string;
  tableId: string;
  destination: string;
};

const destinations = {
  "701": "https://mbnk.biz/6r8jiKMusg/8HEU9",
  "702": "https://mbnk.biz/6r8jiKMusg/52CZ1",
  "703": "https://mbnk.biz/6r8jiKMusg/Q5C0U",
  "704": "https://mbnk.biz/6r8jiKMusg/C2E64",
  "705": "https://mbnk.biz/6r8jiKMusg/X7RD4",
  "706": "https://mbnk.biz/6r8jiKMusg/M3NUI",
  "801": "https://mbnk.biz/6r8jiKMusg/Z2246",
  "802": "https://mbnk.biz/6r8jiKMusg/6F1P8",
  "803": "https://mbnk.biz/6r8jiKMusg/ZY8RS",
  "804": "https://mbnk.biz/6r8jiKMusg/M5SK6",
  "805": "https://mbnk.biz/6r8jiKMusg/KUON0",
  "806": "https://mbnk.biz/6r8jiKMusg/ASDPT",
  "807": "https://mbnk.biz/6r8jiKMusg/185MC",
} as const;

export const qrTables: Readonly<Record<string, QrTable>> = Object.freeze(
  Object.fromEntries(
    Object.entries(destinations).map(([tableId, destination]) => [
      `khimichna:${tableId}`,
      { locationId: "khimichna", tableId, destination },
    ]),
  ),
);

export function getQrTable(locationId: string, tableId: string) {
  return qrTables[`${locationId}:${tableId}`] ?? null;
}
