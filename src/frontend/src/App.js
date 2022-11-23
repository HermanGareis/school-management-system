import { useState, useEffect } from 'react'
import { deleteStudent,getAllStudents } from "./client";
import {
    Layout,
    Menu,
    Breadcrumb,
    Table,
    Spin,
    Button,
    Badge,
    Tag,
    Avatar,
    Image,
    Radio,
    Popconfirm, Row, Col
} from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    TeamOutlined,
    LoadingOutlined,
    PlusOutlined, GithubOutlined, LinkedinOutlined,
} from '@ant-design/icons';
import StudentDrawerForm from "./StudentDrawerForm";
import StudentDrawerEditForm from "./StudentDrawerEditForm";

const { Header, Content, Footer, Sider} = Layout;
const { SubMenu } = Menu;

import './App.css';
import {errorNotification, successNotification} from "./Notification";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function App() {

    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState("");
    const [collapsed, setCollapsed] = useState(true);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);
    const [showEditDrawer, setShowEditDrawer] = useState(false);

    const TheAvatar= ({gender}) =>{
        if (gender === "MALE"){
            return <Avatar src={<Image src="https://joeschmoe.io/api/v1/male/jordan" style={{ width: 32 }} />} />
        }
        else return <Avatar src={<Image src="https://joeschmoe.io/api/v1/female/jeane" style={{ width: 32 }} />} />
    }

    const removeStudent = (studentId, callback) => {
        deleteStudent(studentId).then(() => {
            successNotification( "Student deleted", `Student with ID ${studentId} was deleted`);
            callback();
        }).catch(err => {
            err.response.json().then(res => {
                errorNotification(
                    "Oops!",
                    `${res.message} [statusCode: ${res.status}] [${res.error}]`
                )
            });
        });
    }

    const columns = fetchStudents => [
        {
            title: '',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text, student) => <TheAvatar gender={student.gender}/>
        },
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name < b.name,
            sortDirections: ['descend'],
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            filters: [
                {
                    text: 'Male',
                    value: 'MALE',
                },
                {
                    text: 'Female',
                    value: 'FEMALE',
                },
            ],
            onFilter: (value, student) => student.gender.indexOf(value) === 0,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, student) =>
                <Radio.Group>
                    <Popconfirm
                        placement='topRight'
                        title={`Are you sure to delete ${student.name}?`}
                        onConfirm={() => removeStudent(student.id, fetchStudents)}
                        okText='Yes'
                        cancelText='No'>
                        <Button danger value="small">Delete</Button>
                    </Popconfirm>
                    <Button type="primary" onClick={() =>
                        setShowEditDrawer(!showEditDrawer)
                        + setStudent(student)
                    } value="small">Edit
                    </Button>
                </Radio.Group>
        }
    ];

    const fetchStudents = () =>
        getAllStudents()
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setStudents(data);
                setFetching(false);
            }).catch(err => {
            err.response.json().then(res => {
                errorNotification(
                    "Oops!",
                    `${res.message} [statusCode: ${res.status}] [${res.error}]`
                )
            });
        }).finally(() => setFetching(false))

    useEffect(() => {
        fetchStudents().then();
    }, []);

    const renderStudents = () => {
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
                columns={columns(fetchStudents)}
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

    return <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed}
               onCollapse={setCollapsed}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="students" icon={<PieChartOutlined />}>
                    Students
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}>
                    Option 2
                </Menu.Item>
                <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Students:</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    {renderStudents()}
                </div>
            </Content>
            <Footer >
                <Row justify='center'>
                    <Col>
                        <i>By Herman Gareis</i>
                    </Col>
                </Row>
                <Row justify='center'>
                    <Col>
                        <GithubOutlined />
                        <a href="https://github.com/HermanGareis" target="_blank" rel="noopener noreferrer"> GitHub</a>
                    </Col>
                </Row>
                <Row justify='center'>
                    <Col>
                        <LinkedinOutlined />
                        <a href="https://www.linkedin.com/in/hermangareis/" target="_blank" rel="noopener noreferrer"> LinkedIn</a>
                    </Col>
                </Row>
            </Footer>
        </Layout>
    </Layout>
}

export default App;