import image from "../../../../assets/Image/doctor1.jpeg";

function AdminProfile({ users, disable, setUsers }) {
  return (
    <div className="  w-full grid grid-cols-2 gap-2 dt-profile">
      <div className="flex flex-col items-center justify-center w-full">
        <div className=" w-full flex flex-col gap-2 bg-[#fff] p-4 rounded-md shadow">
          <img src={image} alt="image" className="img mx-auto" />
          <h1 className="font-semibold">{users?.username}</h1>
        </div>
      </div>

      {/*  */}
      <div className=" flex flex-col items-center  w-full">
        <div className=" w-full flex flex-col gap-2 bg-[#fff] p-4 shadow flex-1 rounded-md">
          <div className="font-semibold">Admin Profile</div>
          <input
            disabled={disable ? true : false}
            type="text"
            placeholder="username"
            className="input"
            value={users?.username}
            onChange={(e) =>
              setUsers((p) => ({ ...p, username: e.target.value }))
            }
          />
          <input
            disabled={disable ? true : false}
            type="text"
            placeholder="password"
            className="input"
            value={users?.password}
            onChange={(e) =>
              setUsers((p) => ({ ...p, password: e.target.value }))
            }
          />
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
