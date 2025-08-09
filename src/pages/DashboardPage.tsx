import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, Clock, Download, Video, CheckCircle } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-secondary py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
            <p className="text-muted-foreground">Here's your learning dashboard</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            {/* <div className="lg:col-span-2 space-y-6">
            
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Upcoming Classes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">React.js Fundamentals</h3>
                      <Badge>Today</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Learn React components and state management</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      7:00 PM - 8:00 PM
                    </div>
                    <Button className="mt-3" size="sm">
                      <Video className="h-4 w-4 mr-2" />
                      Join Class
                    </Button>
                  </div>
                </CardContent>
              </Card>

             
              <Card>
                <CardHeader>
                  <CardTitle>Course Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Frontend Development</span>
                      <Badge variant="secondary">75% Complete</Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Backend Development</span>
                      <Badge variant="secondary">25% Complete</Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div> */}

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Downloads */}
              <Card>
                <CardHeader>
                  <CardTitle>Downloads</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                   <a
      href="/Docs/Full%20Stack%20Curriculum.pdf"
      download
      className="w-full"
    >
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Course Syllabus
                  </Button>
                  </a>
                  {/* <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Project Resources
                  </Button> */}
                  {/* <Button variant="outline" className="w-full justify-start" disabled>
                    <Download className="h-4 w-4 mr-2" />
                    Certificate (In Progress)
                  </Button> */}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}