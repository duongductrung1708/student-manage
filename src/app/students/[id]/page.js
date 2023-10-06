'use client';

import { AppButton } from "@app/components/app-button";
import { studentService } from "@app/services/student.services";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function EditStudent({ params }) {
  console.log(params.id);
  const router = useRouter();
  const [student, setStudent] = useState({
    id: undefined,
    name: "",
    age: "",
    gender: "M",
  });
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!student.name.trim()) {
        alert("Please input name");
        return;
      }
      if (!student.age) {
        alert("Please enter age");
        return;
      }
    } catch (e) {
      alert("Error creating student");
      console.error(e);
    }
  };

  useEffect(() => {
    const findStudent = async () => {
      const student = await studentService.findStudentById(+params.id);
      if (!student) {
        alert("Student not found");
        return;
      }
      setStudent(student);
    }
    findStudent();
  }, []);

  if (!student.id) {
    return <div></div>;
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black to-white text-white">
      <div className="bg-transparent p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Edit Student</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="id" className="block text-sm font-semibold">
              Id
            </label>
            <input
              className="border border-gray-300 px-3 py-2 rounded w-full font-bold text-black"
              type="text"
              name="id"
              id="id"
              value={student.id}
              disabled
            />
          </div>          
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold">
              Name
            </label>
            <input
              className="border border-gray-300 px-3 py-2 rounded w-full font-bold text-black"
              type="text"
              name="name"
              id="name"
              value={student.name}
              onChange={(e) => {
                setStudent({
                  ...student,
                  name: e.target.value,
                });
              }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="block text-sm font-semibold">
              Age
            </label>
            <input
              className="border border-gray-300 px-3 py-2 rounded w-full text-black font-bold"
              id="age"
              name="age"
              type="number"
              value={student.age}
              onChange={(e) => {
                setStudent({
                  ...student,
                  age: +e.target.value,
                });
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Gender</label>
            <div>
              <label htmlFor="rdMale" className="inline-block mr-2">
                <input
                  id="rdMale"
                  name="gender"
                  type="radio"
                  className="mr-2"
                  value="M"
                  checked={student.gender === "M"}
                  onChange={(e) => {
                    setStudent({
                      ...student,
                      gender: e.target.value,
                    });
                  }}
                />
                Male
              </label>
              <label htmlFor="rdFemale" className="inline-block">
                <input
                  id="rdFemale"
                  name="gender"
                  type="radio"
                  className="mr-2"
                  value="F"
                  checked={student.gender === "F"}
                  onChange={(e) => {
                    setStudent({
                      ...student,
                      gender: e.target.value,
                    });
                  }}
                />
                Female
              </label>
            </div>
          </div>
          <AppButton type="submit" color="black">
            Save
          </AppButton>
        </form>
      </div>
    </div>
  );
}