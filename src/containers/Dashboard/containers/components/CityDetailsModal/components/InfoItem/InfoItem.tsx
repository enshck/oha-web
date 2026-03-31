import { Link, Text, VStack } from "@chakra-ui/react";
import { type FC } from "react";
import { LuExternalLink } from "react-icons/lu";

interface InfoItemProps {
  label: string;
  value: string;
  href?: string;
}

const InfoItem: FC<InfoItemProps> = ({ label, value, href }) => (
  <VStack align="stretch" gap={1}>
    <Text fontSize="xs" textTransform="uppercase" letterSpacing="0.14em" color="secondaryFont">
      {label}
    </Text>
    {href ? (
      <Link
        href={href}
        target="_blank"
        rel="noreferrer"
        color="primary"
        fontWeight="medium"
        display="inline-flex"
        alignItems="center"
        gap={2}
      >
        {value}
        <LuExternalLink />
      </Link>
    ) : (
      <Text fontWeight="medium" color="secondaryFont">
        {value}
      </Text>
    )}
  </VStack>
);

export default InfoItem;
