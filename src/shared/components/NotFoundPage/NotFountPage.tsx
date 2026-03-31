import { Box, Center } from "@chakra-ui/react";
import { useNavigate } from "@tanstack/react-router";
import { type FC } from "react";
import { IoHome } from "react-icons/io5";

import { EmptyState } from "@/shared/components";
import { NamesOfRoutes } from "@/shared/constants";

const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate({ to: NamesOfRoutes.APP });
  };

  return (
    <Box minH="100vh" w="100%">
      <Center h="100vh">
        <EmptyState
          title="Page Not Found"
          description="Sorry, the page you are looking for doesn't exist or has been moved."
          icon={<IoHome size={48} />}
          actionButton={{
            text: "Go Home",
            variant: "outline",
            onClick: handleGoHome,
          }}
        />
      </Center>
    </Box>
  );
};

export default NotFoundPage;
