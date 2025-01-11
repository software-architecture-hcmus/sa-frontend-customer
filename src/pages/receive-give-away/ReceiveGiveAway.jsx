import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import apiClient from '../../utils/apiClient';

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
                setResult(response.data.message)
            })
            .catch(error => {
                setResult(error.response.data.message)
            });
        }
    }, [location]);

    return (
        <div>{result}</div>
    )
}

export default ReceiveGiveAway;