import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="text-red-400 bg-red-900/20 p-3 rounded-md">{message}</div>
  );
};

export default ErrorMessage;
