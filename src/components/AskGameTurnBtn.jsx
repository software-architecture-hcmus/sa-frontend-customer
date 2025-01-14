import React, { useState } from 'react'
import Button from './Button'
import apiClient from '../utils/apiClient'
import { message, Modal } from 'antd'

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
                hello
            </Button>
            <Modal
                title="Enter your email"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter your email" 
                />
            </Modal>
        </>
    );
}

export default AskGameTurnBtn