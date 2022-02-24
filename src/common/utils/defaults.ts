const numberOrDefault = (something: unknown, def: number): number =>
  isNaN(Number(something)) ? def : Number(something);
const stringOrDefault = (something: unknown, def: string): string =>
  typeof something === "string" ? def : String(something);

export { numberOrDefault, stringOrDefault };
