import { Badge, Box, Dialog, Grid, Heading, HStack, Image, Separator, Text, VStack } from "@chakra-ui/react";
import { useState, type FC } from "react";

import type { IGetCitiesElement } from "@/shared/api/dto";

import InfoItem from "./components/InfoItem";
import { getCityImage } from "../CityCard/utils/getImageKey";

interface CityDetailsModalProps {
  city: IGetCitiesElement;
}

const CityDetailsModal: FC<CityDetailsModalProps> = ({ city }) => {
  const [hasImage, setHasImage] = useState(true);
  const currentImage = getCityImage(city);

  const coordinates = `${city.latitude}, ${city.longitude}`;
  const formattedPopulation = new Intl.NumberFormat("en-US").format(Number(city.population) || 0);
  const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(`${city.latitude},${city.longitude}`)}`;

  return (
    <Dialog.Content maxW="880px" w="calc(100vw - 32px)" borderRadius="2xl" overflow="hidden" p={0}>
      <Box h={{ base: "220px", md: "320px" }} bg="gray.100">
        {hasImage ? (
          <Image
            src={currentImage}
            alt={city.name}
            h="full"
            w="full"
            objectFit="cover"
            onError={() => setHasImage(false)}
          />
        ) : (
          <VStack
            h="full"
            w="full"
            justify="center"
            align="flex-start"
            px={{ base: 6, md: 10 }}
            bgGradient="linear(to-br, secondary, headerBgColor)"
            color="primary"
            gap={2}
          >
            <Text fontSize="sm" textTransform="uppercase" letterSpacing="0.18em" opacity={0.7}>
              City preview
            </Text>
            <Heading size="2xl">{city.name}</Heading>
            <Text fontSize="lg">{city.country}</Text>
          </VStack>
        )}
      </Box>

      <Dialog.Body p={{ base: 5, md: 8 }}>
        <VStack align="stretch" gap={6}>
          <VStack align="stretch" gap={3}>
            <HStack gap={2} wrap="wrap">
              <Badge colorPalette="blue" variant="subtle">
                {city.country}
              </Badge>
              <Badge colorPalette="green" variant="subtle">
                {city.continent}
              </Badge>
            </HStack>

            <Box>
              <Dialog.Title asChild>
                <Heading size="xl">{city.name}</Heading>
              </Dialog.Title>
              <Text color="secondaryFont" fontSize="md">
                Native name: {city.name_native}
              </Text>
            </Box>
          </VStack>

          {city.description && (
            <>
              <Text color="secondaryFont" lineHeight="1.7">
                {city.description}
              </Text>
              <Separator />
            </>
          )}

          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={5}>
            <InfoItem label="Country" value={city.country} />
            <InfoItem label="Continent" value={city.continent} />
            <InfoItem label="Population" value={formattedPopulation} />
            <InfoItem label="Founded" value={city.founded} />
            <InfoItem label="Coordinates" value={coordinates} href={googleMapsUrl} />
          </Grid>

          <Separator />

          <VStack align="stretch" gap={3}>
            <Heading size="sm">Landmarks</Heading>
            {city.landmarks.length ? (
              <HStack gap={2} wrap="wrap">
                {city.landmarks.map((landmark) => (
                  <Badge key={landmark} variant="outline" px={3} py={1} borderRadius="full">
                    {landmark}
                  </Badge>
                ))}
              </HStack>
            ) : (
              <Text color="secondaryFont">No landmarks available.</Text>
            )}
          </VStack>
        </VStack>
      </Dialog.Body>
    </Dialog.Content>
  );
};

export default CityDetailsModal;
