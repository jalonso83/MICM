"use client";

import { useState, useEffect, useCallback } from "react";
import type { WizardState } from "@/types";

const STORAGE_KEY = "diagnostico-wizard-state";

const initialState: WizardState = {
  currentStep: 0,
  company: {},
  responses: {},
};

function loadState(): WizardState {
  if (typeof window === "undefined") return initialState;
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return initialState;
}

export function useWizardState() {
  const [state, setState] = useState<WizardState>(initialState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setState(loadState());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isLoaded]);

  const setCompanyField = useCallback((field: string, value: string) => {
    setState((prev) => ({
      ...prev,
      company: { ...prev.company, [field]: value },
    }));
  }, []);

  const setResponse = useCallback((questionId: string, value: number) => {
    setState((prev) => ({
      ...prev,
      responses: { ...prev.responses, [questionId]: value },
    }));
  }, []);

  const setStep = useCallback((step: number) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    state,
    isLoaded,
    setCompanyField,
    setResponse,
    setStep,
    reset,
  };
}
