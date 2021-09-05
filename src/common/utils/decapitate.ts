import { head, tail } from "ramda";

type DecapitateReturnType = [ReturnType<typeof head>, ReturnType<typeof tail>];

const decapitate = <T>(items: T[]): DecapitateReturnType => {
  const first = head(items);
  const rest = tail(items);
  return [first, rest];
};

const decapitateMapTail =
  <T, U>(fn: (item: T, index: number) => U) =>
  (items: T[]): DecapitateReturnType => {
    const first = head(items);
    const rest = tail(items);
    return [first, rest.map(fn)];
  };

export { decapitate, decapitateMapTail };
