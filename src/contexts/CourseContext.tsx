import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { Database } from '@/integrations/supabase/types';

type Course = Database['public']['Tables']['courses']['Row'];
type Enrollment = Database['public']['Tables']['enrollments']['Row'] & { courses: Course | null };

interface CourseContextType {
  courses: Course[];
  enrollments: Enrollment[];
  loading: boolean;
  createCourse: (title: string, description: string, price: number, tags: string[]) => Promise<void>;
  updateCourse: (courseId: string, title: string, description: string, price: number, tags: string[]) => Promise<void>;
  deleteCourse: (courseId: string) => Promise<void>;
  enrollInCourse: (courseId: string) => Promise<void>;
  fetchCourses: () => Promise<void>;
  fetchUserEnrollments: () => Promise<void>;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("courses")
      .select("*");
    if (!error) setCourses(data);
    setLoading(false);
  };

  const fetchUserEnrollments = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("enrollments")
      .select("*, courses(*)")
      .eq("user_id", user.id);
    if (!error) setEnrollments(data as Enrollment[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
    if (user) {
      fetchUserEnrollments();
    }
  }, [user]);

  const createCourse = async (title: string, description: string, price: number, tags: string[]) => {
    const { error } = await supabase
      .from("courses")
      .insert([{ title, description, price, tags }]);
    if (!error) {
      await fetchCourses();
    } else {
      console.error("Error creating course:", error);
    }
  };

  const updateCourse = async (courseId: string, title: string, description: string, price: number, tags: string[]) => {
    const { error } = await supabase
      .from("courses")
      .update({ title, description, price, tags })
      .eq("id", courseId);
    if (!error) {
      await fetchCourses();
    } else {
      console.error("Error updating course:", error);
      throw error;
    }
  };

  const deleteCourse = async (courseId: string) => {
    const { error } = await supabase
      .from("courses")
      .delete()
      .eq("id", courseId);
    if (!error) {
      await fetchCourses();
    } else {
      console.error("Error deleting course:", error);
    }
  };

  const enrollInCourse = async (courseId: string) => {
    if (!user) return;
    const { error } = await supabase
      .from("enrollments")
      .insert([{ user_id: user.id, course_id: courseId }]);
    if (!error) {
      await fetchUserEnrollments();
    } else {
      console.error("Error enrolling in course:", error);
    }
  };

  

  


  return (
    <CourseContext.Provider
      value={{
        courses,
        enrollments,
        loading,
        createCourse,
        updateCourse,
        deleteCourse,
        enrollInCourse,
        fetchCourses,
        fetchUserEnrollments,
        
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourses must be used within a CourseProvider");
  }
  return context;
}
