import { Badge, Box, Button, Heading, HStack, Image, Spinner, Text, VStack } from "@chakra-ui/react";
import { useState, type FC } from "react";

import type { IGetCitiesElement } from "@/shared/api/dto";

import { getCityImage } from "./utils";

interface CityCardProps {
  city: IGetCitiesElement;
  onDetailsClick?: (city: IGetCitiesElement) => void;
}

const CityCard: FC<CityCardProps> = ({ city, onDetailsClick }) => {
  const [hasImage, setHasImage] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const currentImage = getCityImage(city);

  const handleImageError = () => {
    setIsImageLoading(false);
    setHasImage(false);
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  return (
    <Box
      overflow="hidden"
      borderWidth="1px"
      borderColor="dividerColor"
      borderRadius="xl"
      shadow="sm"
      transition="transform 0.2s ease, box-shadow 0.2s ease"
      _hover={{ transform: "translateY(-4px)", shadow: "md" }}
    >
      <Box h="164px" bg="gray.100" position="relative">
        {hasImage ? (
          <>
            <Image
              src={currentImage}
              alt={city.name}
              h="full"
              w="full"
              objectFit="cover"
              onError={handleImageError}
              onLoad={handleImageLoad}
              opacity={isImageLoading ? 0 : 1}
              transition="opacity 0.25s ease"
            />

            {isImageLoading ? (
              <VStack
                position="absolute"
                inset={0}
                justify="center"
                bgGradient="linear(to-br, secondary, sidebarBgColor)"
                color="primary"
                gap={2}
              >
                <Spinner size="sm" color="primary" />
                <Text fontSize="xs" letterSpacing="0.1em" textTransform="uppercase" opacity={0.8}>
                  Loading image
                </Text>
              </VStack>
            ) : null}
          </>
        ) : (
          <VStack
            h="full"
            w="full"
            justify="center"
            align="flex-start"
            px={5}
            bgGradient="linear(to-br, secondary, sidebarBgColor)"
            color="primary"
            gap={1}
          >
            <Text fontSize="xs" textTransform="uppercase" letterSpacing="0.18em" opacity={0.7}>
              City preview
            </Text>
            <Heading size="md">{city.name}</Heading>
            <Text fontSize="sm">{city.country}</Text>
          </VStack>
        )}
      </Box>

      <VStack align="stretch" gap={3} p={4}>
        <VStack align="stretch" gap={2}>
          <HStack gap={2} wrap="wrap">
            <Badge colorPalette="blue" variant="subtle">
              {city.country}
            </Badge>
            <Badge colorPalette="green" variant="subtle">
              {city.continent}
            </Badge>
          </HStack>

          <Box>
            <Heading size="sm">{city.name}</Heading>
            <Text color="secondaryFont" fontSize="sm">
              {city.name_native}
            </Text>
          </Box>
        </VStack>

        <Button size="sm" variant="outline" alignSelf="flex-start" onClick={() => onDetailsClick?.(city)}>
          Details
        </Button>
      </VStack>
    </Box>
  );
};

export default CityCard;
