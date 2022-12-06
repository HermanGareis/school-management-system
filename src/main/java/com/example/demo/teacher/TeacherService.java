package com.example.demo.teacher;


import com.example.demo.student.Student;
import com.example.demo.student.exception.StudentNotFoundException;
import com.example.demo.teacher.exception.TeacherNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class TeacherService {

    private final TeacherRepository teacherRepository;

    public List<Teacher> getAllTeachers(){
        return teacherRepository.findAll();
    }

    public Teacher getTeacherById(Long teacherId){
        if(!teacherRepository.existsById(teacherId)) {
            throw new TeacherNotFoundException(
                    "Teacher with id " + teacherId + " does not exists");
        }
        return teacherRepository.findById(teacherId).get();
    }

    public void addTeacher(Teacher teacher){
        teacherRepository.save(teacher);
    }

    public void deleteTeacher(Long teacherId) {
        if(!teacherRepository.existsById(teacherId)) {
            throw new TeacherNotFoundException(
                    "Teacher with id " + teacherId + " does not exists");
        }
        teacherRepository.deleteById(teacherId);
    }

    public void editTeacher(Teacher teacher){ teacherRepository.save(teacher); }
}
