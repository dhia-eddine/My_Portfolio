/* eslint-disable react/prop-types -- generic boundary */
import React from "react";

/**
 * Catches render errors (e.g. WebGL context failures) and shows a fallback
 * so the page always renders something instead of crashing.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.warn(
      "Component failed to render, showing fallback:",
      error?.message || error,
      info?.componentStack,
    );
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
