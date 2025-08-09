import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Target, Users, Trophy } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              About Our Course
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Transform Your Career with 
              <span className="text-gradient block">Full Stack Development</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Our Full Stack Developer Evening Batch is meticulously designed for working professionals 
              and students who aspire to build a successful career in web development. Learn industry-standard 
              technologies through hands-on projects and real-world applications.
            </p>
          </div>
        </div>
      </section>

      {/* Course Goals */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Course Goals & Objectives</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Master Modern Technologies</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Learn the latest frontend and backend technologies including React.js, Node.js, 
                    Express.js, and modern databases used by top companies.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Build Real Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Create industry-standard projects including e-commerce websites, portfolio sites, 
                    and blog applications that showcase your skills to employers.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Career Transition</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Successfully transition from your current role to a full stack developer position 
                    with our comprehensive curriculum and career guidance.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Our Course Stands Out</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Evening Batch Timing</h3>
                    <p className="text-muted-foreground">
                      Classes start after 7 PM, perfect for working professionals who want to upskill 
                      without disrupting their current job.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Industry-Experienced Trainer</h3>
                    <p className="text-muted-foreground">
                      Learn from experienced professionals who have worked in top tech companies 
                      and understand industry requirements.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Hands-on Learning Approach</h3>
                    <p className="text-muted-foreground">
                      Every concept is taught through practical implementation. Build real projects 
                      while learning each technology.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Small Batch Size</h3>
                    <p className="text-muted-foreground">
                      Limited students per batch ensure personalized attention and better 
                      interaction with the instructor.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Lifetime Support</h3>
                    <p className="text-muted-foreground">
                      Get lifetime access to course recordings and continued support even after 
                      course completion.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Affordable Pricing</h3>
                    <p className="text-muted-foreground">
                      High-quality education at just ₹800 for the complete 2-month course, 
                      making it accessible to everyone.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-primary rounded-lg p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Course Outcome</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">1</span>
                    </div>
                    <span>Build 3 complete full-stack applications</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">2</span>
                    </div>
                    <span>Create a professional developer portfolio</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">3</span>
                    </div>
                    <span>Gain confidence to apply for developer roles</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">4</span>
                    </div>
                    <span>Receive a certificate of completion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Should Join */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Who Should Join This Course?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="text-left">
                <CardHeader>
                  <CardTitle>Working Professionals</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Want to transition to tech industry</li>
                    <li>• Looking to upskill for better opportunities</li>
                    <li>• Need flexible evening class timings</li>
                    <li>• Seeking practical, hands-on learning</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="text-left">
                <CardHeader>
                  <CardTitle>Students & Graduates</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Computer science or related field students</li>
                    <li>• Recent graduates seeking job-ready skills</li>
                    <li>• Anyone passionate about web development</li>
                    <li>• Looking to build a strong portfolio</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}