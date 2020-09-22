import React from 'react';
import { Flex } from 'rebass';

const Header: React.FC = () => (
  <>
    <Flex
      width={1}
      py={2}
      flexDirection="column"
      alignItems="center"
      sx={{ boxShadow: '-1px 6px 10px -6px rgba(0,0,0,0.31)' }}
    >
      <a
        href="http://logovectorseek.com/truecaller-logo-vector-svg/"
        target="_blank"
      >
        <img
          className="logo"
          src="http://logovectorseek.com/wp-content/uploads/2019/12/truecaller-logo-vector.png"
        />
      </a>
    </Flex>

    <style jsx>{`
      .logo {
        max-height: 150px;
      }
    `}</style>
  </>
);

export default Header;
