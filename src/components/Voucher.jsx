/* eslint-disable */
import { useState } from 'react';
import { Card, Button, Modal, Row, Col, Typography, Input, message } from 'antd';
import { QRCodeSVG } from 'qrcode.react';
import apiClient from '../utils/apiClient';
import VoucherImage from '../assets/voucher.jpg'

const Voucher = ({ data }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isGiveAwayVisible, setIsGiveAwayVisible] = useState(false);
    const [receiverEmail, setReceiverEmail] = useState("");
    const [voucher, setVoucher] = useState(data);
    const [isLoading, setIsLoading] = useState(false);

    const showModal = () => {
        if (voucher.code) {
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
        setIsLoading(true);
        if (!validateEmail(receiverEmail)) {
            message.error('Invalid email address');
            setIsLoading(false);
            return;
        }

        try {
            const res = await apiClient.post('/api/v1/vouchers/give-away', {
                customer_voucher_id: voucher.id,
                receiver_email: receiverEmail,
            })
            setIsLoading(false);
            message.success("send give away email success")
            setIsGiveAwayVisible(false);
        }
        catch (e) {
            setIsLoading(false);
            message.error(e.response.data.message);
        }
        setIsLoading(false);

    }

    const handleGiveAwayCancel = () => {
        setIsGiveAwayVisible(false);
    }

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    const handleUseVoucher = async () => {
        try {
            const res = await apiClient.post('/api/v1/vouchers/use-customer-voucher', {
                customer_voucher_id: voucher.id,
            });
            setVoucher({
                ...voucher,
                code: res.data.data.voucher.code
            })
            message.success("Voucher used successfully");
        } catch (e) {
            message.error(e.response.data.message);
        }
    }

    return (
        <>
            <Card hoverable onClick={showModal}>
                <Row gutter={[16, 16]} style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img 
                            src={voucher.image || VoucherImage} 
                            alt="Voucher" 
                            onError={(e) => { e.target.onerror = null; e.target.src = VoucherImage; }} 
                            style={{ width: '100%', height: 'auto' }} 
                        />
                    </Col>
                    <Col style={{ textAlign: 'center', marginTop: 16 }}>
                        <Typography>
                            <p>{voucher.description}</p>
                            <p>Expiry Date: {voucher.expiryDate}</p>
                            <p>Status: {voucher.status}</p>
                        </Typography>
                    </Col>
                    {voucher.code === null && (
                        <Col style={{ marginTop: 16 }}>
                            <Button type="primary" style={{ marginRight: 8 }} onClick={handleUseVoucher}>Use</Button>
                            <Button type="default" onClick={handleGiveAway}>Give Away</Button>
                        </Col>
                    )}
                    {voucher.code && (
                        <Typography>
                            <p><strong>{voucher.code}</strong></p>
                        </Typography>
                    )}
                </Row>
            </Card>

            <Modal title="Voucher Details" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} cancelButtonProps={{ style: { display: 'none' } }}>
                <Row gutter={[16, 16]} style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <Col style={{ marginBottom: 16 }}>
                        <QRCodeSVG value={voucher.code} size={128} />
                    </Col>
                    <Col style={{ textAlign: 'center' }}>
                        <p>{voucher.description}</p>
                        <p>Expiry Date: {voucher.expiryDate}</p>
                        <p>Status: {voucher.status}</p>
                    </Col>
                </Row>
            </Modal>

            <Modal title="Give Away" open={isGiveAwayVisible} onCancel={handleGiveAwayCancel} onOk={handleGiveAwaySubmit} okButtonProps={{ disabled: isLoading }}>
                <Typography>
                    Enter the email of the user you want to send
                </Typography>
                <Input value={receiverEmail} onChange={(e) => setReceiverEmail(e.target.value)} />
            </Modal>
        </>
    );
};

export default Voucher;
