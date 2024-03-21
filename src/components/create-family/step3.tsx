import Button from "@/lib/atoms/create-family/Button";
import React, { useState } from "react";
import Select, { StylesConfig } from "react-select";
interface Step3Props {
  familyContacts: String[];
  setFamilyContacts: React.Dispatch<React.SetStateAction<String[]>>;
  handleChangeStep: React.Dispatch<React.SetStateAction<number>>;
}

const options = [
  { value: "klong123456@gmail.com", label: "klong123456@gmail.com" },
  { value: "klong234567@gmail.com", label: "klong234567@gmail.com" },
  { value: "klong345678@gmail.com", label: "klong345678@gmail.com" },
];
const customStyles: StylesConfig = {
  valueContainer: (provided, state) => ({
    ...provided,
    marginTop: "1em",
    marginLeft: "0.5em",
    textAlign: "left",
    alignContent: "flex-start",
    height: "9em",
    padding: "0 6px",
  }),

  input: (provided, state) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: (state) => ({
    display: "none",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: "30px",
  }),
};
const ComponentStep3 = ({
  familyContacts,
  setFamilyContacts,
  handleChangeStep,
}: Step3Props) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  // useEffect(() => {
  //     updateCreateFamilySessionStorage({
  //         ui_step: 4,
  //         data: {
  //             familyContacts: familyContacts
  //         }
  //     })
  // }, [familyContacts])
  const handleEmailChange = (selectedOptions: any) => {
    const emails = selectedOptions.map((option: any) => option.value);
    setFamilyContacts(emails);
    console.log(emails);
  };
  const handleInputChange = (inputValue: any) => {
    if (inputValue) {
      console.log(inputValue);
      setIsDropdownVisible(true);
    } else {
      setIsDropdownVisible(false);
    }
  };
  const handleNext = () => {
    // handleNextStep();
    handleChangeStep(4);
  };
  return (
    <React.Fragment>
      <div className="text-4xl font-bold font-inter leading-[1.25] mb-4">
        Add your family member
      </div>
      <div className="mb-4">
        {" "}
        We will send them a inviting link for you, no need to worry.
      </div>
      {/* <div>
                            <textarea style={{ resize: "none" }} rows={4} className='pt-4 pl-4 block w-full border border-solid border-[#d2d2d2] h-36 border-opacity-100 rounded-lg text-start  align-text-top' placeholder='Ex: Acme Family or Acme Mckenzie' />

                        </div> */}
      <div>
        <Select
          isMulti
          name="emails"
          options={options}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Ex: no-re@ply.gmail.com"
          onInputChange={handleInputChange}
          onChange={handleEmailChange}
          menuIsOpen={isDropdownVisible}
          styles={customStyles}
        />
      </div>
      <div className="mt-6">
        <Button onClick={handleNext} className="mr-4">
          Next
        </Button>
        <Button onClick={handleNext} className="mr-4">
          Copy Invitation Link
        </Button>
        <Button onClick={handleNext} className="mr-4">
          Skip this step
        </Button>
        {/* <button className='bg-[#DDDDDD] px-10 py-2 mt-10 rounded-lg text-[#666566] mr-4'>Next</button>
            <button className='bg-white border px-10 py-2 mt-10 rounded-lg text-[#666566]'>Copy link invitation </button>
            <button className='bg-white  px-10 py-2 mt-10 rounded-lg text-[#666566]'>Skip this step </button> */}
      </div>
    </React.Fragment>
  );
};

export default ComponentStep3;
