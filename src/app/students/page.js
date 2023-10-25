"use client";

import { AppButton } from "@app/components/app-button";
import { AppPagination } from "@app/components/app-pagination";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Alert, Snackbar } from "@mui/material";
import { studentBackendService } from "@app/services/student-backend.services";
export default function Students() {
  const [searchResult, setSearchResult] = useState({
    data: [],
    total: 0,
  });
  const [filters, setFilters] = useState({
    searchTerm: "",
    gender: "",
  });
  const [searchTermDebounced] = useDebounce(filters.searchTerm, 300);
  const [pagination, setPagination] = useState({
    itemsPerPage: 5,
    pageIndex: 0,
  });

  const [alertState, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({
      open: false,
      message: "",
      severity: "success",
    });
  };

  const router = useRouter();
  const createNew = () => {
    router.push("/students/create");
  };

  const editStudent = (id) => {
    router.push(`/students/${id}`);
  };

  const getGender = (value) => {
    if (value === "M") {
      return "Male";
    }
    if (value === "F") {
      return "Female";
    }
    return "";
  };

  const searchStudents = async () => {
    try {
      const result = await studentBackendService.findStudents(
        filters,
        pagination
      );
      setSearchResult(result);
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  };

  const confirmDelete = async (student) => {
    try {
      if (
        !window.confirm(`Are you sure to delete student "${student.name}"?`)
      ) {
        return;
      }
      await studentBackendService.deleteStudent(student.id);
      alert("Delete success");
      searchStudents();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  };

  useEffect(() => {
    setPagination({
      ...pagination,
      pageIndex: 0,
    });
    searchStudents();
  }, [filters.gender, searchTermDebounced]);

  useEffect(() => {
    searchStudents();
  }, [pagination.pageIndex]);

  return (
    <>
      <div className="bg-gradient-to-r from-black to-white text-white min-h-screen">
        <div className="container mx-auto py-4">
          <div className="text-2xl font-bold text-align-center">Students</div>
          <section class="flex items-center w-full">
            <div class="w-full">
              <div class="relative bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                <div class="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                  <div class="w-full md:w-1/2">
                    <form class="flex items-center">
                      <label for="simple-search" class="sr-only">
                        Search
                      </label>
                      <div class="relative w-full">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg
                            aria-hidden="true"
                            class="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewbox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          id="simple-search"
                          class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Search"
                          required=""
                          value={filters.searchTerm}
                          onChange={(e) => {
                            setFilters({
                              ...filters,
                              searchTerm: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </form>
                  </div>
                  <div class="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                    <AppButton
                      onClick={createNew}
                      type="button"
                      class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-gray-800 hover:bg-gray-800 focus:ring-4 focus:ring-primary-300 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-primary-800"
                    >
                      <svg
                        class="h-3.5 w-3.5 mr-2"
                        fill="currentColor"
                        viewbox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        />
                      </svg>
                      Add Student
                    </AppButton>
                    {/* <div className="mb-4">
                      <label className="block text-sm font-semibold">
                        Gender
                      </label>
                      <div>
                        <label htmlFor="rdAll" className="inline-block mr-2">
                          <input
                            id="rdAll"
                            name="gender"
                            type="radio"
                            className="mr-2"
                            value=""
                            checked={filters.gender === ""}
                            onChange={(e) => {
                              setFilters({
                                ...filters,
                                gender: e.target.value,
                              });
                            }}
                          />
                          All
                        </label>
                        <label htmlFor="rdMale" className="inline-block mr-2">
                          <input
                            id="rdMale"
                            name="gender"
                            type="radio"
                            className="mr-2"
                            value="M"
                            checked={filters.gender === "M"}
                            onChange={(e) => {
                              setFilters({
                                ...filters,
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
                            checked={filters.gender === "F"}
                            onChange={(e) => {
                              setFilters({
                                ...filters,
                                gender: e.target.value,
                              });
                            }}
                          />
                          Female
                        </label>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">
                        Age{" "}
                        <a href="#">
                          <svg
                            className="w-3 h-3 ml-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              className="text-white"
                              d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"
                            />
                          </svg>
                        </a>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <div className="flex items-center">
                        Address{" "}
                        <a href="#">
                          <svg
                            class="w-3 h-3 ml-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              className="text-white"
                              d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"
                            />
                          </svg>
                        </a>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3" colSpan={2}>
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {searchResult.data.map((student) => (
                    <tr
                      key={student.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {student.name}
                      </th>
                      <td className="px-6 py-4">{student.age}</td>
                      <td className="px-6 py-4">{getGender(student.gender)}</td>
                      <td className="px-6 py-4">
                        <AppButton
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => confirmDelete(student)}
                        >
                          Delete
                        </AppButton>
                      </td>
                      <td className="px-6 py-4">
                        <AppButton
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => editStudent(student.id)}
                        >
                          Edit
                        </AppButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <AppPagination
              {...pagination}
              total={searchResult.total}
              setPageIndex={(newPageIndex) => {
                setPagination({
                  ...pagination,
                  pageIndex: newPageIndex,
                });
              }}
            />
          </div>
        </div>
        {alertState.open && (
          <Snackbar
            open={alertState.open}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={alertState.severity}
              sx={{ width: "100%" }}
            >
              {alertState.message}
            </Alert>
          </Snackbar>
        )}
      </div>
    </>
  );
}
