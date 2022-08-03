import React, { ChangeEvent } from "react";

type BoundableHTMLElements = HTMLInputElement | HTMLSelectElement;
type BoundableEvents = "onchange";
type BoundableEvent2EventType<B extends BoundableEvents, E extends HTMLElement> = B extends "onchange"
  ? ChangeEvent<E>
  : never;

export const getGetValueFromEvent = <B extends BoundableEvents, E extends BoundableHTMLElements>(
  eventToBindTo: B
): ((e: BoundableEvent2EventType<B, E>) => string) => {
  switch (eventToBindTo) {
    case "onchange":
      return (e) => e.target.value;
  }
  return () => "";
};

export type DirtyT = { dirty: boolean };
export type FormFieldType = ReturnType<typeof useFormField>;
export const isDirty = (...fields: DirtyT[]) => fields.some((field) => field.dirty);
export const useFormField = <E extends BoundableHTMLElements, T>(
  initialValue: T,
  eventToBindTo: BoundableEvents = "onchange",
  onEvent: (value: T) => void = (v: T) => void 0,
  transform: (value: string) => T = (s: string) => s as unknown as T
) => {
  const [pristineValue, setPristineValue] = React.useState(initialValue);
  const [value, _setValue] = React.useState<T>(initialValue);
  const [dirty, setDirty] = React.useState(false);

  const setValue = React.useCallback(
    (value: T) => {
      _setValue(value);
      setDirty(value !== pristineValue);
    },
    [_setValue, setDirty, pristineValue]
  );

  const setValueAndPristineValue = React.useCallback(
    (value: T) => {
      _setValue(value);
      setPristineValue(value);
      setDirty(false);
    },
    [_setValue, setDirty, setPristineValue]
  );

  const getValueFromEvent = React.useMemo(() => getGetValueFromEvent(eventToBindTo), [eventToBindTo]);
  const sinkEvent = React.useCallback(
    (event: BoundableEvent2EventType<typeof eventToBindTo, E>) => {
      const value = getValueFromEvent(event);
      const transformedValue = transform(value);
      onEvent(transformedValue);
      setValue(transformedValue);
    },
    [transform, setValue, getValueFromEvent]
  );

  return {
    value,
    setValue,
    setValueAndPristineValue,
    dirty,
    setDirty,
    sinkEvent
  } as const;
};
