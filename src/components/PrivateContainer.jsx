import Header from "./Header";
import { Layout } from "antd";
const { Content } = Layout;

const PrivateContainer = ({ children }) => {
    return (
        <>
            <Header />
            <Layout>
                {/* add Sidebar here later */}
                <Content>{children}</Content>
            </Layout>
        </>
    );
}

export default PrivateContainer;
