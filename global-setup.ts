import { request } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

async function globalSetup() {
    const context = await request.newContext();
    
    const response = await context.post('https://api.practicesoftwaretesting.com/users/register', {
        data: {
            first_name: 'Cosme',
            last_name: 'Fulanito',
            address: {
                street: 'Flavio Flat',
                house_number: '12',
                city: 'Port Caterina',
                state: 'Indiana',
                country: 'Argentina',
                postal_code: '5501'
            },
            phone: '123456789',
            dob: '1982-06-28',
            password: process.env.USER_PASSWORD,
            email: process.env.USER_EMAIL
        }
    });

    const status = response.status();
    console.log('Status:', status);
    console.log('Response:', await response.json());

    if (status === 201) {
        console.log('User created successfully');
    } else if (status >= 400 && status < 500) {
        console.log('User already exists or client error, continuing...');
    } else if (status >= 500) {
        throw new Error(`Server error: ${status}`);
    }

      // Login via API
    const loginResponse = await context.post('https://api.practicesoftwaretesting.com/users/login', {
        data: {
            email: process.env.USER_EMAIL,
            password: process.env.USER_PASSWORD
        }
    });

    const loginData = await loginResponse.json();
    console.log('Login status:', loginResponse.status());

    // Guardar token
    fs.writeFileSync('auth.json', JSON.stringify({ token: loginData.access_token }));
    console.log('Token saved');

    await context.dispose();
}

export default globalSetup;