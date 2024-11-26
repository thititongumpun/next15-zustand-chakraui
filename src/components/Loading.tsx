import { Container, Spinner, VStack, Text } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Container
      h="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={8}
      md={{ padding: 24 }}
    >
      <VStack colorPalette="teal">
        <Spinner color="colorPalette.600" />
        <Text color="colorPalette.600">Loading...</Text>
      </VStack>
    </Container>
  );
}
