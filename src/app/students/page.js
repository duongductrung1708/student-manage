"use client";

import { AppButton } from "@app/components/app-button";
import { AppPagination } from "@app/components/app-pagination";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Alert, Snackbar } from "@mui/material";
import { studentBackendService } from "@app/services/student-backend.services";
import "./css/style.css";
import "./css/seach.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { user } from "@app/store/user.model";

export default function Students() {
  const [searchResult, setSearchResult] = useState({
    data: [],
    total: 0,
  });
  const [filters, setFilters] = useState({
    searchTerm: "",
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
  }, [searchTermDebounced]);

  useEffect(() => {
    searchStudents();
  }, [pagination.pageIndex]);

  // const { loaded } = user.state;

  // if (!loaded) {
  //   return (
  //     <main
  //       className="sticky top-0 z-50 min-h-screen text-white p-10"
  //       style={{
  //         background:
  //           "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(83,9,121,1) 49%, rgba(134,0,255,1) 100%);",
  //       }}
  //     >
  //       <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
  //         <div className="animate-pulse flex space-x-4">
  //           <div className="rounded-full bg-slate-700 h-10 w-10"></div>
  //           <div className="flex-1 space-y-6 py-1">
  //             <div className="h-2 bg-slate-700 rounded"></div>
  //             <div className="space-y-3">
  //               <div className="grid grid-cols-3 gap-4">
  //                 <div className="h-2 bg-slate-700 rounded col-span-2"></div>
  //                 <div className="h-2 bg-slate-700 rounded col-span-1"></div>
  //               </div>
  //               <div className="h-2 bg-slate-700 rounded"></div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </main>
  //   );
  // }

  return (
    <>
      <div className="bg-gradient min-h-screen">
        <div className="container mx-auto py-4">
          <div className="text-2xl font-bold text-align-center text-white">
            Students
          </div>
          <section className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
            <div className="w-full flex justify-between">
              <div class="flex items-center w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 mr-2 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  name="name"
                  placeholder="Search"
                  className="w-1/3 py-2 border-b-2 border-blue-400 outline-none focus:border-green-400 bg-transparent"
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
              <div className="">
                <button
                  onClick={createNew}
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    <i class="bi bi-person-add"></i> Add
                  </span>
                </button>
              </div>
            </div>
          </section>
          <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {student.name}
                      </th>
                      <td className="px-6 py-4">{student.age}</td>
                      <td className="px-6 py-4">{student.address}</td>
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
