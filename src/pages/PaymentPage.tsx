import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, CreditCard, Smartphone, Building } from 'lucide-react';

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'bank'>('upi');
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    setLoading(true);

    try {
      // Get user profile for enrollment
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (!profile) {
        toast({
          title: "Error",
          description: "Profile not found. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Create enrollment record
      const { error: enrollmentError } = await supabase
        .from('enrollments')
        .insert({
          user_id: user.id,
          full_name: profile.full_name,
          email: user.email!,
          phone: profile.phone || '',
          payment_status: 'paid', // Mock payment success
          payment_amount: 1000
        });

      if (enrollmentError) {
        throw enrollmentError;
      }

      toast({
        title: "Payment Successful!",
        description: "Welcome to the Full Stack Developer course. You now have access to all course materials.",
      });

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Payment Error",
        description: error.message || "Failed to process payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-secondary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Complete Your Enrollment</h1>
          <p className="text-muted-foreground">
            You're just one step away from starting your full stack development journey!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Summary */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Course Summary
                  <Badge variant="secondary">Evening Batch</Badge>
                </CardTitle>
                <CardDescription>
                  Full Stack Developer - Evening Batch (After 7 PM)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>2 Months Duration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Live Online Classes (7 PM onwards)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>3 Live Projects</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Frontend, Backend & Database</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Lifetime Recording Access</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Certificate of Completion</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Choose Payment Method</CardTitle>
                <CardDescription>
                  Select your preferred payment option
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Button
                    variant={paymentMethod === 'upi' ? 'default' : 'outline'}
                    className="h-16 flex-col space-y-2"
                    onClick={() => setPaymentMethod('upi')}
                  >
                    <Smartphone className="h-5 w-5" />
                    <span>UPI</span>
                  </Button>
                  
                  <Button
                    variant={paymentMethod === 'card' ? 'default' : 'outline'}
                    className="h-16 flex-col space-y-2"
                    onClick={() => setPaymentMethod('card')}
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>Card</span>
                  </Button>
                  
                  <Button
                    variant={paymentMethod === 'bank' ? 'default' : 'outline'}
                    className="h-16 flex-col space-y-2"
                    onClick={() => setPaymentMethod('bank')}
                  >
                    <Building className="h-5 w-5" />
                    <span>Net Banking</span>
                  </Button>
                </div>

                {/* Payment Method Details */}
                <div className="p-4 bg-muted rounded-lg">
                  {paymentMethod === 'upi' && (
                    <div className="text-center">
                      <p className="font-medium mb-2">UPI Payment</p>
                      <p className="text-sm text-muted-foreground">
                        You will be redirected to your UPI app to complete the payment
                      </p>
                    </div>
                  )}
                  
                  {paymentMethod === 'card' && (
                    <div className="text-center">
                      <p className="font-medium mb-2">Card Payment</p>
                      <p className="text-sm text-muted-foreground">
                        Secure payment with your debit or credit card
                      </p>
                    </div>
                  )}
                  
                  {paymentMethod === 'bank' && (
                    <div className="text-center">
                      <p className="font-medium mb-2">Net Banking</p>
                      <p className="text-sm text-muted-foreground">
                        Pay directly from your bank account
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Course Fee</span>
                  <span>₹800</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & Fees</span>
                  <span>₹0</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹800</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handlePayment}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Pay ₹800'}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center mt-4">
                  By proceeding, you agree to our terms and conditions. 
                  Your payment is secure and encrypted.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="font-medium text-green-800">Money Back Guarantee</p>
                  <p className="text-sm text-green-600 mt-1">
                    Get full refund if not satisfied within 7 days
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}