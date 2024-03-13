import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";


const handleValidationError = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const statusCode = 400;
  const errorSources: TErrorSources = Object.values(err?.errors).map(
    (vl: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: vl?.path,
        message: vl?.message,
      };
    }
  );

  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};
export default handleValidationError;
