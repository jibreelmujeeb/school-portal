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
      const serializedValue = JSON.stringify(state.value);
      window.localStorage.setItem(key, serializedValue);
      window.dispatchEvent(new CustomEvent("persistent-state-updated", {
        detail: { key, value: serializedValue },
      }));
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
    const applyValue = (serializedValue) => {
      try {
        setState({
          value: JSON.parse(serializedValue),
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

    const handleStorage = (event) => {
      if (event.key !== key || event.newValue === null) return;
      applyValue(event.newValue);
    };
    const handleLocalUpdate = (event) => {
      if (event.detail?.key !== key) return;
      applyValue(event.detail.value);
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("persistent-state-updated", handleLocalUpdate);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("persistent-state-updated", handleLocalUpdate);
    };
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
