import React, { useState } from 'react';

function Sample() {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setIsValid(true); // Reset validation on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setIsValid(false);
      return;
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={handleChange}
            style={{ borderColor: isValid ? 'initial' : 'red' }}
          />
        </label>
        {!isValid && <p style={{ color: 'red' }}>Please enter a valid email address</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Sample