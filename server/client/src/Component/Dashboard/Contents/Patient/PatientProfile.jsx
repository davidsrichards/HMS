import image from "../../../../assets/Image/doctor1.jpeg";
function PatientProfile({ users, setUsers, disable }) {
  return (
    <div className="  w-full grid md:grid-cols-2 gap-2">
      <div className="flex flex-col items-center justify-center w-full">
        <div className=" w-full flex flex-col gap-2 bg-[#fff] p-4 rounded-md shadow flex-1">
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4KGHb0zM_ceTNV3g8PCaW5UEyuYQU954ZCA&s"
            }
            alt="image"
            className="img mx-auto"
          />
          <h1 className="font-semibold">{users?.firstname}</h1>
          {/*  <h4>{users.position}</h4> */}
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
            placeholder="mobile"
            className="input"
            value={users?.mobile}
            onChange={(e) =>
              setUsers((p) => ({ ...p, mobile: e.target.value }))
            }
          />
          <input
            disabled={disable ? true : false}
            type="text"
            placeholder="date of birth"
            className="input"
            value={users?.dob}
            onChange={(e) => setUsers((p) => ({ ...p, dob: e.target.value }))}
          />
        </div>
      </div>
    </div>
  );
}

export default PatientProfile;
