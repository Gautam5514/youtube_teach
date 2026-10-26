import { Component } from 'react';
export default class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <main className="min-h-screen grid place-items-center p-6"><div className="max-w-md text-center"><h1 className="text-3xl">Let’s try that again.</h1><p className="my-5">SmileCare couldn’t load this view. Reload to start again. Unsaved form details will be cleared.</p><a href="/" className="primary-button">Reload SmileCare</a></div></main>;
    return this.props.children;
  }
}
