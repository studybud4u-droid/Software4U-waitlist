import React from 'react';
import { supabase } from '../utils/supabaseClient';

const WaitlistSignupPage: React.FC = () => {
    const [email, setEmail] = React.useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { data, error } = await supabase
            .from('waitlist')
            .insert([{ email }]);

        if (error) {
            console.error('Error adding to waitlist:', error);
        } else {
            console.log('Successfully added to waitlist:', data);
        }
    };

    return (
        <div>
            <h1>Join our Waitlist</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default WaitlistSignupPage;
