import React, { useState, useEffect, useCallback } from 'react';
import { useCourses } from '@/contexts/CourseContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

type Course = {
  id: string | number;
  title: string;
};

type CourseListProps = {
  courses: Course[];
  onCourseClick: (course: Course) => void;
};

const CourseList = React.memo(({ courses, onCourseClick }: CourseListProps) => (
  <div className="w-1/3 p-4 bg-gray-50">
    <h2 className="text-xl font-bold mb-4">Courses</h2>
    {courses.length === 0 ? (
      <p>No courses found.</p>
    ) : (
      <ul>
        {courses.map((course) => (
          <li key={course.id} className="mb-2">
            <button
              onClick={() => onCourseClick(course)}
              className="w-full text-left p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {course.title}
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
));

type EnrolledUsersProps = {
  selectedCourse: Course | null;
  courseUsers: { id: string | number; full_name?: string; phone?: string | null ; user_id?:string; }[];
};

const EnrolledUsers = React.memo(({ selectedCourse, courseUsers }: EnrolledUsersProps) => (
  <div className="w-2/3 p-4 bg-white">
    {selectedCourse ? (
      <>
        <h2 className="text-xl font-bold mb-4">Enrolled Users for {selectedCourse.title}</h2>
        {courseUsers.length === 0 ? (
          <p>No users enrolled.</p>
        ) : (
          <div>
            {courseUsers.map((user) => (
              <div key={user.id} className="mb-2 flex-1 gap-2 p-2 bg-gray-100 rounded">
                <p>Name : {user.full_name || 'Unknown User'}</p>
                <p>Contact: {user.phone || "--"}</p>
              </div>
            ))}
          </div>
        )}
      </>
    ) : (
      <p>Select a course to view enrolled users.</p>
    )}
  </div>
));

const UserManagement = React.memo(({ allUsers, onMakeAdmin }: { allUsers: any[]; onMakeAdmin: (id: string) => void }) => (
  <div className="w-full p-4 bg-white">
    <h2 className="text-xl font-bold mb-4">User Management</h2>
    {allUsers.length === 0 ? (
      <p>No users found.</p>
    ) : (
      <ul>
        {allUsers.map((user) => (
          <li key={user.id} className="mb-2 p-2 bg-gray-100 rounded flex justify-between items-center">
            <div>
              <span className="font-semibold">{user.full_name || 'Unknown User'}</span> — {user.phone || '--'}  
              <span className={`ml-2 px-2 py-1 text-xs rounded ${user.is_admin ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
                {user.is_admin ? 'Admin' : 'User'}
              </span>
            </div>
            {!user.is_admin && (
              <button
                onClick={() => onMakeAdmin(user.id)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Make Admin
              </button>
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
));


const CourseListPage = () => {
  const { courses, fetchCourses, fetchCourseEnrollments, courseUsers } = useCourses();
  const { allUsers, fetchAllUsers, setAdmin,user, isAdmin } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [viewMode, setViewMode] = useState<'courses' | 'users'>('courses');
  const navigate = useNavigate();

  // Optional: Redirect non-admins
  useEffect(() => {
    if (!isAdmin) navigate('/dashboard');
  }, [isAdmin, navigate]);

  useEffect(() => {
    if (viewMode === 'courses') {
      fetchCourses();
    } else {
      fetchAllUsers();
    }
  }, [viewMode, fetchCourses, fetchAllUsers]);

  const handleCourseClick = useCallback(
    async (course: Course) => {
      setSelectedCourse(course);
      await fetchCourseEnrollments(course.id);
    },
    [fetchCourseEnrollments]
  );

  const handleMakeAdmin = async (userId: string) => {
    const { error } = await setAdmin(userId);
    if (!error) {
      alert('User promoted to admin!');
      fetchAllUsers(); // refresh list if you want to show admin flag later
    }
  };
 
//  console.log("courseUsers:", courseUsers);
 
  return (
    <div className="flex flex-col min-h-screen">
      {/* Toggle Buttons */}
      <div className="flex gap-4 p-4 bg-gray-200">
        <button
          onClick={() => setViewMode('courses')}
          className={`px-4 py-2 rounded ${viewMode === 'courses' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          Course Enrollments
        </button>
        <button
          onClick={() => setViewMode('users')}
          className={`px-4 py-2 rounded ${viewMode === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          User Management
        </button>
      </div>

      {/* Main Content */}
      {viewMode === 'courses' ? (
        <div className="flex flex-1">
          <CourseList courses={courses} onCourseClick={handleCourseClick} />
          <EnrolledUsers selectedCourse={selectedCourse} courseUsers={courseUsers} />
        </div>
      ) : (
        <UserManagement allUsers={allUsers} onMakeAdmin={handleMakeAdmin} />
      )}
    </div>
  );
};

export default CourseListPage;
