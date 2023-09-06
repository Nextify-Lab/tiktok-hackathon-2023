import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import theme from "@/theme";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store";

// SOMETHING TO NOTE HERE, IF U USE CHAKRA UI COMPONENT, DONT USE TAILWIND ON THAT COMPONENT
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ReduxProvider>
  );
}
