import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Form, Input, Spin, Button, Card, message, Layout } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import logo from '../../images/logo.svg';
import email from '../../images/email.svg';
import lock from '../../images/lock.svg';
import user from '../../images/user.svg';
import india from '../../images/india.svg';
import { login, signup } from '../../store/action/profile.action';
import {
  Redirect, Link, useLocation, useHistory
} from "react-router-dom";
import '../../css/signin.scss'; 
import util from '../../util/util';

const  Signin = (props) => { 

    const location = useLocation();
    const history = useHistory();

    const onFinish = values => {
        props.loginUser(values.email, values.password);
    };

    const onSignup = async (values) => {
        var resp = await props.signupUser({
            ...values,
            phone: "+91" + values.phone
        })
        resp && history.push('/signin');
    };

    var renderForm = () => {
        return (
            <Col>
                <Row className="form-header" justify="center">
                    Sign In
                </Row>
                <Row className="form-sub-header" justify="center">
                    To start using the app
                </Row>
                <Form onFinish={onFinish} layout="vertical" className="form-container" >
                    <Form.Item className="form-item" rules={[{ required: true, type: "email", message: 'Please input your email id!' }]} name="email" label="Enter email id">
                        <Input prefix={<img src={email} />} className="form-input" />
                    </Form.Item>
                    <Form.Item className="form-item" rules={[{ required: true, message: 'Please input your password!' }]} name="password" label="Enter Password ">
                        <Input.Password prefix={<img src={lock} />} className="form-input" />
                    </Form.Item>
                    <Row justify="center">
                    <Form.Item>
                        <Button htmlType="submit" className="form-btn">Sign In</Button>
                    </Form.Item>
                    </Row>
                </Form>
                <Row className="signin-meta" justify="center">
                    <span style={{color: "#545454"}}>Not a member?</span> &nbsp;
                    <Link to={'/signup'}>Sign Up</Link>
                </Row>
            </Col>
        )
    }

    const renderSignUpForm = () => {
        return (
            <Col>
                <Row className="form-header" justify="center">
                    Sign Up
                </Row>
                <Row className="form-sub-header" justify="center">
                    To be a member
                </Row>
                <Form onFinish={onSignup} layout="vertical" className="form-container-signup" >
                    <Row gutter={100}>
                        <Col flex={"50%"}>
                            <Form.Item className="form-item" rules={[{ required: true, message: 'Please input your first!' }]} name="firstname" label="First Name">
                                <Input prefix={<img src={user} />} className="form-input" />
                            </Form.Item>
                        </Col>
                        <Col flex={"50%"}>
                            <Form.Item className="form-item" rules={[{ required: true, message: 'Please input your last name!' }]} name="lastname" label="Last Name">
                                <Input prefix={<img src={user} />} className="form-input" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={100}>
                        <Col flex={"50%"}>
                            <Form.Item className="form-item" rules={[{ required: true, message: 'Please input your mobile no.!' }]} name="phone" label="Mobile No.">
                                <Input prefix={<Row><img src={india} />&nbsp; +91</Row>} className="form-input" />
                            </Form.Item>
                        </Col>
                        <Col flex={"50%"}>
                            <Form.Item className="form-item" rules={[{ required: true, type: "email", message: 'Please input your email id!' }]} name="email" label="Email-ID">
                                <Input prefix={<img src={email} />} className="form-input" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={100}>
                        <Col flex={"50%"}>
                            <Form.Item className="form-item" rules={[{ required: true, message: 'Please input your city!' }]} name="city" label="City">
                                <Input className="form-input" />
                            </Form.Item>
                        </Col>
                        <Col flex={"50%"}>
                            <Form.Item className="form-item" rules={[{ required: true, message: 'Please input your password!' }]} name="password" label="Enter Password ">
                                <Input.Password prefix={<img src={lock} />} className="form-input" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Form.Item>
                            <Button htmlType="submit" className="form-btn">Sign Up</Button>
                        </Form.Item>
                    </Row>
                </Form>
                <Row className="signin-meta" justify="center">
                    <span style={{color: "#545454"}}>Already a member?</span> &nbsp;
                    <Link to={'/signin'}>Sign In</Link>
                </Row>
            </Col>
        )
    }

    return (
        props.token != undefined ?  <Redirect to="/moment/list" /> :
        <>
            <Spin spinning={props.isLoading}>
                <Row className="signin-container">
                    <Col flex={'auto'}>
                        <Row className="logo-row" justify="center">
                            {location.pathname == '/signup' && 
                            <Link to={"/signin"}><ArrowLeftOutlined className="signup-arrow"/></Link>}
                            <img src={logo} />
                        </Row>
                        <Row className="form-row" justify="center">
                            { location.pathname == '/signin' ? renderForm() : renderSignUpForm()}
                        </Row>
                    </Col>
                </Row>
            </Spin>
        </>
    );
};

Signin.propTypes = {
    loginUser: PropTypes.func.isRequired,
    hasError: PropTypes.bool,
    isLoading: PropTypes.bool,
    message : PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        hasError: state.profile.error,
        message: state.profile.message,
        isLoading: state.profile.isLoading,
        token: util.verifyToken(state.profile.token, true),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (username, password) => dispatch(login(username, password)),
        signupUser: (user) => dispatch(signup(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
