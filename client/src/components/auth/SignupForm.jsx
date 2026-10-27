import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../../utils/validators';
import Input from '../ui/Input';
import Button from '../ui/Button';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { UserPlus } from 'lucide-react';

export default function SignupForm({ onSuccess }) {
  const { register: signup } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await signup(data);
      if (result.success) {
        toast.success('Account created successfully! Welcome to PriorityFlow.');
        if (onSuccess) onSuccess();
      } else {
        toast.error(result.message || 'Registration failed');
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        'Unable to reach server. Please check your network or backend connection.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      <Input
        label="Full Name"
        type="text"
        placeholder="John Doe"
        error={errors.name?.message}
        {...register('name')}
      />

      <Input
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register('email')}
      />

      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register('password')}
      />

      <Button
        type="submit"
        className="w-full mt-2"
        loading={loading}
        icon={UserPlus}
      >
        Create Account
      </Button>
    </form>
  );
}
