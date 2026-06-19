'use client';

import { Component, ReactNode } from 'react';
import Button from '@/components/ui/Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="p-6 text-center">
          <div className="text-lg font-bold text-[#15273F] mb-2">Noe gikk galt</div>
          <p className="text-sm text-[#5A6A7A] mb-4">
            {this.state.error?.message || 'En uventet feil oppstod'}
          </p>
          <Button onClick={() => this.setState({ hasError: false, error: null })}>
            Prøv igjen
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
