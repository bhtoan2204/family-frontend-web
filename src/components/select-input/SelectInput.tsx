"use client"
import React, { useState } from 'react'
import Select, { StylesConfig } from 'react-select';
// const a = { value: 'klong123456@gmail.com', label: 'klong123456@gmail.com' },
const options: {
    value: string;
    label: string;
}[] = [];
const customStyles: StylesConfig = {
    valueContainer: (provided, state) => ({
        ...provided,

        textAlign: 'left',
        textDecorationColor: 'black',
        fontSize: '1em',
        display: 'flex',
        flexDirection: 'row',
        justifyItems: 'center',
        alignItems: 'center',
        // width: '100%',
        // padding: '0 6px',
    }),
    container: (provided, state) => ({
        // marginTop: '0.75em',
        // marginLeft: '3em',
        // marginRight: '3em',

        fontSize: '0.9em',

        // width: '100%',
    }),
    input: (provided, state) => ({
        ...provided,

        margin: '0px',
        fontSize: '0.9em',

    }),
    indicatorSeparator: state => ({
        display: 'none',

    }),
    indicatorsContainer: (provided, state) => ({
        ...provided,
        display: 'none',
        height: '30px',

    }),
    menu(base, props) {
        return {
            ...base,
            position: 'relative',

        };
    },

};
const SelectInput = ({ setString }: { setString: React.Dispatch<React.SetStateAction<string>> }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [familyContacts, setFamilyContacts] = useState<String[]>([]);
    const handleEmailChange = (selectedOptions: any) => {
        console.log(selectedOptions)
        setFamilyContacts(selectedOptions);
        setString(selectedOptions.value)
        console.log(selectedOptions)
    };
    const handleInputChange = (inputValue: any) => {
        if (inputValue) {
            options.length = 0;
            const email = `${inputValue}@gmail.com`
            const emailVn = `${inputValue}@gmail.com.vn`
            options.push({ value: email, label: email });
            options.push({ value: emailVn, label: emailVn });
            console.log(inputValue);
            setIsDropdownVisible(true);
        } else {
            setIsDropdownVisible(false);
        }
    };
    return (
        <div>
            <Select
                name="emails"
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Ex: no-re@ply.gmail.com"
                onInputChange={handleInputChange}
                onChange={handleEmailChange}
                menuIsOpen={isDropdownVisible}
                styles={customStyles}
                autoFocus
            />
        </div>

    )
}

export default SelectInput