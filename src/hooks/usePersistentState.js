import { useEffect, useState } from "react";

export default function usePersistentState(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const savedValue = window.localStorage.getItem(key);
      return {
        value: savedValue === null ? initialValue : JSON.parse(savedValue),
        error: "",
        shouldPersist: false,
      };
    } catch {
      return {
        value: initialValue,
        error: "Saved data could not be read. Changes may not be retained.",
        shouldPersist: false,
      };
    }
  });

  useEffect(() => {
    if (!state.shouldPersist) return;

    try {
      window.localStorage.setItem(key, JSON.stringify(state.value));
      setState((current) => ({ ...current, error: "", shouldPersist: false }));
    } catch {
      setState((current) => ({
        ...current,
        error: "Changes could not be saved in this browser.",
        shouldPersist: false,
      }));
    }
  }, [key, state.shouldPersist, state.value]);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key !== key || event.newValue === null) return;

      try {
        setState({
          value: JSON.parse(event.newValue),
          error: "",
          shouldPersist: false,
        });
      } catch {
        setState((current) => ({
          ...current,
          error: "Updated saved data could not be read.",
        }));
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [key]);

  const setValue = (nextValue) => {
    setState((current) => ({
      value:
        typeof nextValue === "function"
          ? nextValue(current.value)
          : nextValue,
      error: "",
      shouldPersist: true,
    }));
  };

  return [state.value, setValue, state.error];
}
