export type Success<T> = { isSuccess: true; value: T };
export type Failure<E> = { isSuccess: false; error: E };
export type Result<T, E> = Success<T> | Failure<E>;

export const success = <T>(value: T): Result<T, never> => {
  return { isSuccess: true, value };
};

export const failure = <E>(error: E): Result<never, E> => {
  return { isSuccess: false, error };
}

export const errorToFailure = (error: unknown) => {
  if (error instanceof Error) {
    return failure(error.message);
  } else if (typeof error === "string") {
    return failure(error);
  } else {
    // TODO: what to do here?
    return failure('');
  }
}