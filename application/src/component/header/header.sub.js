import { MenuFoldOutlined } from '@ant-design/icons';
import { Layout, Row } from 'antd';
import {connect } from 'react-redux';
import menu from '../../images/menu.svg';
import '../../css/main.scss';
const { Header } = Layout;

const DHeader = (props) => {
    return (
        <Header className="d-header" style={{ padding: 0 }}>
            <Row className="sub-header">
                Moments
            </Row>
        </Header>
    )
}

export default connect()(DHeader)