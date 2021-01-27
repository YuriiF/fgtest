export interface User {
  id?: string;
  username: string;
  email: string;
  password?: string;
  favoriteIds: string[] | null;
}

export default User;
