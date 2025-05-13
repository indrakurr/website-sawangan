import { Box, Text, Timeline, Spinner } from "@chakra-ui/react";
import { LuCheck, LuPackage, LuShip } from "react-icons/lu";
import { useEffect, useState } from "react";
import axios from "axios";

const getStatusIcon = (description) => {
  const lower = description.toLowerCase();
  if (lower.includes("delivered")) return <LuPackage />;
  if (lower.includes("courier")) return <LuShip />;
  if (lower.includes("received")) return <LuCheck />;
  return <LuCheck />;
};

const TrackingOrder = ({ orderId }) => {
  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTracking = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/orders/tracking/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTracking(res.data.data.trackingInfo);
      } catch (err) {
        setError("Gagal mengambil data pelacakan.");
      } finally {
        setLoading(false);
      }
    };
    if (orderId) fetchTracking();
  }, [orderId]);

  if (loading) return <Spinner color="orange.500" size="lg" />;
  if (error) return <Text color="red.500">{error}</Text>;
  if (!tracking || !tracking.history || tracking.history.length === 0)
    return <Text>Tidak ada data pelacakan tersedia.</Text>;

  const history = tracking.history;
  const lastIndex = history.length - 1;

  return (
    <Box w="full">
      <Text
        fontSize={{ base: "16px", lg: "18px" }}
        fontWeight="semibold"
        color="black"
        mb={6}
      >
        Riwayat Pelacakan
      </Text>
      <Timeline.Root size={{base:"lg", lg:"xl"}} variant="solid">
        {history.map((item, index) => {
          const isLast = index === lastIndex;
          const icon = getStatusIcon(item.description);

          return (
            <Timeline.Item key={index}>
              <Timeline.Connector>
                <Timeline.Separator />
                <Timeline.Indicator>{icon}</Timeline.Indicator>
              </Timeline.Connector>
              <Timeline.Content>
                <Timeline.Title fontWeight="medium" color="black" >
                  {item.description}
                </Timeline.Title>
                <Timeline.Description
                  fontSize={{ base: "12px", lg: "16px" }}
                  color="gray.500"
                >
                  {item.date}
                </Timeline.Description>
              </Timeline.Content>
            </Timeline.Item>
          );
        })}
      </Timeline.Root>
    </Box>
  );
};

export default TrackingOrder;
