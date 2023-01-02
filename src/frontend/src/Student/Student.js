import {Badge, Button, Spin, Table, Tag} from "antd";
import StudentDrawerForm from "./StudentDrawerForm";
import StudentDrawerEditForm from "./StudentDrawerEditForm";
import {PlusOutlined} from "@ant-design/icons";


const renderStudents = (students, studentColumns, fetching, antIcon, showDrawer, setShowDrawer, fetchStudents, showEditDrawer, setShowEditDrawer, student) => {
    if (fetching){
        return <Spin indicator={antIcon}/>;
    }
    return <>
        <StudentDrawerForm
            showDrawer={showDrawer}
            setShowDrawer={setShowDrawer}
            fetchStudents={fetchStudents}
        />
        <StudentDrawerEditForm
            showDrawer={showEditDrawer}
            setShowDrawer={setShowEditDrawer}
            student={student}
            fetchStudents={fetchStudents}
        />
        <Table
            dataSource={students}
            columns={studentColumns(fetchStudents)}
            bordered
            title={() => <>
                <Tag color="blue">Number of students:</Tag>
                <Badge showZero={true} count={students.length} className="site-badge-count-4"/>
                <br/><br/>
                <Button
                    onClick={() => setShowDrawer(!showDrawer)}
                    type="primary" shape="round" icon={<PlusOutlined />} size="small">
                    Add New Student
                </Button>
            </>
            }
            pagination={{ pageSize: 10 }}
            scroll={{ y: 600}}
            rowKey={(student) => student.id}
        />
    </>
}

export default renderStudents;