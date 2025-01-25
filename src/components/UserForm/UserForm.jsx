import PrimaryButton from "../Common/PrimaryButton/PrimaryButton";

function UserForm({
  children,
  error,
  onSubmit,
  submitText,
  messageColor = "red",
}) {
  return (
    <form className="flex flex-col gap-7 pt-7 px-4 md:px-8 w-full">
      {error ? (
        <div
          className={`${
            messageColor === "red" ? "bg-red-500" : "bg-lime-600"
          } text-xs text-center py-2 text-white`}
        >
          {error}
        </div>
      ) : null}
      {children}
      <PrimaryButton onClick={onSubmit}>{submitText}</PrimaryButton>
    </form>
  );
}

export default UserForm;
