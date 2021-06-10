import { Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import '../../css/main.scss';


const DMenu = (props) => {

    var location = useLocation(); 

    const [currentLocation, setLocation] = useState();

    useEffect(() => {
        setLocation(location);
        console.log(location);
    } , [location])

    var currentMenuKey = (key) => {
        if (location.pathname.search(key) >= 0) {
          return location.pathname;
        }else{
          return key;
        }
    }

    return (
        <Menu className="d-menu" mode="inline" selectedKeys={[location.pathname]} defaultSelectedKeys={[location.pathname]}>
            <Menu.Item key={'/profile'}  disabled >Profile</Menu.Item>
            <Menu.SubMenu key={currentMenuKey("/moment")} title="Moments">
                <Menu.Item key={currentMenuKey("/moment/list")}><Link to={"/moment/list"}>Moment List</Link></Menu.Item>
                <Menu.Item key={currentMenuKey("/moment/add")}><Link tp={"/moment/add"} >Add new moment</Link></Menu.Item>
            </Menu.SubMenu>
        </Menu>
    );
}

export default connect()(DMenu);