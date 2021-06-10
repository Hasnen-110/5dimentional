import { Table } from 'antd';
import { connect} from 'react-redux';

const Moments = (props) => {

    const columns = () => ([
        {
            title: 'Sr.No',
        },
        {
            title: 'Image',
            dataIndex: 'image'
        },
        {
            title: 'Title',
            dataIndex: 'title',
            sorter: true,
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            sorter: true,
        },
        {
            title: 'Action',
            align: 'center',
            width: "95px"
        }
    ])

    return (
        <Table
            columns={columns()}
        />
    )
}

export default connect()(Moments);