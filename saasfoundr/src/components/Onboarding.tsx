import React, { useState } from 'react';
import { useRouter } from 'next/router';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submit formData to the backend or save it in state
    // For example, you might send it to an API here
    router.push('/home');
  };

  return (
    <div>
      <h2>Onboarding Process</h2>
      <p>Step {step} of 4</p>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            <label>Username:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
        )}
        {step === 2 && (
          <div>
            <label>Role:</label>
            <select name="role" value={formData.role} onChange={handleChange} required>
              <option value="">Select Role</option>
              <option value="Developer">Developer</option>
              <option value="Marketer">Marketer</option>
              <option value="Designer">Designer</option>
            </select>
            <label>Field:</label>
            <input type="text" name="field" value={formData.field} onChange={handleChange} required />
          </div>
        )}
        {step === 3 && (
          <div>
            <label>Looking For:</label>
            <select name="lookingFor" value={formData.lookingFor} onChange={handleChange} required>
              <option value="">Select Role</option>
              <option value="Developer">Developer</option>
              <option value="Marketer">Marketer</option>
              <option value="Designer">Designer</option>
            </select>
            <label>Connections (optional):</label>
            <input type="text" name="connections" value={formData.connections} onChange={handleChange} />
          </div>
        )}
        {step === 4 && (
          <div>
            <h3>Review Your Information</h3>
            <p>Name: {formData.name}</p>
            <p>Username: {formData.username}</p>
            <p>Email: {formData.email}</p>
            <p>Role: {formData.role}</p>
            <p>Field: {formData.field}</p>
            <p>Looking For: {formData.lookingFor}</p>
            <p>Connections: {formData.connections}</p>
          </div>
        )}
        <div>
          {step > 1 && <button type="button" onClick={prevStep}>Previous</button>}
          {step < 4 ? <button type="button" onClick={nextStep}>Next</button> : <button type="submit">Submit</button>}
        </div>
      </form>
    </div>
  );
};

export default Onboarding;
