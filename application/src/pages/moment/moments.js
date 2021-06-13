import { Avatar, Table, Row, Col, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { connect} from 'react-redux';
import { constants } from '../../constants';
import { getMoments } from '../../store/action/moment.action';
import Pencil from '../../images/edit.svg';
import Delete from '../../images/delete.svg';
import '../../css/moment.scss';

const Moments = (props) => {

    const [page, setPage] = useState(1);

    useEffect(() => {
        props.getMoments(props.userid)
    }, []);

    const columns = () => ([
        {
            title: 'Sr.No',
            render: (value, item, index) => (page - 1) * 10 + (index + 1),
            width: "20px"
        },
        {
            title: 'Image',
            dataIndex: 'image',
            render: (image) => <Avatar src={constants.LINK+"/"+image} ></Avatar>
        },
        {
            title: 'Title',
            dataIndex: 'title',
            sorter: (a, b) => a.title.length - b.title.length,
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            sorter: (a, b) => a.tags.length - b.tags.length,
            render: (tags) => (
                <Row gutter={5}>
                    {
                        tags.map((tag) => {
                            return <Col className="moment-tag">
                                {tag}
                            </Col>
                        })
                    }
                </Row>
            )
        },
        {
            title: 'Action',
            align: 'center',
            width: "95px",
            render: () => (
                <>
                <img src={Pencil}/> &nbsp; <img src={Delete} /> 
                </>
            )
        }
    ])

    return (
        <Row className={'moment-container'}>
            <Table
                columns={columns()}
                dataSource={props.moments}
                rowKey={(row) => row._id}
                loading={props.isLoading}
                pagination={{
                    onChange(current) {
                    setPage(current);
                    },
                    showTotal: (total) => "Total moments "+ total,
                    showSizeChanger: true
                }}
            />
        </Row>
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
        getMoments: (userid) => dispatch(getMoments(userid)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Moments);