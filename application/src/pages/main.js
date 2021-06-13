import React from 'react';
import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import { Layout, Row }               from 'antd';
import { connect }              from 'react-redux';
import util                     from '../util/util';
import PropTypes                from 'prop-types';
import { Header, Menu, SubHeader, Private as PrivateRoute } from '../component';
import logo from '../images/logo_light.svg';
import '../css/main.scss';

import Signin        from './signin/signin';
import Moments from './moment/moments';
import MomentAdd from './moment/moment.add';

const { Content, Sider } = Layout;

var form = undefined;

const Main = (props) => {
    
    return(
        <Layout style={{height: '100vh', width: '100vw'}}>
            <Sider className="d-sider" trigger={null} collapsible collapsed={false}>
                <Row style={{padding: 24}} justify={"center"} >
                    <img src={logo} />
                </Row>
                <Menu/>
            </Sider>
            <Layout className="site-layout">
                <Header/>
                <SubHeader/>
                <Content
                    className="d-content"
                    style={{
                        padding: 32,
                    }}
                >
                    <Switch>
                
                        <Route exact path="/"> 
                            {props.token != null ? <Redirect to='/moment/ist'/> : <Redirect to='/signin'/>}
                        </Route>

                        <PrivateRoute path="/moment/list" exact component={Moments} />
                        <PrivateRoute path="/moment/add" exact component={MomentAdd} />

                        <Route exact path={["/signin", "/signup"]}> <Signin /> </Route>

                    </Switch>
                </Content>
            </Layout>
        </Layout>
    );
}

Main.propTypes = {
    token: PropTypes.string
};
  
const mapStateToProps = (state) => {
    return {
        token: util.verifyToken(state.profile.token)
    };
};
  
export default connect(mapStateToProps, null)(Main);