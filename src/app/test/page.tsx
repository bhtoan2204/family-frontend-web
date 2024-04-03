import { auth, signOut } from "@/auth";

const Test = async () => {
  const session = await auth();

  const handleSignOut = async () => {
    "use server";
    await signOut();
  };
  return (
    <div>
      <div>{JSON.stringify(session)}</div>
      <form action={handleSignOut}>
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
};

export default Test;
