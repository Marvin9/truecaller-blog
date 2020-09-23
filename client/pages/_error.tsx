import Link from 'next/link';
import { Button, Flex } from 'rebass';

import Header from '../components/Layout/Header';

export default function Error() {
  return (
    <>
      <Header />
      <Flex
        width="100vw"
        height="100vh"
        justifyContent="center"
        alignItems="center"
        sx={{ position: 'absolute', top: 0 }}
      >
        <Link href="/">
          <Button bg="blue">Back to home</Button>
        </Link>
      </Flex>
      <style jsx>{`
        * {
          overflow: hidden !important;
        }
      `}</style>
    </>
  );
}
