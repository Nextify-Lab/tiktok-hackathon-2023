// pages/SomePage.tsx

import { Button, useDisclosure } from "@chakra-ui/react";
import BottomSheet from "@/components/GroupBuyFlow/BottomSheet";

const SomePage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button onClick={onOpen}>Open Bottom Sheet</Button>

      <BottomSheet isOpen={isOpen} onClose={onClose} title="Your Title Here">
        {/* Content for the bottom sheet */}
        Put your content here. This could be buttons, text, or any other
        components you wish to include in the bottom sheet.
      </BottomSheet>
    </div>
  );
};

export default SomePage;
