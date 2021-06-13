import { Spin, Button, Row, Col, Form, Input, Select, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { connect} from 'react-redux';
import { constants } from '../../constants';
import { addMoments, getMoments } from '../../store/action/moment.action';
import '../../css/moment.scss';
import { useHistory, useLocation } from 'react-router';
import util from '../../util/util';
import { CloseOutlined } from '@ant-design/icons';
import UploadImage from '../../images/upload.svg';
import Mock from '../../images/image.svg';
import moment from 'moment';

var form = undefined;

const MomentsForm = (props) => {

    const [image, setImage] = useState({name: undefined, base64: undefined});

    useEffect(() =>  initializeForm(), []);
    var location = useLocation();
    var history = useHistory();

    var initializeForm = () => {
        if (location.state) {
            var {title, tags, image, _id} = location.state;
            setImage({name: image, base64: constants.LINK+"/"+image});
            form.setFieldsValue({...location.state});
        } 
    }

    var handleChange = info => {
        if (info.file.status === 'done')
            util.getBase64(info.file.originFileObj, image => setImage({name: moment.utc().valueOf()+info.file.originFileObj.name, base64: image}));
        console.log(moment.utc().valueOf());
    };

    function handleSelectChange(value) {
        console.log(`selected ${value}`);
    }

    var handleSubmit = async (value) => {
        var momet = {
            ...value,
            image: image.name,
            base64: image.base64
        }
        var response = await props.addMoment(momet, props.userid);
        if (!response) return;
        history.push('/moment/list');
    }

    const uploadButton = (
        <div className="uploadText">
            <p className="ant-upload-drag-icon">
                <img src={UploadImage} />
            </p>
            <p>Drag and drop file</p>
            <p style={{color: "#001B30"}} className="ant-upload-text"><b>OR</b></p>
            <Button className="d-button" shape="round" type="primary">
                Browse
            </Button>
        </div>
    );

    return (
        <Spin spinning={props.isLoading}>
            <Row className={'moment-container'}>
            <Form ref={e => form = e} onFinish={handleSubmit} layout="vertical" className="form-container">
                <Row>
                    <Form.Item style={{width: '100%'}} className="form-item" label="Title" name="title" rules={[{required: true, message: 'Please enter title'}]}>
                        <Input className="form-input" style={{width: '100%'}} />
                    </Form.Item>
                </Row>
                <Row gutter={10} wrap={false}>
                    <Col flex={"50%"}>
                        <Row>
                            <Form.Item style={{width: '100%'}} className="form-item" label="Tags" name="tags" rules={[{required: true, message: 'Please enter title'}]}>
                                <Select mode="tags" style={{ width: '100%' }} onChange={handleSelectChange}>
                                </Select>
                            </Form.Item>
                        </Row>      
                        <Row hidden={!image.name} style={{marginBottom: 8}}>Uploaded</Row>
                        <Row gutter={10} wrap={false} hidden={!image.name} align="middle">
                            <Col>
                            <img src={Mock} /> 
                            </Col>
                            <Col>
                                {image.name}
                            </Col>
                            <Col>
                                <CloseOutlined onClick={() => setImage({name: undefined, base64: undefined})} />
                            </Col>
                        </Row>
                    </Col>
                    <Col flex={"50%"}>
                        <Form.Item className="form-item" required name="image" rules={[{ required: true, message: 'Please upload your image'}]}>
                            <Upload.Dragger 
                                accept="image/*"
                                listType="picture-card" 
                                showUploadList={false}
                                onChange={handleChange}
                                customRequest={({ file, onSuccess }) =>  setTimeout(() => onSuccess("ok"), 0)}
                            >
                                {uploadButton}
                            </Upload.Dragger>
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify="center">
                    <Form.Item >
                        <Button style={{color: 'white'}} htmlType="submit" shape="round" size="large" className="d-button">
                            Submit
                        </Button>
                    </Form.Item>
                </Row>
            </Form>
        </Row>
        </Spin>
    )
}

const mapStateToProps = (state) => {
    return {
        moments: state.moment.moments,
        userid: state.profile?.user?._id,
        isLoading: state.profile.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {  
    return {
        getMoments: (userid) => dispatch(getMoments(userid)),
        addMoment: (ment, userid) => dispatch(addMoments(ment, userid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MomentsForm);