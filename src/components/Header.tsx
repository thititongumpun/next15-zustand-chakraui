import { Box, Flex, Highlight, Heading, Spacer } from "@chakra-ui/react";
import { ColorModeButton } from "./ui/color-mode";

export default function Header() {
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      padding="4"
      letterSpacing="tight"
    >
      <Heading fontSize={["sm", "md", "lg"]}>
        <Highlight query="Gemini AI" styles={{ color: "teal.600" }}>
          ✍️ Smart Money Saver with Gemini AI
        </Highlight>
      </Heading>

      <Spacer />
      <Box>
        <ColorModeButton />
      </Box>
    </Flex>
  );
}
