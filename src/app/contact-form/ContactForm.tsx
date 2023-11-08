'use client';

import React, { useState } from 'react';

type Form = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const [formData, setFormData] = useState<Form>({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);
    const obj = {
      name: form.get('name'),
      email: form.get('email'),
      message: form.get('message'),
    };
    setFormData(obj as Form);
    const response = await fetch(
      'https://www.greatfrontend.com/api/questions/contact-form',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      }
    );

    if (!response.ok) {
      console.error('Failed to send message:', response.statusText);
      return;
    }

    const responseData = await response;
    console.log('Message sent:', responseData);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='name'>
        Name
        <input name='name' type='text' />
      </label>
      <label htmlFor='email'>
        Email
        <input name='email' type='text' />
      </label>
      <label htmlFor='message'>
        Message
        <textarea name='message' />
      </label>
      <button type='submit'>Send</button>
    </form>
  );
}
