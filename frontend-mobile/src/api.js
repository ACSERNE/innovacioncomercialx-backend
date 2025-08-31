import config from './config';

export async function getUsers() {
  try {
    const response = await fetch(`${config.backendUrl}/users`);
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
