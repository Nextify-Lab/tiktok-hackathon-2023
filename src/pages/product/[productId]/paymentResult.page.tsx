import Header from "@/components/ShopFlow/OrderSummary/Header";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaCheckCircle, FaFrown } from "react-icons/fa";

interface PaymentResultProps {
  status: "success" | "failed";
  groupbuyId: string | null;
}

const PaymentResult: React.FC<PaymentResultProps> = ({
  status,
  groupbuyId,
}) => {
  const router = useRouter();

  const isSuccessful = status === "success";

  return (
    <Flex direction="column" minHeight="100vh">
      <Header />
      <VStack flex="1" justifyContent="center" alignItems="center" spacing={4}>
        <Icon
          as={isSuccessful ? FaCheckCircle : FaFrown}
          boxSize={50}
          color={isSuccessful ? "green.500" : "red.500"}
        />
        <Heading>
          {isSuccessful ? "Payment Successful!" : `Payment Failed ${status}`}
        </Heading>
        <Heading size="md">
          {groupbuyId && `Groupbuy Id: ${groupbuyId}`}
        </Heading>
      </VStack>

      <Box display={"flex"} justifyContent={"center"}>
        <Button
          width="80%"
          colorScheme={isSuccessful ? "green" : "red"}
          onClick={() => {
            if (isSuccessful) {
              router.push("/");
            } else {
              router.back();
            }
          }}
          bottom={"50px"}
        >
          {isSuccessful ? "Go Home" : "Try Again"}
        </Button>
      </Box>
    </Flex>
  );
};

export async function getServerSideProps(context: {
  query: { status: string; groupbuyId?: string };
}) {
  const { status, groupbuyId } = context.query;
  return {
    props: {
      status,
      groupbuyId: groupbuyId || null,
    },
  };
}

export default PaymentResult;
