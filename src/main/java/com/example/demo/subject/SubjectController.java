package com.example.demo.subject;


import com.example.demo.student.Student;
import com.example.demo.student.StudentService;
import com.example.demo.teacher.Teacher;
import com.example.demo.teacher.TeacherService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/subjects")
@AllArgsConstructor
public class SubjectController {

    private final SubjectService subjectService;
    private final StudentService studentService;
    private final TeacherService teacherService;

    @GetMapping
    public List<Subject> getAllSubjects(){return subjectService.getAllSubjects();}

    @PostMapping
    public void addSubject(@Valid @RequestBody Subject subject){subjectService.addSubject(subject);}

    @DeleteMapping(path = "{subjectId}")
    public void deleteSubject(
        @PathVariable("subjectId") Long subjectId) {
            subjectService.deleteSubject(subjectId);
    }

    @PutMapping
    public void editSubject(@Valid @RequestBody Subject subject){subjectService.editSubject(subject); }


    @PutMapping("/{subjectId}/students/{studentId}")
    public void enrollStudentToSubject(
            @PathVariable Long subjectId, @PathVariable Long studentId
    ){
        Subject subject = subjectService.getSubjectById(subjectId);
        Student student = studentService.getStudentById(studentId);
        subject.enrollStudent(student);
        subjectService.addSubject(subject);
    }

    @PutMapping("/{subjectId}/teacher/{teacherId}")
    public void assignTeacherToSubject(
            @PathVariable Long subjectId, @PathVariable Long teacherId
    ){
        Teacher teacher = teacherService.getTeacherById(teacherId);
        Subject subject = subjectService.getSubjectById(subjectId);
        subject.assignTeacher(teacher);
        subjectService.addSubject(subject);
    }

    @DeleteMapping("/{subjectId}/students/{studentId}")
    public void unEnrollStudentToSubject(
            @PathVariable Long subjectId, @PathVariable Long studentId
    ){
        Subject subject = subjectService.getSubjectById(subjectId);
        Student student = studentService.getStudentById(studentId);
        subject.deleteEnrolledStudent(student);
        subjectService.addSubject(subject);
    }

    @DeleteMapping("/{subjectId}/teacher")
    public void unAssignTeacherToSubject(
            @PathVariable Long subjectId
    ){
        Subject subject = subjectService.getSubjectById(subjectId);
        subject.deleteAssignedTeacher();
        subjectService.addSubject(subject);
    }

}
