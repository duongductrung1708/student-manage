let students = [];

if (typeof window !== "undefined") {
    students = JSON.parse(localStorage.getItem("students")) || [];
}

const findStudents = async () => {
    return students;
};

const findStudentById = (id) => {
    alert("findStudentById");
};

const createStudent = async (student) => {
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
};

const updateStudent = (id, student) => {
    alert("updateStudent");
};

const deleteStudent = (id) => {
    alert("deleteStudent");
};

export const studentService = {
    findStudents,
    findStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
};