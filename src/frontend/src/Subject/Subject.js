import {Badge, Button, Spin, Table, Tag} from "antd";


const renderSubjects = (subjects, subjectColumns, fetching, antIcon) => {
    if (fetching){
        return <Spin indicator={antIcon}/>;
    }
    return <Table
            dataSource={subjects}
            columns={subjectColumns}
            bordered
            title={() => <>
                <Tag color="blue">Number of subjects:</Tag>
                <Badge showZero={true} count={subjects.length} className="site-badge-count-4"/>
                <br/><br/>
            </>
            }
            pagination={{ pageSize: 10 }}
            scroll={{ y: 600}}
            rowKey={(subject) => subject.id}
        />
}

export default renderSubjects;