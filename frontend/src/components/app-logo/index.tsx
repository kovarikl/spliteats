import { Container, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props {
  size?: number;
}

const AppLogo = ({ size }: Props) => {
  return (
    <Link to="/">
      <Container justifySelf="start" m={0} p={0}>
        <Image src="/app-logo.svg" height={size ?? 12} />
      </Container>
    </Link>
  );
};

export { AppLogo };
