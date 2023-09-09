import { Skeleton, Box, BoxProps } from "@chakra-ui/react";

interface SkeletonBoxProps extends BoxProps {
  isLoading: boolean;
}

const SkeletonBox: React.FC<SkeletonBoxProps> = ({
  isLoading,
  children,
  ...rest
}) => {
  return (
    <Box display="flex" flexDirection="column" {...rest}>
      <Skeleton isLoaded={!isLoading} flex="1">
        {children}
      </Skeleton>
    </Box>
  );
};

export default SkeletonBox;
