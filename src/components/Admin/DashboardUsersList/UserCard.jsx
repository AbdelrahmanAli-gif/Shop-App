import HorizontalLine from "../DashboardNavbar/HorizontalLine";

function UserCard({ user }) {
  console.log(user);
  return (
    <div className="w-full my-4">
      <HorizontalLine width="100%" />
      <div>
        <span className="text-black">User ID: </span>
        {user.id}
      </div>
      <div>
        <span className="text-black">Email: </span>
        {user.email}
      </div>
      <div>
        <span className="text-black">Role: </span>
        {user.role}
      </div>
      <HorizontalLine width="100%" />
    </div>
  );
}

export default UserCard;
