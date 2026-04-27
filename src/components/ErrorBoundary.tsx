"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { ShieldAlert, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[ErrorBoundary] Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-screen bg-bg-base flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white border-4 border-bg-dark rounded-2xl shadow-[8px_8px_0_#000] p-8 text-center">
            <div className="w-16 h-16 bg-red-100 border-3 border-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShieldAlert className="w-8 h-8 text-red-500" />
            </div>
            
            <h1 className="text-2xl font-black uppercase tracking-tighter text-bg-dark mb-2">
              System Fault
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6">
              An unexpected error disrupted the interface
            </p>
            
            <div className="bg-zinc-50 border-2 border-zinc-200 rounded-xl p-4 mb-6 text-left">
              <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-1">Error Log</p>
              <p className="text-xs font-mono text-red-600 break-all leading-relaxed">
                {this.state.error?.message || "Unknown error"}
              </p>
            </div>
            
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="w-full bg-bg-dark text-white font-black uppercase tracking-widest text-xs py-4 rounded-xl border-3 border-bg-dark shadow-[4px_4px_0_#000] flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <RefreshCw className="w-4 h-4" />
              Reinitialize System
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
