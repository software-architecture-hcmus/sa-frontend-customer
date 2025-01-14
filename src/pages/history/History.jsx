import { Typography, Table, Tabs, Button, message } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import apiClient from '../../utils/apiClient'
import UserContext from '../../contexts/UserContext';
import AskGameTurnBtn from '../../components/AskGameTurnBtn';

const History = () => {
    const [transactions, setTransactions] = useState([]);
    const [requestTurns, setRequestTurns] = useState([]);

    const user = useContext(UserContext);

    useEffect(() => {
        const fetchTransaction = async () => {
            const rs = await apiClient.get('/api/v1/history/ga-voucher');
            const filteredTransactions = rs.data.map(transaction => ({
                ...transaction,
                createdAt: new Date(transaction.createdAt).toLocaleDateString()
            }));
            setTransactions(filteredTransactions);
        }

        const fetchRequestTurn = async () => {
            const rs = await apiClient.get('/api/v1/history/ga-request-turn');
            const filteredRequestTurns = rs.data.map(requestTurn => ({
                ...requestTurn,
                createdAt: new Date(requestTurn.createdAt).toLocaleDateString()
            }));
            setRequestTurns(filteredRequestTurns);
        }

        fetchTransaction();
        fetchRequestTurn();
    }, [])

    const vouchersTable = <Table
        dataSource={transactions}
        columns={[
            {
                title: 'Sender Name',
                dataIndex: 'sender_name',
                key: 'sender_name',
            },
            {
                title: 'Receiver Name',
                dataIndex: 'receiver_name',
                key: 'receiver_name',
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: 'Created At',
                dataIndex: 'createdAt',
                key: 'createdAt',
            },
        ]}
    />

    const handleAccept = async (record) => {
        console.log(record);
        try {
            const rs = await apiClient.post('/api/v1/games/accept-game-turn', {
                request_turn_id: record.id,
                sender_id: record.sender_id,
            })
            message.success(rs.data.message);
        }
        catch (e) {
            message.error(e.response.data?.message)
        }
    }

    const handleReject = async (record) => {
        try {
            const rs = await apiClient.post('/api/v1/games/reject-game-turn', {
                request_turn_id: record.id,
                sender_id: record.sender_id,
            })
            message.success(rs.data.message);
        }
        catch (e) {
            message.error(e.response.data?.message)
        }

    }

    const RequestTurnsTable = <Table
        dataSource={requestTurns}
        columns={[
            {
                title: 'Sender Name',
                dataIndex: 'sender_name',
                key: 'sender_name',
            },
            {
                title: 'Receiver Name',
                dataIndex: 'receiver_name',
                key: 'receiver_name',
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: 'Created At',
                dataIndex: 'createdAt',
                key: 'createdAt',
            },
            {
                title: 'Action',
                key: 'action',
                render:
                    (text, record) => (
                        record.status === 'PENDING' && record.sender_id != user.uid ? (
                            <>
                                <Button type="primary" onClick={() => handleAccept(record)}>Accept</Button>
                                <Button type="danger" style={{ border: "solid 1px", marginLeft: "1px" }} onClick={() => handleReject(record)}>Reject</Button>
                            </>
                        ) : null
                    )
            }
        ]}
    />


    const items = [
        {
            key: '1',
            label: 'Vouchers GA',
            children: vouchersTable,
        },
        {
            key: '2',
            label: 'Game Turns GA',
            children: RequestTurnsTable,
        },
    ];

    return (
        <>
            <Tabs defaultActiveKey='1' items={items} />
            <div class="fb-share-button" data-href="https://helpdesk.dev.jarvis.cx/" data-layout="" data-size=""><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fhelpdesk.dev.jarvis.cx%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Chia sẻ</a></div>
            <AskGameTurnBtn game_id={"ed54df4c-2583-469b-8ac8-249663be2bb3"} />
        </>
    )
}

export default History