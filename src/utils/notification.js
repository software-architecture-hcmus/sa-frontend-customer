import { message } from "antd";

export const successNotification = (str) => {
    message.success(str);
}

export const errorNotification = (str) => {
    message.error(str);
}

export const infoNotification = (str) => {
    message.info(str);
}
