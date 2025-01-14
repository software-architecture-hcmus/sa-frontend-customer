import React from 'react'
import Button from './Button'
import { Typography } from 'antd'
import apiClient from '../utils/apiClient'
import { message } from 'antd'

const ShareToFacebook = ({ game_id }) => {
    console.log(game_id);

    const handleOnClick = async (event) => {
        try {
            event.preventDefault();
            const rs = await apiClient.post("/api/v1/games/share-to-facebook",{ game_id });
            message.success(rs.data.message);
            window.open("https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fhelpdesk.dev.jarvis.cx%2F&amp;src=sdkpreparse", "_blank")
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <Button onClick={handleOnClick} style={{ marginRight: "5px", backgroundColor: "Blue" }} data-href="https://helpdesk.dev.jarvis.cx/" data-layout="" data-size="">
            <Typography style={{ color: "white" }}>Share to facebook</Typography>
        </Button>
    )
}

export default ShareToFacebook