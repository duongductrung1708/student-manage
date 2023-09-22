let students = [];

if (typeof window !== "undefined") {
    students = JSON.parse(localStorage.getItem("students")) || [];
}

const findStudents = async (filters, pagination) => {
    let filteredStudents = students;
    const searchTerm = filters.searchTerm?.trim().toLowerCase();
    if (filters.searchTerm.trim()) {
        filteredStudents = filteredStudents.filter((s) => 
            s.name.toLowerCase().includes(searchTerm)
        );
    }
    if (filters.gender) {
        filteredStudents = filteredStudents.filter(
            (s) => s.gender === filters.gender
        );
    }
    const paginatedStudents = filteredStudents.filter((_, index) => {
        const startIndex = pagination.pageIndex * pagination.itemsPerPage;
        const endIndex = startIndex + pagination.itemsPerPage - 1;
        return index >= startIndex && index < endIndex;
    });
    return {
        data: filteredStudents,
        total: paginatedStudents.length,
    };
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