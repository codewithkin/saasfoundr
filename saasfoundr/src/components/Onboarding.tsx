"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { getSession } from 'next-auth/react';

const Onboarding: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    role: '',
    field: '',
    lookingFor: '',
    bio: '',
    experience: '',
    interests: '',
    goals: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const session = await getSession();
      if (session?.user) {
        setFormData(prev => ({
          ...prev,
          email: session?.user?.email || '',
          name: session?.user?.name || ''
        }));
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = async () => {
    await updateUserData();
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const updateUserData = async () => {
    try {
      const response = await fetch('/api/user/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to update user data');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateUserData();
    router.push('/home');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <Card className="max-w-2xl mx-auto p-8 rounded-xl shadow-lg bg-white">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">
              {step === 1 ? "Let's Get Started" :
               step === 2 ? "Your Professional Profile" :
               step === 3 ? "Your Interests & Goals" :
               "Final Steps"}
            </h2>
            <Progress value={(step / 4) * 100} className="h-2 bg-gray-100" />
            <p className="text-center text-sm text-gray-500">Step {step} of 4</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Full Name</Label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="h-11 rounded-lg border-gray-200 focus-visible:ring-blue-500"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Username</Label>
                  <Input
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleChange('username', e.target.value)}
                    className="h-11 rounded-lg border-gray-200 focus-visible:ring-blue-500"
                    placeholder="johndoe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Email</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="h-11 rounded-lg border-gray-200 focus-visible:ring-blue-500"
                    placeholder="john@example.com"
                    required
                    disabled
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Your Role</Label>
                  <Select onValueChange={(value) => handleChange('role', value)}>
                    <SelectTrigger className="h-11 rounded-lg border-gray-200">
                      <SelectValue placeholder="Select your primary role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="founder">Founder</SelectItem>
                      <SelectItem value="developer">Developer</SelectItem>
                      <SelectItem value="designer">Designer</SelectItem>
                      <SelectItem value="marketer">Marketer</SelectItem>
                      <SelectItem value="product">Product Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Industry/Field</Label>
                  <Select onValueChange={(value) => handleChange('field', value)}>
                    <SelectTrigger className="h-11 rounded-lg border-gray-200">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saas">SaaS</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="fintech">Fintech</SelectItem>
                      <SelectItem value="healthtech">Healthtech</SelectItem>
                      <SelectItem value="edtech">Edtech</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Professional Experience</Label>
                  <Textarea
                    value={formData.experience}
                    onChange={(e) => handleChange('experience', e.target.value)}
                    className="min-h-[100px] rounded-lg border-gray-200 focus-visible:ring-blue-500"
                    placeholder="Brief description of your professional background..."
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">What are you looking for?</Label>
                  <Select onValueChange={(value) => handleChange('lookingFor', value)}>
                    <SelectTrigger className="h-11 rounded-lg border-gray-200">
                      <SelectValue placeholder="Select your primary goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cofounder">Co-founder</SelectItem>
                      <SelectItem value="networking">Networking</SelectItem>
                      <SelectItem value="mentorship">Mentorship</SelectItem>
                      <SelectItem value="investment">Investment</SelectItem>
                      <SelectItem value="collaboration">Collaboration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Interests</Label>
                  <Textarea
                    value={formData.interests}
                    onChange={(e) => handleChange('interests', e.target.value)}
                    className="min-h-[100px] rounded-lg border-gray-200 focus-visible:ring-blue-500"
                    placeholder="What technologies, industries, or areas interest you most?"
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Bio</Label>
                  <Textarea
                    value={formData.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    className="min-h-[100px] rounded-lg border-gray-200 focus-visible:ring-blue-500"
                    placeholder="Tell the community about yourself..."
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Goals</Label>
                  <Textarea
                    value={formData.goals}
                    onChange={(e) => handleChange('goals', e.target.value)}
                    className="min-h-[100px] rounded-lg border-gray-200 focus-visible:ring-blue-500"
                    placeholder="What do you hope to achieve in the next 6-12 months?"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              {step > 1 && (
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="outline"
                  className="h-11 px-6 rounded-lg"
                >
                  Back
                </Button>
              )}
              {step < 4 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="h-11 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-purple-700 hover:from-blue-600 hover:to-purple-800 text-white ml-auto"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="h-11 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-purple-700 hover:from-blue-600 hover:to-purple-800 text-white ml-auto"
                >
                  Complete Setup
                </Button>
              )}
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Onboarding;
