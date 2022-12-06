package com.example.demo.teacher;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/teachers")
@AllArgsConstructor
public class TeacherController {

    private final TeacherService teacherService;

    @GetMapping
    public List<Teacher> getAllTeachers() {
        return teacherService.getAllTeachers();
    }

    @PostMapping
    public void addTeacher(@Valid @RequestBody Teacher teacher){ teacherService.addTeacher(teacher);}


    @DeleteMapping(path = "{teacherId}")
    public void deleteTeacher(
            @PathVariable("teacherId") Long teacherId) {
        teacherService.deleteTeacher(teacherId);
    }

    @PutMapping
    public void editTeacher(@Valid @RequestBody Teacher teacher){teacherService.editTeacher(teacher);}
}
