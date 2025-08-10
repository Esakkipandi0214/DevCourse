import React, { useState } from "react";
import { IndianRupee, Pencil,Lock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, Link as RouterLink } from "react-router-dom";
import { useCourses } from "@/contexts/CourseContext";
import EditCourseModal from "./EditCourseModal";
import { useAuth } from "@/contexts/AuthContext";


const truncateDescription = (text, wordLimit) => {
  if (!text) return "";
  const words = text.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return text;
};

interface CourseCard {
  isDashboard?: boolean;
}



export default function MernCourseCard({ isDashboard}:CourseCard){
  const { courses, enrollments, enrollInCourse, loading } = useCourses();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { user, isAdmin } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  const isEnrolled = (courseId) => {
    return enrollments.some(enrollment => enrollment.course_id === courseId);
  };

  const handleEditClick = (course) => {
    setSelectedCourse(course);
    setIsEditModalOpen(true);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {(isDashboard
      ? courses.filter((course) => isEnrolled(course.id)) // show only enrolled courses
      : courses // show all courses
    ).map((course) => {
        const description = truncateDescription(course.description, 20);
        
        return (
          <Card key={course.id} className="w-auto hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="space-y-4">
             {!isDashboard && <div className="flex justify-between items-start">
                <CardTitle className="text-2xl font-bold">{course.title}</CardTitle>
                {(user && isAdmin)&&<Button variant="ghost" size="icon" onClick={() => handleEditClick(course)}>
                  <Pencil className="h-4 w-4" />
                </Button>}
              </div>}
              <div className="flex flex-wrap gap-2">
                {course.tags && course.tags.map((tag, index) => (
                  <Badge key={index} className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                    {tag}
                  </Badge>
                ))}
              </div>
              <CardDescription className="text-base">
                {description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Price</p>
                    <p className="text-2xl font-bold flex justify-center items-center text-blue-600">
                      <IndianRupee size={20} /> {course.price}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 grid">
                 {user ? <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => enrollInCourse(course.id)}
                    disabled={isEnrolled(course.id)}
                  >
                    {isEnrolled(course.id) ? "Enrolled" : "Enroll Now"}
                  </Button>:
                  <div className="text-center bg-muted py-1 rounded-lg">
                                            <Lock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                            
                                            <Link to="/auth">
                                             <p className=" underline text-sm text-muted-foreground mb-4">
                                                Please sign in to enroll in this course.
                                            </p>
                                            </Link>
                                          </div>
                  }
                 {/* {isDashboard ?
                 <RouterLink to={`/Courses/TrackCourse?id=${course.id}`} className="w-full">
                    <Button variant="outline" className="w-full bg-transparent">
                      Track Course
                    </Button>
                  </RouterLink>
                 : } */}
                  <RouterLink to={`/curriculum`} className="w-full">
                    <Button variant="outline" className="w-full bg-transparent">
                      View Curriculum
                    </Button>
                  </RouterLink>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
      <EditCourseModal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        course={selectedCourse}
      />
    </div>
  );
}
