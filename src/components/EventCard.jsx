import { Card, Button, Tag, Typography, Space } from "antd";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { EVENT_STATUS, EVENT_STATUS_COLOR } from "../const/Event";

const { Meta } = Card;
const { Text } = Typography;

const getEventStatus = (startDate, endDate) => {
  const now = dayjs();
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  if (now.isBefore(start)) {
    return {
      text: EVENT_STATUS.COMING_SOON,
      color: EVENT_STATUS_COLOR.COMING_SOON,
    };
  } else if (now.isAfter(end)) {
    return {
      text: EVENT_STATUS.ENDED,
      color: EVENT_STATUS_COLOR.ENDED,
    };
  } else {
    return {
      text: EVENT_STATUS.ONGOING,
      color: EVENT_STATUS_COLOR.ONGOING,
    };
  }
};
const EventCard = ({ event, onSubscribe }) => {
  const status = getEventStatus(event.start, event.end);
  return (
    <Card
      hoverable
      cover={
        <img
          alt={event.name }
          src={event.image  || "https://placehold.co/600x400@2x.png"}
          style={{
            height: 150,
            objectFit: "cover",
          }}
        />
      }
      actions={[
        <Button
          type={event.isSubscribed ? "default" : "primary"}
          onClick={() => onSubscribe(event)}
          style={{ width: "90%", visibility: status.text !== EVENT_STATUS.COMING_SOON && "hidden" }}
        >
          {event.isSubscribed ? "Unsubscribe" : "Subscribe"}
        </Button>,
      ]}
      style={{
        width: "100%",
        marginBottom: 16,
      }}
    >
      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        <Meta title={event.name} style={{ marginBottom: 8 }} />

        <Space>
          <CalendarOutlined />
          <Text>
            Start: {dayjs(event.start).format("MMM D, YYYY HH:mm")}
          </Text>
        </Space>
        <Space>
          <CalendarOutlined />
          <Text>
            End: {dayjs(event.end).format("MMM D, YYYY HH:mm")}
          </Text>
        </Space>
        <Tag color={status.color} style={{ marginTop: 8 }}>
          {status.text}
        </Tag>
      </Space>
    </Card>
  );
};
export default EventCard;
