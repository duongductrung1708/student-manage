'use client';

import { AppButton } from "@app/components/app-button";
import { studentService } from "@app/services/student.services";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { AppPagination } from "@app/components/app-pagination";

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
  
  const router = useRouter();
  const createNew = () => {
    router.push('/students/create');
  };

  const getGender = (value) => {
    if (value === 'M') {
      return "Male";
    }
    if (value === 'F') {
      return "Female";
    }
    return "";
  };

  const searchStudents = async () => {
    const result = await studentService.findStudents(filters, pagination);
    setSearchResult(result);
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
    <div className="bg-gradient-to-r from-black to-white text-white min-h-screen">
      <div className="container mx-auto py-4">
        <div className="text-2xl font-bold">Students</div>
        <AppButton className="mr-2" color="blue" onClick={createNew}>
          Create new
        </AppButton>
        <div>
          <div>
            <div className="text-lg font-bold">Search students</div>
          </div>
          <div>
            <input 
            name="searchTerm" 
            className="border bg-transparent" 
            value={filters.searchTerm} 
            onChange={(e) => {
              setFilters({
                ...filters,
                searchTerm: e.target.value,
              });
            }}
          />
          </div> 
          <div className="mb-4">
            <label className="block text-sm font-semibold">Gender</label>
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
          </div>       
          {searchResult.data
          .map((student) => (
            <div key={student.id} className="border p-2 mt-2 bg-transparent">
              <div>Name: {student.name}</div>
              <div>Age: {student.age}</div>
              <div>Gender: {getGender(student.gender)}</div>
            </div>
          ))}
          <AppPagination 
            {...pagination} 
            total={searchResult.total} 
            setPageIndex={(newPageIndex) => {
              setPagination({
                ...pagination,
                pageIndex: newPageIndex,
              })
            }
          }
        />
        </div>
      </div>
    </div>
  );
}