import { Card, Typography, Space } from 'antd';
import { GiftOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Text } = Typography;
const formatDate = (date) => moment(date).format('DD/MM/YYYY');
const VoucherCard = (voucher) => (
    <Card 
      size="small" 
      className="mb-4"
      style={{ background: '#f5f5f5', borderRadius: '8px' }}
    >
      <Space direction="vertical" size="small">
        <Text strong>Phần thưởng:</Text>
        <Space>
          <GiftOutlined />
          <Text>{voucher.value} points</Text>
        </Space>
        <Text type="secondary">Hết hạn: {formatDate(voucher.expiry_date)}</Text>
        <Text type="secondary">{voucher.description}</Text>
      </Space>
    </Card>
);

export default VoucherCard;
