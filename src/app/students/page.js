'use client';

import { AppButton } from "@app/components/app-button";
import { studentService } from "@app/services/student.services";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";

export default function Students() {
  const [students, setStudents] = useState([]);
  const router = useRouter();

  const createNew = () => {
    router.push('/students/create');
  };

  useEffect(() => {
    console.log("Student page is mounted");

    const loadStudent = async () => {
      const result = await studentService.findStudents();
      setStudents(result);
    };

    loadStudent();

    return () => {
      console.log("Student page is unmounted");
    };
  }, []);

  console.log("students", students);

  return (
    <div className="bg-gradient-to-r from-black to-white text-white min-h-screen">
      <div className="container mx-auto py-4">
        <div className="text-2xl font-bold">Students</div>
        <AppButton className="mr-2" color="blue" onClick={createNew}>
          Create new
        </AppButton>
        <div>
          {students.map((student) => (
            <div key={student.id} className="border p-2 mt-2 bg-transparent">
              <div>Name: {student.name}</div>
              <div>Age: {student.age}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}