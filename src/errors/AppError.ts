class AppError {
  public readonly statusCode: number;

  constructor(statusCode = 400) {
    this.statusCode = statusCode;
  }
}

export default AppError;
