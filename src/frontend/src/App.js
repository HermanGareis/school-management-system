import { useState, useEffect } from 'react'
import {deleteStudent, getAllStudents, getAllSubjects, deleteSubject, getAllTeachers, deleteTeacher} from "./client";
//import {renderSubjects} from "./subject"
import { Route, Routes, Link } from "react-router-dom";
import {
    Layout,
    Menu,
    Table,
    Spin,
    Button,
    Badge,
    Tag,
    Avatar,
    Image,
    Radio,
    Popconfirm,
    Row,
    Col,
    Select, Dropdown
} from 'antd';
import {
    TeamOutlined,
    LoadingOutlined,
    PlusOutlined, GithubOutlined, LinkedinOutlined, CopyOutlined, UserOutlined,
} from '@ant-design/icons';
import StudentDrawerForm from "./Student/StudentDrawerForm";
import StudentDrawerEditForm from "./Student/StudentDrawerEditForm";

const { Header, Content, Footer, Sider} = Layout;


import './App.css';
import {errorNotification, successNotification} from "./Notification";
import renderSubjects from "./Subject/Subject";
import renderStudents from "./Student/Student";
import renderTeachers from "./Teacher/Teacher";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function App() {

    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState("");
    const [collapsed, setCollapsed] = useState(true);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);
    const [showEditDrawer, setShowEditDrawer] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [teachers, setTeachers] = useState([]);



    const TheAvatar = ({name}) => {
        let trim = name.trim();
        if (trim.length === 0) {
            return <Avatar icon={<UserOutlined/>}/>
        }
        const split = trim.split(" ");
        if (split.length === 1) {
            return <Avatar>{name.charAt(0)}</Avatar>
        }
        return <Avatar>
            {`${name.charAt(0)}${name.charAt(name.length - 1)}`}
        </Avatar>
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


    const TheSubjects = ({subjects}) => {
        if (subjects.length === 0){
            return <p>None</p>
        }
        return <Dropdown
            overlay={
                <Menu>
                    {subjects.map(subject => (
                        <Menu.Item key={subject.name}>{subject.name}</Menu.Item>
                    ))}
                </Menu>
            }
        >
            <a>Enrolled</a>
        </Dropdown>

    }


    const studentColumns = fetchStudents => [
        {
            title: '',
            dataIndex: 'avatar',
            key: 'avatar',
            width: 100,
            render: (text, student) =>
                <TheAvatar name={student.name}/>
        },
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            width: 80,
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
            title: 'Subjects',
            dataIndex: 'subjects',
            key: 'subjects',
            render: (text, student) => <TheSubjects subjects={student.subjects}/>
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





    const removeSubject = (subjectId) => {
        deleteSubject(subjectId).then(() => {
            successNotification( "Subject deleted", `Subject with ID ${subjectId} was deleted`);
            fetchSubjects();
            fetchStudents();
        }).catch(err => {
            err.response.json().then(res => {
                errorNotification(
                    "Oops!",
                    `${res.message} [statusCode: ${res.status}] [${res.error}]`
                )
            });
        });
    }

    const TheTeacher= ({teacher}) =>{
        if(teacher === null){
            return <p>Not Assigned</p>
        }
        else{
            return <p>{teacher.name}</p>
        }
    }

    const subjectColumns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            width: 80,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name < b.name,
            sortDirections: ['descend'],
        },
        {
            title: 'Teacher',
            dataIndex: 'teacher',
            key: 'teacher',
            render: (text, subject) => <TheTeacher teacher={subject.teacher}/>

        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, subject) =>
                <Radio.Group>
                    <Popconfirm
                        placement='topRight'
                        title={`Are you sure to delete ${subject.name}?`}
                        onConfirm={() => removeSubject(subject.id)}
                        okText='Yes'
                        cancelText='No'>
                        <Button danger value="small">Delete</Button>
                    </Popconfirm>
                </Radio.Group>
        }
    ]

    const fetchSubjects = () =>
        getAllSubjects()
            .then(res => res.json())
            .then(data => {
                setSubjects(data);
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
        fetchSubjects().then();
    }, []);





    const removeTeacher = (teacherId) => {
        deleteTeacher(teacherId).then(() => {
            successNotification( "Teacher deleted", `Teacher with ID ${teacherId} was deleted`);
            fetchSubjects();
            fetchTeachers();
        }).catch(err => {
            err.response.json().then(res => {
                errorNotification(
                    "Oops!",
                    `${res.message} [statusCode: ${res.status}] [${res.error}]`
                )
            });
        });
    }


    const teacherColumns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            width: 80,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name < b.name,
            sortDirections: ['descend'],
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, teacher) =>
                <Radio.Group>
                    <Popconfirm
                        placement='topRight'
                        title={`Are you sure to delete ${teacher.name}?`}
                        onConfirm={() => removeTeacher(teacher.id)}
                        okText='Yes'
                        cancelText='No'>
                        <Button danger value="small">Delete</Button>
                    </Popconfirm>
                </Radio.Group>
        }
    ]



    const fetchTeachers = () =>
        getAllTeachers()
            .then(res => res.json())
            .then(data => {
                setTeachers(data);
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
        fetchTeachers().then();
    }, []);




    return <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed}
               onCollapse={setCollapsed}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="home" icon={<TeamOutlined />}>
                    <Link to=" ">
                        <span className="nav-text">Students</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="subjects" icon={<CopyOutlined />}>
                    <Link to="/subjects">
                        <span className="nav-text">Subjects</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="teachers" icon={<UserOutlined />}>
                    <Link to="/teachers">
                        <span className="nav-text">Teachers</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    <Routes>
                        <Route path="/" element={renderStudents(students, studentColumns, fetching, antIcon, showDrawer, setShowDrawer, fetchStudents, showEditDrawer, setShowEditDrawer, student)}/>
                        <Route path="/subjects" element={renderSubjects(subjects,subjectColumns,fetching,antIcon)}/>
                        <Route path="/teachers" element={renderTeachers(teachers,teacherColumns,fetching,antIcon)}/>
                    </Routes>
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