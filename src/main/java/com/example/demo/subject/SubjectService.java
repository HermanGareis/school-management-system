package com.example.demo.subject;


import com.example.demo.student.StudentService;
import com.example.demo.subject.exception.SubjectNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class SubjectService {

    private final SubjectRepository subjectRepository;
    private final StudentService studentService;

    public List<Subject> getAllSubjects(){return subjectRepository.findAll();}

    public Subject getSubjectById(Long subjectId){
        if(!subjectRepository.existsById(subjectId)) {
            throw new SubjectNotFoundException(
                    "Subject with id " + subjectId + " does not exists");
        }
        return subjectRepository.findById(subjectId).get();
    }

    public void addSubject(Subject subject){ subjectRepository.save(subject);}

    public void deleteSubject(Long subjectId) {
        if(!subjectRepository.existsById(subjectId)) {
            throw new SubjectNotFoundException(
                    "Subject with id " + subjectId + " does not exists");
        }
        subjectRepository.deleteById(subjectId);
    }

    public void editSubject(Subject subject){ subjectRepository.save(subject);}

}
