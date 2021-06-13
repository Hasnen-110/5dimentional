import { ArrowDownOutlined, DownOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Layout, Col, Row, Dropdown, Avatar, Menu } from 'antd';
import {connect } from 'react-redux';
import menu from '../../images/menu.svg';
import '../../css/main.scss';
import { logout } from '../../store/action/profile.action';
const { Header } = Layout;


const DHeader = (props) => {

    const handleLogout = () =>  props.logout();

    
    const MENUITEMS = (
        <Menu>
            <Menu.Item onClick={handleLogout}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Header className="d-header" style={{ padding: 0, zIndex: 1 }}>
            <Row>
            <Col>
                <img src={menu}/>
            </Col>
            <Col flex="auto">
                <Row justify="end" align="middle" wrap={false}>
                    <Col style={{marginRight: 20}}>
                        <Row justify="center" align="middle">
                            <Avatar/>
                            &nbsp;
                            &nbsp;
                            <Dropdown overlay={MENUITEMS} placement="bottomCenter">
                                <DownOutlined/>
                            </Dropdown>
                        </Row>
                    </Col>
                </Row>
            </Col>
            </Row>
        </Header>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(DHeader)