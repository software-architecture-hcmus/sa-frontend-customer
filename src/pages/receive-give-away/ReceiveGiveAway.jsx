import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import apiClient from '../../utils/apiClient';
import { message } from 'antd';

const ReceiveGiveAway = () => {
    const location = useLocation();
    const [result, setResult] = useState("");

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const ga_token = queryParams.get('ga_token');

        if (ga_token) {
            apiClient.get(`/api/v1/vouchers/accept-voucher`, {
                params: { ga_token }
            })
            .then(response => {
                // setResult(response.data.message);
                message.success(response.data.message);
                setTimeout(() => {
                    window.location.href = '/my-vouchers';
                }, 3000);
            })
            .catch(error => {
                // setResult(error.response.data.message)
                message.error(error.response.data.message);
                setTimeout(() => {
                    window.location.href = '/my-vouchers';
                }, 3000);
            });
        }
    }, [location]);

    return (
        <div>{result}</div>
    )
}

export default ReceiveGiveAway;