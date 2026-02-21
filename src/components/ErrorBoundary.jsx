import React from "react";

/**
 * Catches render errors (e.g. failed texture load in 3D ball) and shows a fallback
 * so tech icons always render something instead of a broken image.
 */
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.warn("Tech icon failed to render, showing fallback:", error?.message || error, info?.componentStack);
  }

  render() {
    if (this.state.hasError && this.props.fallback) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
