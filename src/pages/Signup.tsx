import React, { useState } from 'react';

interface SignUpFormProps {
  onSubmit: (userData: UserData) => void;
}

interface UserData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  const [user, setUser] = useState<UserData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof UserData
  ): void => {
    const { value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // Perform validation before submitting
    if (user.password !== user.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    // You can add more validation logic here if needed

    // Call the onSubmit callback with user data if validation passes
    onSubmit(user);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={(e) => handleInputChange(e, 'name')}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={(e) => handleInputChange(e, 'email')}
        />
      </label>
      <br />
      <label>
        Phone:
        <input
          type="text"
          name="phone"
          value={user.phone}
          onChange={(e) => handleInputChange(e, 'phone')}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={(e) => handleInputChange(e, 'password')}
        />
      </label>
      <br />
      <label>
        Confirm Password:
        <input
          type="password"
          name="confirmPassword"
          value={user.confirmPassword}
          onChange={(e) => handleInputChange(e, 'confirmPassword')}
        />
      </label>
      <br />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
