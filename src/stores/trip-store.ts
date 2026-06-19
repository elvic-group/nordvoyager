import { create } from 'zustand';
import { Trip, TripInput } from '@/lib/types';

interface TripStore {
  currentStep: number;
  input: TripInput;
  trip: Trip | null;
  isLoading: boolean;
  error: string | null;
  activeDay: number;

  setInput: (partial: Partial<TripInput>) => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setTrip: (trip: Trip | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setActiveDay: (day: number) => void;
  reset: () => void;
}

const initialInput: TripInput = {
  interests: [],
  season: 'winter',
  duration: 5,
  budget: 'medium',
  startLocation: 'tromso',
};

export const useTripStore = create<TripStore>((set) => ({
  currentStep: 0,
  input: { ...initialInput },
  trip: null,
  isLoading: false,
  error: null,
  activeDay: 1,

  setInput: (partial) => set((state) => ({ input: { ...state.input, ...partial } })),
  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 3) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 0) })),
  setTrip: (trip) => set({ trip }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setActiveDay: (activeDay) => set({ activeDay }),
  reset: () => set({
    currentStep: 0,
    input: { ...initialInput },
    trip: null,
    activeDay: 1,
    isLoading: false,
    error: null,
  }),
}));
