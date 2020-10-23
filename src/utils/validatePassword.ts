export const validatePassword = (password: string) => {
  if (password.length <= 2) {
    return [
      {
        field: 'password',
        message: 'length must be greater than 2',
      },
    ];
  }
  return null;
};
