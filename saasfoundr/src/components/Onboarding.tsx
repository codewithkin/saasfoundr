"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Button } from './ui/button';
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
    connections: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const session = await getSession();
      if (session && session.user) {
        const userEmail = session.user.email;
        setFormData(prev => ({ ...prev, email: userEmail }));
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = async () => {
    await updateUserData();
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const updateUserData = async () => {
    const response = await fetch('/api/user/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      console.error('Failed to update user data');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateUserData();
    router.push('/home');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-r from-blue-500 to-purple-500 p-4">
      <Card className="w-full max-w-md p-6 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-bold text-center mb-4">Onboarding Process</h2>
        <Progress value={(step / 4) * 100} className="mb-4" />
        <p className="text-center mb-4">Step {step} of 4</p>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="mb-4">
              <Label>Name:</Label>
              <Input type="text" name="name" value={formData.name} onChange={handleChange} required className="mb-2" />
              <Label>Username:</Label>
              <Input type="text" name="username" value={formData.username} onChange={handleChange} required className="mb-2" />
              <Label>Email:</Label>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} required className="mb-2" />
            </div>
          )}
          {step === 2 && (
            <div className="mb-4">
              <Label>Role:</Label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Developer">Developer</SelectItem>
                  <SelectItem value="Marketer">Marketer</SelectItem>
                  <SelectItem value="Designer">Designer</SelectItem>
                </SelectContent>
              </Select>
              <Label>Field:</Label>
              <Input type="text" name="field" value={formData.field} onChange={handleChange} required className="mb-2" />
            </div>
          )}
          {step === 3 && (
            <div className="mb-4">
              <Label>Looking For:</Label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Developer">Developer</SelectItem>
                  <SelectItem value="Marketer">Marketer</SelectItem>
                  <SelectItem value="Designer">Designer</SelectItem>
                </SelectContent>
              </Select>
              <Label>Connections (optional):</Label>
              <Input type="text" name="connections" value={formData.connections} onChange={handleChange} className="mb-2" />
            </div>
          )}
          {step === 4 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Review Your Information</h3>
              <p>Name: {formData.name}</p>
              <p>Username: {formData.username}</p>
              <p>Email: {formData.email}</p>
              <p>Role: {formData.role}</p>
              <p>Field: {formData.field}</p>
              <p>Looking For: {formData.lookingFor}</p>
              <p>Connections: {formData.connections}</p>
            </div>
          )}
          <div className="flex justify-between">
            {step > 1 && <Button type="button" onClick={prevStep}>Previous</Button>}
            {step < 4 ? <Button type="button" onClick={nextStep}>Next</Button> : <Button type="submit">Submit</Button>}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Onboarding;
