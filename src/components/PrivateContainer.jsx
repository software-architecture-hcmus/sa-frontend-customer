import Header from "./Header";
import { Layout } from "antd";
const { Content } = Layout;

const PrivateContainer = ({ children, title }) => {
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
