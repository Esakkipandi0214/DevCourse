import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  DollarSign, 
  User, 
  Briefcase, 
  Video, 
  Users, 
  Award,
  Clock,
  HeartHandshake,
  Target,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

export default function WhyChooseUsPage() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Affordable Pricing",
      description: "Premium quality education at just ₹1000 for the complete 2-month course. Best value in the market for full stack development training.",
      features: [
        "Complete course for just ₹1000",
        "No hidden charges or additional fees",
        "payment after first class",
        "Best value for money in the industry"
      ]
    },
    {
      icon: User,
      title: "Experienced Trainer",
      description: "Learn from industry professionaly experienced techies. Real-world insights and practical knowledge.",
      features: [
        "Industry veteran trainer",
        "Expert in modern technologies",
        "Personalized mentoring approach"
      ]
    },
    {
      icon: Briefcase,
      title: "Real-world Projects",
      description: "Build three complete full-stack applications that you can showcase in your portfolio to potential employers.",
      features: [
        "E-commerce website project",
        "Professional portfolio site",
        "Blog application with CMS",
        "Industry-standard code quality"
      ]
    },
    {
      icon: Video,
      title: "Lifetime Recording Access",
      description: "Get lifetime access to all class recordings so you can revisit concepts anytime and learn at your own pace.",
      features: [
        "Lifetime access to recordings",
        "Quality video content",
        "Mobile-friendly platform",
      ]
    },
    {
      icon: Users,
      title: "Small Batch Size",
      description: "Limited to 15 students per batch ensuring personal attention, better interaction, and customized guidance for each student.",
      features: [
        "Maximum 15 students per batch",
        "Personal attention guaranteed",
        "Interactive learning environment",
        "Peer-to-peer learning opportunities"
      ]
    },
    {
      icon: Clock,
      title: "Perfect Timing",
      description: "Evening classes from 7-8 PM designed specifically for working professionals and students with day-time commitments.",
      features: [
        "7:00 PM - 8:00 PM timing",
        "Monday to Friday schedule",
        "Weekend doubt clearing sessions",
        "Flexible makeup classes"
      ]
    }
  ];

  const additionalBenefits = [
    // {
    //   icon: Award,
    //   title: "Certificate of Completion",
    //   description: "Industry-recognized certificate upon successful completion of the course."
    // },
    {
      icon: HeartHandshake,
      title: "Lifetime Support",
      description: "Get continued support and guidance even after course completion."
    },
    // {
    //   icon: Target,
    //   title: "Job Assistance",
    //   description: "Resume building, interview preparation, and job placement assistance."
    // },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Skills and knowledge to advance your career in tech industry."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Why Choose Us
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Why Our Course is
              <span className="text-gradient block">Perfect for You</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Discover what makes our Full Stack Developer Evening Batch the ideal choice 
              for working professionals and students who want to excel in web development.
            </p>
          </div>
        </div>
      </section>

      {/* Main Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Key Advantages</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{benefit.title}</CardTitle>
                      </div>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {benefit.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Additional Benefits</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalBenefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How We Compare</h2>
            
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-4 font-semibold">Features</th>
                        <th className="text-center p-4 font-semibold text-primary">Our Course</th>
                        <th className="text-center p-4 font-semibold">Other Courses</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="p-4">Course Fee</td>
                        <td className="p-4 text-center text-green-600 font-semibold">₹1000</td>
                        <td className="p-4 text-center text-red-600">₹5,000 - ₹25,000</td>
                      </tr>
                      <tr>
                        <td className="p-4">Batch Size</td>
                        <td className="p-4 text-center text-green-600 font-semibold">15 Students</td>
                        <td className="p-4 text-center text-red-600">50+ Students</td>
                      </tr>
                      <tr>
                        <td className="p-4">Live Projects</td>
                        <td className="p-4 text-center text-green-600 font-semibold">3 Complete Projects</td>
                        <td className="p-4 text-center text-red-600">0-1 Basic Project</td>
                      </tr>
                      <tr>
                        <td className="p-4">Recording Access</td>
                        <td className="p-4 text-center text-green-600 font-semibold">Lifetime</td>
                        <td className="p-4 text-center text-red-600">6 Months - 1 Year</td>
                      </tr>
                      <tr>
                        <td className="p-4">Evening Timing</td>
                        <td className="p-4 text-center text-green-600 font-semibold">7-8 PM</td>
                        <td className="p-4 text-center text-red-600">Day Time Only</td>
                      </tr>
                      <tr>
                        <td className="p-4">Personal Attention</td>
                        <td className="p-4 text-center text-green-600 font-semibold">High</td>
                        <td className="p-4 text-center text-red-600">Low</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Success Stories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6">
                <CardContent className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold">
                    95%
                  </div>
                  <h3 className="font-semibold">Course Completion Rate</h3>
                  <p className="text-sm text-muted-foreground">
                    95% of our students successfully complete the course and build their projects.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="p-6">
                <CardContent className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold">
                    80%
                  </div>
                  <h3 className="font-semibold">Career Transition</h3>
                  <p className="text-sm text-muted-foreground">
                    80% of our graduates successfully transition to developer roles within 6 months.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="p-6">
                <CardContent className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold">
                    4.9★
                  </div>
                  <h3 className="font-semibold">Student Rating</h3>
                  <p className="text-sm text-muted-foreground">
                    Average rating of 4.9/5 stars from over 200+ students who completed the course.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of successful developers who started their journey with our evening batch program.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                Enroll Now - ₹1000
              </Button>
            </Link>
            <a href="https://wa.me/918925722979" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                Talk to Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}