// pages/user/[userId].tsx
import Layout from "@/components/Layout";
import { FOOD_ITEM_IMAGE_URL } from "@/components/VideoCard";
import { useUser } from "@/components/userContext";
import {
  Box,
  Text,
  Heading,
  Image,
  Grid,
  Avatar,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const mockItems = [
  { id: "1", name: "Item 1", price: "$10" },
  { id: "2", name: "Item 2", price: "$20" },
  // ... add more mocked items
];

// Inside UserProfile component, after user details:
interface UserProfileProps {
  user: Buyer;
  transactions: any[]; // You can define a more specific type if needed
}
const UserProfile: React.FC<UserProfileProps> = ({ user, transactions }) => {
  const router = useRouter();
  const { userId, setUserId } = useUser();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Box p={4} color={"white"}>
        {/* Profile Section */}
        <Flex direction="column" alignItems="center" mb={6}>
          <Avatar size="2xl" src={FOOD_ITEM_IMAGE_URL} mb={4} />
          <Text fontSize="xl" fontWeight="bold">
            {user.username}
          </Text>
          <Button
            onClick={() => {
              router.push(`/login`);
              setUserId(null);
            }}
          >
            Log out
          </Button>
          <Flex mt={2}>
            <Box mx={2}>
              <Text fontWeight="bold">25</Text>
              <Text fontSize="sm">Followers</Text>
            </Box>
            <Box mx={2}>
              <Text fontWeight="bold">123</Text>
              <Text fontSize="sm">Following</Text>
            </Box>
            <Box mx={2}>
              <Text fontWeight="bold">4125</Text>
              <Text fontSize="sm">Likes</Text>
            </Box>
          </Flex>
          <Text mt={4}>Time to win a Tiktok Hackathon!</Text>
        </Flex>

        {/* Videos Grid
      <SimpleGrid columns={3} spacing={2}>
        {user.videos.map((video) => (
          <Box key={video.id}>
            <Image src={video.thumbnail} alt={video.title} />
          </Box>
        ))}
      </SimpleGrid> */}
        <Heading size="md" mb={4}>
          Purchased Items:
        </Heading>
        {/* <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          {mockItems.map((item) => (
            <Box key={item.id} p={4} borderWidth="1px" borderRadius="md">
              <Image src={FOOD_ITEM_IMAGE_URL} alt={item.name} />
              <Text mt={2}>{item.name}</Text>
              <Text>{item.price}</Text>
            </Box>
          ))}
        </Grid> */}
        {transactions &&
          transactions.map((transaction) => (
            <Box
              key={transaction.transactionId}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              mb={4}
            >
              {transaction.items.map((item) => (
                <Flex
                  key={item.productId}
                  direction="column"
                  alignItems="center"
                  mb={4}
                >
                  <Image src={FOOD_ITEM_IMAGE_URL} alt={item.itemName} />
                  <Text mt={2}>{item.itemName}</Text>
                  <Text>Quantity: {item.quantity}</Text>
                  <Text>Price: ${item.price}</Text>
                </Flex>
              ))}
              {transaction.items[0].groupbuyId && (
                <Text fontWeight="bold" color="red.500">
                  Groupbuy Transaction
                </Text>
              )}
            </Box>
          ))}
      </Box>
    </Layout>
  );
};

export async function getServerSideProps(context: { params: { userId: any, transactions: any[] } }) {
  const { userId } = context.params;
  // const res = await fetch(`http://localhost:3000/api/buyers/${userId}`);
  const res = await fetch(
    `http://localhost:3000/api/buyers/${userId}?withItems=true`
  );
  const data = await res.json();
  const user = data.buyer;
  const transactions = data.transactions;

  // const user = await res.json();
  console.log("user", user);
  // Check if user is undefined
  if (!user || user.error) {
    return {
      redirect: {
        destination: "/login", // Path to your login page
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
      transactions
    },
  };
}

export default UserProfile;
