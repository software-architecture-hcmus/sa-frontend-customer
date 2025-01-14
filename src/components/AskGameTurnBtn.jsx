import React, { useState } from 'react'
import Button from './Button'
import apiClient from '../utils/apiClient'
import { message, Modal, Typography } from 'antd'

const AskGameTurnBtn = ({game_id}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [email, setEmail] = useState("");
    
    const showModal = () => {
        setIsModalVisible(true);
    };
    
    const handleOk = async () => {
        try {

            const rs = await apiClient.post('/api/v1/games/request-game-turn', { receiver_email: email, game_id });
            message.success(rs.data.message);
            setIsModalVisible(false);
        }
        catch(e) {
            message.error(e.response.data?.message);
        }
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    
    return (
        <>
            <Button onClick={showModal}>
                <Typography> Ask game turn </Typography>
            </Button>
            <Modal
                title="Enter email"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter email of the player you want to ask" 
                    style={{width: "270px"}}
                />
            </Modal>
        </>
    );
}

export default AskGameTurnBtn