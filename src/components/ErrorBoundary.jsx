import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-border p-8 text-center">
            <div className="w-16 h-16 bg-danger/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Something went wrong</h2>
            <p className="text-muted-foreground mb-6">
              Quiz component crashed. Check console for details.
            </p>
            {this.state.error && (
              <details className="mb-6 p-4 bg-muted/50 rounded-xl text-left text-sm max-h-32 overflow-y-auto">
                <summary className="font-medium cursor-pointer mb-2">Error details</summary>
                <pre className="whitespace-pre-wrap text-danger">{this.state.error.toString()}</pre>
              </details>
            )}
            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-xl transition-colors"
              >
                Try Again
              </button>
              <a
                href="/StudySets"
                className="w-full block bg-muted text-muted-foreground font-medium py-3 px-6 rounded-xl text-center transition-colors hover:bg-muted/80"
              >
                Back to Study Sets
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
