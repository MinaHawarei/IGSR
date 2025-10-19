import React, { useState } from "react";
import AppLayout from '@/layouts/app-layout'
import { Head, Link, router } from '@inertiajs/react'
import type { BreadcrumbItem } from '@/types'
import { DataTable, type Column } from '@/components/data/data-table'
import ActionButtons from '@/components/actions/action-buttons'
import PermissionGate from '@/components/permissions/permission-gate'
import { Button } from '@/components/ui/button'
import { usePage } from '@inertiajs/react'


interface Course {
  id: number;
  name: string;
}
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'courses', href: '/courses' },
]

interface Program {
  id: number;
  name: string;
  courses: Course[];
  activeCourses: Course[];
}

interface Department {
  id: number;
  name: string;
  programs: Program[];
}

interface CoursesDashboardProps {
  departments?: Department[]; // optional to avoid crash
}

export default function CoursesDashboard({ departments = [] }: CoursesDashboardProps) {
  const [currentView, setCurrentView] = useState<
    "departments" | "programs" | "courses" | "active"
  >("departments");

  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const goBack = () => {
    if (currentView === "active" || currentView === "courses") {
      setCurrentView("programs");
    } else if (currentView === "programs") {
      setCurrentView("departments");
      setSelectedDepartment(null);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>

    <div className="min-h-screen transition-colors duration-300">
      {currentView !== "departments" && (
        <button
          onClick={goBack}
          className="mb-6 px-5 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          ← Back
        </button>
      )}

      {/* ===== Departments View ===== */}
      {currentView === "departments" && (
        <div>
          <h2 className="text-3xl font-semibold mb-6">Departments</h2>
          {departments.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No departments found.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dep) => (
                <div
                  key={dep.id}
                  className="p-5 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-xl cursor-pointer transition transform hover:-translate-y-1"
                  onClick={() => {
                    setSelectedDepartment(dep);
                    setCurrentView("programs");
                  }}
                >
                  <h3 className="text-xl font-medium mb-1">{dep.name}</h3>
                  <p className="text-sm opacity-75">
                    {dep.programs?.length || 0} Programs
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ===== Programs View ===== */}
      {currentView === "programs" && selectedDepartment && (
        <div>
          <h2 className="text-3xl font-semibold mb-6">
            {selectedDepartment.name} — Programs
          </h2>

          {selectedDepartment.programs?.length ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedDepartment.programs.map((prog) => (
                <div
                  key={prog.id}
                  className="p-5 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-xl cursor-pointer transition transform hover:-translate-y-1"
                  onClick={() => {
                    setSelectedProgram(prog);
                    setCurrentView("courses");
                  }}
                >
                  <h3 className="text-lg font-medium mb-1">{prog.name}</h3>
                  <p className="text-sm opacity-75">
                    {prog.courses?.length || 0} Courses
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No programs found for this department.
            </p>
          )}
        </div>
      )}

      {/* ===== Courses / Choose View ===== */}
{currentView === "courses" && selectedProgram && (
  <div>
    <h2 className="text-3xl font-semibold mb-6">{selectedProgram.name}</h2>

    {/* ===== Quick Actions ===== */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* All Courses */}
      <div
        onClick={() => router.visit(`/courses-dashboard/all/${selectedProgram.id}/courses`)}
        className="group p-6 bg-blue-100 dark:bg-blue-900 rounded-2xl shadow-md hover:shadow-lg cursor-pointer transition transform hover:-translate-y-1 hover:bg-blue-200 dark:hover:bg-blue-800"
      >
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
          All Courses
        </h3>
        <p className="text-sm text-blue-700 dark:text-blue-300 opacity-80">
          View and manage all courses within this program.
        </p>
      </div>


      {/* Active Courses */}
      <div
        onClick={() => router.visit(`/programs/${selectedProgram.id}/active-courses`)}
        className="group p-6 bg-green-100 dark:bg-green-900 rounded-2xl shadow-md hover:shadow-lg cursor-pointer transition transform hover:-translate-y-1 hover:bg-green-200 dark:hover:bg-green-800"
      >
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
          Active Courses
        </h3>
        <p className="text-sm text-green-700 dark:text-green-300 opacity-80">
          View all active courses currently available in this program.
        </p>
      </div>



      {/* Manage Offerings */}
      <div
        onClick={() => router.visit(`/programs/${selectedProgram.id}/offerings`)}
        className="group p-6 bg-purple-100 dark:bg-purple-900 rounded-2xl shadow-md hover:shadow-lg cursor-pointer transition transform hover:-translate-y-1 hover:bg-purple-200 dark:hover:bg-purple-800"
      >
        <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-2">
          Manage Offerings
        </h3>
        <p className="text-sm text-purple-700 dark:text-purple-300 opacity-80">
          Add or update course offerings for upcoming semesters.
        </p>
      </div>

      {/* Enrollments */}
      <div
        onClick={() => router.visit(`/programs/${selectedProgram.id}/enrollments`)}
        className="group p-6 bg-amber-100 dark:bg-amber-900 rounded-2xl shadow-md hover:shadow-lg cursor-pointer transition transform hover:-translate-y-1 hover:bg-amber-200 dark:hover:bg-amber-800"
      >
        <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-2">
          Enrollments
        </h3>
        <p className="text-sm text-amber-700 dark:text-amber-300 opacity-80">
          View and manage student enrollments across active courses.
        </p>
      </div>

      {/* Grades */}
      <div
        onClick={() => router.visit(`/programs/${selectedProgram.id}/grades`)}
        className="group p-6 bg-indigo-100 dark:bg-indigo-900 rounded-2xl shadow-md hover:shadow-lg cursor-pointer transition transform hover:-translate-y-1 hover:bg-indigo-200 dark:hover:bg-indigo-800"
      >
        <h3 className="text-lg font-semibold text-indigo-800 dark:text-indigo-200 mb-2">
          Grades
        </h3>
        <p className="text-sm text-indigo-700 dark:text-indigo-300 opacity-80">
          Review and update student grades for this program.
        </p>
      </div>
    </div>
  </div>
)}

    </div>

    </AppLayout>
  );
}
