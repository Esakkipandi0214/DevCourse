import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Calendar, Award } from 'lucide-react';

export default function TrainerPage() {
  return (
    <div className="min-h-screen bg-gradient-secondary">
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">Meet Your Trainer</Badge>
              <h1 className="text-4xl font-bold mb-6">Learn from Industry <span className="text-gradient">Expert</span></h1>
            </div>
            
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                <div className="text-center">
                  <div className="w-48 h-48 bg-gradient-primary rounded-full mx-auto mb-6 flex items-center justify-center text-white text-6xl font-bold">
                    RK
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Rajesh Kumar</h2>
                  <p className="text-primary font-semibold mb-4">Senior Full Stack Developer</p>
                  <div className="flex justify-center text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">4.9/5 Rating from 200+ Students</p>
                </div>
                
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">About</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Rajesh is a passionate full stack developer with over 5 years of experience in building 
                      scalable web applications. He has worked with top tech companies and specializes in 
                      React.js, Node.js, and modern web technologies. His teaching approach focuses on 
                      practical learning and real-world application development.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Experience</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <Award className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <p className="font-semibold">Senior Developer at TechCorp</p>
                          <p className="text-sm text-muted-foreground">2020 - Present</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <Award className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <p className="font-semibold">Full Stack Developer at StartupXYZ</p>
                          <p className="text-sm text-muted-foreground">2018 - 2020</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {['React.js', 'Node.js', 'JavaScript', 'MongoDB', 'Express.js', 'Next.js', 'Python', 'Java'].map((skill) => (
                        <Badge key={skill} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}