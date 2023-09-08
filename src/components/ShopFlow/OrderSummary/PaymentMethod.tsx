import {
  Box,
  Flex,
  Text,
  RadioGroup,
  Radio,
  useRadioGroup,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { FaPlus, FaChevronRight, FaCreditCard } from "react-icons/fa"; // import the icons you need

const PaymentMethod = () => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "payment",
    defaultValue: "grabPay",
  });
  const groupProps = getRootProps();

  return (
    <Box p={4} boxShadow="md" borderWidth="1px" borderRadius="lg" mb={4}>
      {/* First Row */}
      <Flex justifyContent="space-between" mb={3}>
        <Text>Payment method</Text>
        <Flex alignItems="center" color="gray.500">
          <Text>View all</Text>
          <FaChevronRight size="1.25em" /> {/* Changed Icon */}
        </Flex>
      </Flex>

      {/* Second Row */}
      <Flex justifyContent="space-between" mb={3}>
        <Flex flex="1" alignItems="center">
          <FaPlus size="1.25em" /> {/* Changed Icon */}
        </Flex>
        <Flex flex="5" justifyContent="flex-start">
          <Text>Add debit/credit card</Text>
        </Flex>
        <Flex flex="1" justifyContent="flex-end" alignItems="center">
          <FaChevronRight size="1.25em" color="gray.500" /> {/* Changed Icon */}
        </Flex>
      </Flex>

      <RadioGroup {...(groupProps as any)}>
        {/* GrabPay Row */}
        <Flex justifyContent="space-between" mb={3}>
          <Flex flex="1" alignItems="center">
            <Image
              src="https://assets.grab.com/wp-content/uploads/sites/8/2021/11/26235239/GrabPay_Final_Logo_RGB_green_StackedVersion-01.png"
              alt="GrabPay"
              boxSize="1.25em"
            />
            {/* Adjust the path accordingly */}
          </Flex>
          <Flex flex="5" justifyContent="flex-start">
            <Text>GrabPay</Text>
          </Flex>
          <Flex flex="1" justifyContent="flex-end">
            <Radio {...getRadioProps({ value: "grabPay" })} />
          </Flex>
        </Flex>

        {/* Paynow Row */}
        <Flex justifyContent="space-between" mb={3}>
          <Flex flex="1" alignItems="center">
            <Box width="1.25em" overflow="hidden">
              <Image
                src="/paynowlogo.jpeg"
                alt="PayNow"
                objectPosition="center" // This will position the image to the center
                height="100%"
              />
            </Box>
            {/* Adjust the path accordingly */}
          </Flex>
          <Flex flex="5" justifyContent="flex-start">
            <Text>PayNow</Text>
          </Flex>
          <Flex flex="1" justifyContent="flex-end">
            <Radio {...getRadioProps({ value: "payNow" })} />
          </Flex>
        </Flex>

        {/* Visa/Mastercard Row */}
        <Flex justifyContent="space-between" mb={3}>
          <Flex flex="1" alignItems="center">
            <FaCreditCard size="1.25em" />
          </Flex>
          <Flex flex="5" justifyContent="flex-start">
            <Text>Visa/Mastercard</Text>
          </Flex>
          <Flex flex="1" justifyContent="flex-end">
            <Radio {...getRadioProps({ value: "visaMastercard" })} />
          </Flex>
        </Flex>
      </RadioGroup>
    </Box>
  );
};

export default PaymentMethod;
