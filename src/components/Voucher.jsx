/* eslint-disable */
import { useState } from 'react';
import { Card, Button, Modal, Row, Col, Typography, Input, message } from 'antd';
import { QRCodeSVG } from 'qrcode.react';
import apiClient from '../utils/apiClient';

const Voucher = ({ voucher_id, image, description, expiryDate, status, code = null }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isGiveAwayVisible, setIsGiveAwayVisible] = useState(false);
    const [receiverEmail, setReceiverEmail] = useState("");

    const showModal = () => {
        if (code) {
            setIsModalVisible(true);
        }
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleGiveAway = (e) => {
        e.stopPropagation();
        setIsGiveAwayVisible(true);
    }

    const handleGiveAwaySubmit = async () => {
        if (!validateEmail(receiverEmail)) {
            message.error('Invalid email address');
            return;
        }

        try {
            const res = await apiClient.post('/api/v1/vouchers/give-away', {
                customer_voucher_id: voucher_id,
                receiver_email: receiverEmail,
            })
            message.success("send give away email success")
            setIsGiveAwayVisible(false);
        }
        catch(e) {
            message.error(e.response.data.message);
        }
    }

    const handleGiveAwayCancel = () => {
        setIsGiveAwayVisible(false);
    }

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    return (
        <>
            <Card hoverable onClick={showModal}>
                <Row gutter={[16, 16]} style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={image} alt="Voucher" style={{ width: '100%', height: 'auto' }} />
                    </Col>
                    <Col style={{ textAlign: 'center', marginTop: 16 }}>
                        <Typography>
                            <p>{description}</p>
                            <p>Expiry Date: {expiryDate}</p>
                            <p>Status: {status}</p>
                        </Typography>
                    </Col>
                    <Col style={{ marginTop: 16 }}>
                        <Button type="primary" style={{ marginRight: 8 }}>Use</Button>
                        <Button type="default" onClick={handleGiveAway}>Give Away</Button>
                    </Col>
                </Row>
            </Card>

            <Modal title="Voucher Details" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} cancelButtonProps={{style: {display: 'none'}}}>
                <Row gutter={[16, 16]} style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <Col style={{ marginBottom: 16 }}>
                        <QRCodeSVG value={code} size={128} />
                    </Col>
                    <Col style={{ textAlign: 'center' }}>
                        <p>{description}</p>
                        <p>Expiry Date: {expiryDate}</p>
                        <p>Status: {status}</p>
                    </Col>
                </Row>
            </Modal>
            
            <Modal title="Give Away" open={isGiveAwayVisible} onCancel={handleGiveAwayCancel} onOk={handleGiveAwaySubmit}>
                <Typography>
                    Enter the email of the user you want to send
                </Typography>
                <Input value={receiverEmail} onChange={(e) => setReceiverEmail(e.target.value)} />
            </Modal>
        </>
    );
};

export default Voucher;
