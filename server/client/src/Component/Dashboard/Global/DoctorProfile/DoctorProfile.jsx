import image from "../../../../assets/Image/doctor1.jpeg";
function DoctorProfile({ users, setUsers, disable }) {
  return (
    <div className="  w-full grid md:grid-cols-2 gap-2">
      <div className="flex flex-col items-center justify-center w-full">
        <div className=" w-full flex flex-col gap-2 bg-[#fff] p-4 rounded-md shadow">
          <img src={image} alt="image" className="img mx-auto" />
          <h1 className="font-semibold">{users?.firstname}</h1>
          <h4>{users.position}</h4>
        </div>
      </div>

      {/*  */}
      <div className=" flex flex-col items-center  w-full">
        <div className=" w-full flex flex-col gap-2 bg-[#fff] p-4 shadow flex-1 rounded-md">
          <div className="font-semibold">Data Profile</div>
          <input
            disabled={disable ? true : false}
            type="text"
            placeholder="firstname"
            className="input"
            value={users?.firstname}
            onChange={(e) =>
              setUsers((p) => ({ ...p, firstname: e.target.value }))
            }
          />
          <input
            disabled={disable ? true : false}
            type="text"
            placeholder="lastname"
            className="input"
            value={users?.lastname}
            onChange={(e) =>
              setUsers((p) => ({ ...p, lastname: e.target.value }))
            }
          />
          <input
            disabled={disable ? true : false}
            type="text"
            placeholder="email"
            className="input"
            value={users?.email}
            onChange={(e) => setUsers((p) => ({ ...p, email: e.target.value }))}
          />
          <input
            disabled={disable ? true : false}
            type="text"
            placeholder="position"
            className="input"
            value={users?.position}
            onChange={(e) =>
              setUsers((p) => ({ ...p, position: e.target.value }))
            }
          />
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;
