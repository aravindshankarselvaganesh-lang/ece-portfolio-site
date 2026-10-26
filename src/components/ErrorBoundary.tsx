import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('Telemetry Fault in Application ErrorBoundary:', error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <aside
          role="alert"
          className="min-h-screen bg-[#07070A] text-[#EDEDEA] flex flex-col items-center justify-center p-6 text-center select-none"
        >
          <div className="w-3 h-3 rounded-full bg-signal animate-ping mb-4" />
          <div className="font-mono text-xs uppercase tracking-widest text-signal/80 mb-2 font-bold">
            ECE // TELEMETRY FAULT RECOVERED
          </div>
          <h1 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-white mb-3">
            Hardware Interface Exception
          </h1>
          <p className="font-mono text-xs text-white/60 mb-6 max-w-md leading-relaxed">
            A rendering or WebGL exception occurred in the graphics pipeline. The system has safely halted state execution.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-full bg-signal text-black font-mono text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_20px_rgba(57,255,136,0.3)]"
          >
            REINITIALIZE SYSTEM
          </button>
        </aside>
      );
    }
    return this.props.children;
  }
}
