import React, { useState, useEffect } from 'react';
import { useCourses } from '@/contexts/CourseContext';

const CourseListPage = () => {
  const { courses, fetchCourses } = useCourses();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleCourseClick = async (course) => {
    setSelectedCourse(course);
    // const enrollmentsData = await fetchEnrollmentsForCourse(course.id);
    // setEnrollments(enrollmentsData);
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/3 p-4 bg-gray-50">
        <h2 className="text-xl font-bold mb-4">Courses</h2>
        {courses.length === 0 ? (
          <p>No courses found.</p>
        ) : (
          <ul>
            {courses.map((course) => (
              <li key={course.id} className="mb-2">
                <button
                  onClick={() => handleCourseClick(course)}
                  className="w-full text-left p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {course.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="w-2/3 p-4 bg-white">
        {selectedCourse ? (
          <>
            <h2 className="text-xl font-bold mb-4">Enrolled Users for {selectedCourse.title}</h2>
            {enrollments.length === 0 ? (
              <p>No users enrolled.</p>
            ) : (
              <ul>
                {enrollments.map((enrollment) => (
                  <li key={enrollment.id} className="mb-2 p-2 bg-gray-100 rounded">
                    {enrollment.profiles?.full_name || 'Unknown User'}
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p>Select a course to view enrolled users.</p>
        )}
      </div>
    </div>
  );
};

export default CourseListPage;
