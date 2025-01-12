import { Card, Button, Tag, Space, Typography } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { Text } = Typography;
const GameCard = (game) => {
  const navigate = useNavigate();
  const type = game?.default_game?.game_type?.id;
  const hanldePlayClick = ()=>{
    if(type ==="QUIZ")
    {
      navigate(`/game/quiz/${game?.id}`)
    }
    if(type ==="FLAPPYBIRD")
    {
      navigate(`/game/flappybird/${game?.id}`)
    }
  }
  return (
    <Card
      size="small"
      className="mb-3"
      style={{ borderRadius: '8px' }}
      actions={[
        <Button 
          key={game.id}
          type="primary" 
          icon={<PlayCircleOutlined />}
          disabled={!game.allow_voucher_exchange || game.status !== 'AVAILABLE'}
          onClick={hanldePlayClick}
        >
          Chơi ngay
        </Button>
      ]}
    >
      <Space align="start">
        {game.image && (
          <img 
            src={game.image} 
            alt={game.name} 
            style={{ 
              width: '60px', 
              height: '60px', 
              objectFit: 'cover',
              borderRadius: '4px' 
            }} 
          />
        )}
        <Space direction="vertical" size="small">
          <Text strong>{game.name}</Text>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {game.instruction}
          </Text>
          <Tag color={game.status === 'AVAILABLE' ? 'green' : 'default'}>
            {game.status}
          </Tag>
        </Space>
      </Space>
    </Card>
  );}
export default GameCard;