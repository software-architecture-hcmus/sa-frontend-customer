import { Card, Typography, List, Space, Divider } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, GiftOutlined } from '@ant-design/icons';
import GameCard from '../../../components/GameCard';
import VoucherCard from '../../../components/VoucherCard';
import moment from 'moment';
const { Title, Text } = Typography;

const EventDetail = ({ event, games }) => {
  const formatDate = (date) => moment(date).format('DD/MM/YYYY');
  const formatTime = (date) => moment(date).format('HH:mm');
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '16px' }}>
      <Card bordered={false}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Event Header */}
          <div>
            <Title level={3}>{event.name}</Title>
            <Space split={<Divider type="vertical" />}>
              <Space>
                <CalendarOutlined />
                <Text>{formatDate(event.start)} - {formatDate(event.end)}</Text>
              </Space>
              <Space>
                <ClockCircleOutlined />
                <Text>{formatTime(event.start)}</Text>
              </Space>
            </Space>
          </div>

          {/* Voucher Section */}
          <div>
            <Title level={4}>Phần thưởng sự kiện</Title>
            {event?.vouchers?.map((voucher) => (
              <div key={voucher.id}>
                {VoucherCard(voucher)}
              </div>
            ))}
          </div>

          {/* Games Section */}
          <div>
        <Title level={4}>Danh sách trò chơi</Title>
            {games && games.length > 0 ? (
              <List
                dataSource={games}
                renderItem={GameCard}
                style={{ width: '100%' }}
              />
            ) : (
              <p>Không có trò chơi nào.</p>
            )}
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default EventDetail;