import { head, tail } from "ramda";

const decapitate = <T>(items: T[]) => {
  const first = head(items);
  const rest = tail(items);
  return [first, rest];
};

const decapitateMapTail =
  <T, U>(fn: (item: T, index: number) => U) =>
  (items: T[]) => {
    const first = head(items);
    const rest = tail(items);
    return [first, rest.map(fn)];
  };

export { decapitate, decapitateMapTail };
