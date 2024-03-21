import useDebounce from "@/hooks/useDebounce";
import Button from "@/lib/atoms/create-family/Button";
import { useAppDispatch } from "@/redux/store";
import LocalStorage from "@/store/local-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
interface Step1Props {
  familyName: String;
  setFamilyName: React.Dispatch<React.SetStateAction<String>>;
  handleChangeStep: React.Dispatch<React.SetStateAction<number>>;
  setFamilyId: React.Dispatch<React.SetStateAction<String>>;
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const ComponentStep1: React.FC<Step1Props> = ({
  familyName,
  setFamilyName,
  handleChangeStep,
  setFamilyId,
}: Step1Props) => {
  
  const dispatch = useAppDispatch();
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const debounchValue = useDebounce(familyName, 500);
  useEffect(() => {
    if (showError == true) {
      setTimeout(() => {
        setShowError(false);
      }, 4000);
    }
  }, [showError]);
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFamilyName(e.target.value);
  };
  // const handleNextStep = () => {
  //     localStorage.setItem('setup_familyname_storage', familyName.toString());

  // }
  // if (debounchValue != "") {
  //     localStorage.setItem('setup_familyname_storage', debounchValue);
  // }
  const handleNext = async () => {
    // handleNextStep();
    // await delay(500); //call api or something
    // const a = Math.random()*1000;
    // setFamilyId(a.toFixed(0).toString());
    try {
      const accessToken = LocalStorage.GetAccessToken();
      await axios.post(
        "/api/family/add",
        {
          name: familyName,
          description: "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // setFamilyId(data.id_family.toString() || (Math.random() * 1000).toString());
      // const userProfile = await UserService.getUserProfile(accessToken!)

      // dispatch(fetchAllFamilyActions.addFamily({
      //     id_family: data.id_family, name: familyName.toString(), description: "", created_at: "", updated_at: "",
      //     quantity: 1,
      //     owner_id: userProfile.id_user,
      //     familyPhotoUrl: 'https://www.w3schools.com/howto/img_avatar.png'
      // }))
      handleChangeStep(2);
    } catch (error: any) {
      setShowError(true);
      setErrorMsg(error.response.data.message);
    }
  };
  return (
    <React.Fragment>
      <div className="bg-white w-full h-full">
        <div className="text-4xl font-bold font-inter leading-[1.25] mb-4">
          What would you like to name your family?
        </div>
        <div className="mb-4">
          {" "}
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus,
          distinctio.
        </div>
        <input
          type="text"
          value={familyName.toString()}
          onChange={handleChangeName}
          className="block border border-solid border-[#d2d2d2] h-12 border-opacity-100 pl-4 rounded-lg mb-4 w-3/4"
          placeholder="Ex: Acme Family or Acme Mckenzie"
        />
        {showError && (
          <div className="flex flex-row items-center text-red-700 gap-4 mt-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>

            <p className=" text-sm">{errorMsg}</p>
          </div>
        )}
        <Button
          disabled={familyName.length == 0}
          onClick={handleNext}
          className={`mt-4 transition rounded-lg ${
            familyName.length != 0
              ? "text-white bg-[#187A5A]"
              : "text-[#666566] bg-[#DDDDDD]"
          }`}
        >
          Next
        </Button>
      </div>

      {/* <button disabled={familyName.length == 0} className={` px-10 py-2 mt-10 transition rounded-lg ${familyName.length != 0 ? 'text-white bg-[#397097]' : 'text-[#666566] bg-[#DDDDDD]'} `} onClick={handleNext} >Next</button> */}
    </React.Fragment>
  );
};

export default ComponentStep1;
