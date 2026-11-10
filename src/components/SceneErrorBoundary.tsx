import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = { children: ReactNode; onError: () => void };
type State = { failed: boolean };

export default class SceneErrorBoundary extends Component<Props, State> {
 state: State = { failed: false };

 static getDerivedStateFromError(): State {
  return { failed: true };
 }

 componentDidCatch(error: Error, info: ErrorInfo) {
  console.error('3D hero failed; using the CSS fallback:', error, info.componentStack);
  this.props.onError();
 }

 render() {
  return this.state.failed ? null : this.props.children;
 }
}
