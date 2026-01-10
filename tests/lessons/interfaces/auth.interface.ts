// {
//   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQGV4YW1wbGUuY29tIiwiZXhwIjoxNzY4MDU1MTE0LCJpYXQiOjE3NjgwNTMzMTQsInJvbGUiOiJzdGFmZiIsInN1YiI6MiwidXNlcm5hbWUiOiJ0ZXN0MSJ9.jue_22FpNeJF3pT3lDmYd0-VovkFjT9VQz0vYaw5-LM",
//   "refresh_token": "heEpiIZbyQz0QX4sKKqjsmKdwO1IBxHpawkrgrOtiYQ=",
//   "token_type": "Bearer",
//   "expires_in": 1800,
//   "expires_at": "2026-01-10T14:25:14.388628411Z",
//   "user": {
//     "id": 2,
//     "username": "test1",
//     "email": "test1@example.com",
//     "role": "staff"
//   }
// }
//body khi gui len server
export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user?: {
    id: number;
    email: string;
    username: string;
  };
  expiresIn: string;
}
