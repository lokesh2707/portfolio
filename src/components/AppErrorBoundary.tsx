import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { error: Error | null };

export default class AppErrorBoundary extends Component<Props, State> {
 state: State = { error: null };

 static getDerivedStateFromError(error: Error): State {
  return { error };
 }

 componentDidCatch(error: Error, info: ErrorInfo) {
  console.error('Portfolio render failed:', error, info.componentStack);
 }

 render() {
  if (this.state.error) {
   return <main className="runtime-error" role="alert"><p className="eyebrow">Something went wrong</p><h1>The portfolio could not render.</h1><p>{this.state.error.message}</p><button type="button" onClick={() => window.location.reload()}>Reload page</button></main>;
  }
  return this.props.children;
 }
}
