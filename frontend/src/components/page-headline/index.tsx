import { Heading } from "@chakra-ui/react";

interface Props {
  title: string;
}

const PageHeadline = ({ title }: Props) => (
  <Heading as="h1" size="3xl">
    {title}
  </Heading>
);

export { PageHeadline };
