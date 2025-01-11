import React from 'react';
import { Row, Col, Card } from 'antd';
import Voucher from "../../components/Voucher";
import apiClient from '../../utils/apiClient';

const CustomerVoucher = () => {

    const [vouchers, setVouchers] = React.useState([]);

    React.useEffect(() => {
        const fetchVouchers = async () => {
            try {
                const response = await apiClient.get('/api/v1/vouchers/customer-voucher');
                setVouchers(response.data.data);
            } catch (error) {
                console.error('Failed to fetch vouchers', error);
            }
        };

        fetchVouchers();
    }, []);

    return (
        <Row gutter={[16, 16]}>
            {vouchers && vouchers.map(voucher => (
                <Col
                    key={voucher.id}
                    xs={12}
                    sm={8}
                    md={6}
                >
                    <Voucher
                        data={{
                            id: voucher.id,
                            image: voucher.voucher.image,
                            description: voucher.voucher.description,
                            expiryDate: voucher.voucher.expiry_date,
                            status: voucher.voucher.status,
                            code: voucher.code
                        }}
                    />
                </Col>
            ))}
        </Row>
    );
}

export default CustomerVoucher;