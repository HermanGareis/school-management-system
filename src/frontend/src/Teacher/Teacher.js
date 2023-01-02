import {Badge, Spin, Table, Tag} from "antd";

const renderTeachers = (teachers, teachersColumns, fetching, antIcon) => {
    if (fetching){
        return <Spin indicator={antIcon}/>;
    }
    return <Table
        dataSource={teachers}
        columns={teachersColumns}
        bordered
        title={() => <>
            <Tag color="blue">Number of teachers:</Tag>
            <Badge showZero={true} count={teachers.length} className="site-badge-count-4"/>
            <br/><br/>
        </>
        }
        pagination={{ pageSize: 10 }}
        scroll={{ y: 600}}
        rowKey={(teacher) => teacher.id}
    />
}

export default renderTeachers;