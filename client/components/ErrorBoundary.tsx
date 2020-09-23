import React from 'react';
import Link from 'next/link';
import { Button, Flex, Text } from 'rebass';

class ErrorBoundary extends React.Component {
  state: {
    hasError: boolean;
  };

  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error(error);
    console.error(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Flex
          justifyContent="center"
          alignItems="center"
          backgroundColor="blue"
          height="100vh"
          color="white"
          flexDirection="column"
        >
          <Text fontSize={6} fontWeight="bolder">
            Internal Error occured.
          </Text>
          <br />
          <Flex>
            <Button bg="white" color="blue" fontWeight="bolder">
              <Link href="/">Back to home</Link>
            </Button>
            <Button bg="white" color="blue" fontWeight="bolder" mx={2}>
              Report error
            </Button>
          </Flex>
        </Flex>
      );
    }

    return this.props.children;
  }
}

export const WrapErrorBoundary = (Component) => (props) => (
  <ErrorBoundary>
    <Component {...props} />
  </ErrorBoundary>
);
