import { Skeleton, Box, BoxProps } from "@chakra-ui/react";

interface SkeletonBoxProps extends BoxProps {
  isLoading: boolean;
}

const SkeletonBox: React.FC<SkeletonBoxProps> = ({ isLoading, children, ...rest }) => {
  return (
    <Box {...rest}>
      <Skeleton isLoaded={!isLoading}>
        {children}
      </Skeleton>
    </Box>
  );
};

export default SkeletonBox;
