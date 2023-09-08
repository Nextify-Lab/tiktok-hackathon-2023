import Layout from "@/components/Layout";
import { useUser } from "@/components/userContext";
import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

const LoginPage: React.FC = () => {
  const [userId, setUserId] = useState("");
  const router = useRouter();
  const toast = useToast();
  const { setUserId: setUserIdContext } = useUser();

  const handleLogin = () => {
    if (userId) {
      // Redirect to user profile page
      router.push(`/user/${userId}`);
      setUserIdContext(userId);
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid userId.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Layout>
      <Box
        bg="black"
        minH="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <VStack spacing={4} p={4} bg="white" borderRadius="md" boxShadow="md">
          <Heading size="lg" mb={4}>
            TikTok Login
          </Heading>
          <Input
            placeholder="Enter userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <Button colorScheme="blue" onClick={handleLogin}>
            Login
          </Button>
        </VStack>
      </Box>
    </Layout>
  );
};

export default LoginPage;
