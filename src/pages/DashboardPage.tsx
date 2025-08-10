import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, Clock, Download, Video, CheckCircle } from 'lucide-react';
import MernCourseCard from '@/components/CourseUI/mern-course-card';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-secondary py-8">
      <div className="container ">
        <div className="">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
            <p className="text-muted-foreground">Here's your learning dashboard</p>
          </div>
                  <MernCourseCard isDashboard={true} />
            </div>
      </div>
    </div>
  );
}