import { MenuFoldOutlined } from '@ant-design/icons';
import { Layout, Row } from 'antd';
import {connect } from 'react-redux';
import menu from '../../images/menu.svg';
import '../../css/main.scss';
import { useLocation } from 'react-router';
const { Header } = Layout;

const DHeader = (props) => {

    const location = useLocation();

    return (
        <Header className="d-header" style={{ padding: 0 }}>
            <Row className="sub-header">
                { location.pathname == "/moment/list" ? "Moments" : "Add new moment"}
            </Row>
        </Header>
    )
}

export default connect()(DHeader)