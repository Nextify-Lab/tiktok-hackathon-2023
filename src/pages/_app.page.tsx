import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import theme from "@/theme";
import { UserProvider } from "@/components/userContext";

// SOMETHING TO NOTE HERE, IF U USE CHAKRA UI COMPONENT, DONT USE TAILWIND ON THAT COMPONENT
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ChakraProvider>
  );
}
