import {
  Box,
  Flex,
  Text,
  RadioGroup,
  Radio,
  Icon,
  useRadioGroup,
} from "@chakra-ui/react";
import React from "react";

const PaymentMethod = () => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "payment",
    defaultValue: "grabPay",
    // You can have an onChange handler here if required
  });
  const groupProps = getRootProps();

  return (
    <Box p={4} boxShadow="md" borderWidth="1px" borderRadius="lg" mb={4}>
      {/* First Row */}
      <Flex justifyContent="space-between" mb={3}>
        <Text>Payment method</Text>
        <Flex alignItems="center" color="gray.500">
          <Text>View all</Text>
          {/* Replace with your actual chevron icon */}
          <Icon name="chevron-right-icon" ml={2} />
        </Flex>
      </Flex>

      {/* Second Row */}
      <Flex justifyContent="space-between" mb={3}>
        <Flex flex="1" alignItems="center">
          <Icon name="plus-icon" />
        </Flex>
        <Flex flex="5" justifyContent="flex-start">
          <Text>Add debit/credit card</Text>
        </Flex>
        <Flex flex="1" justifyContent="flex-end" alignItems="center">
          <Icon name="chevron-right-icon" color="gray.500" />
        </Flex>
      </Flex>

      <RadioGroup {...(groupProps as any)}>
        {/* GrabPay Row */}
        <Flex justifyContent="space-between" mb={3}>
          <Flex flex="1" alignItems="center">
            <Icon name="grabPay-icon" />
          </Flex>
          <Flex flex="5" justifyContent="flex-start">
            <Text>GrabPay</Text>
          </Flex>
          <Flex flex="1" justifyContent="flex-end">
            <Radio {...getRadioProps({ value: "grabPay" })} />
          </Flex>
        </Flex>

        {/* Visa/Mastercard Row */}
        <Flex justifyContent="space-between" mb={3}>
          <Flex flex="1" alignItems="center">
            <Icon name="visa-mastercard-icon" />
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
