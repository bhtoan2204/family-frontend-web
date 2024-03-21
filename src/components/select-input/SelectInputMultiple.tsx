"use client"
import React, { useState } from 'react'
import Select, { StylesConfig } from 'react-select';

const options = [
    { value: 'klong123456@gmail.com', label: 'klong123456@gmail.com' },
    { value: 'klong234567@gmail.com', label: 'klong234567@gmail.com' },
    { value: 'klong345678@gmail.com', label: 'klong345678@gmail.com' },
];
const customStyles: StylesConfig = {
    valueContainer: (provided, state) => ({
        ...provided,
        marginTop: '1em',
        marginLeft: '0.5em',
        textAlign: 'left',
        alignContent: 'flex-start',
        height: '7.25em',
        // width: '100%',
        padding: '0 6px',
    }),
    container: (provided, state) => ({
        marginTop: '0.75em',
        marginLeft: '3em',
        marginRight: '3em',
        // width: '100%',
    }),
    input: (provided, state) => ({
        ...provided,
        margin: '0px',

    }),
    indicatorSeparator: state => ({
        display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
        ...provided,
        height: '30px',

    }),
    menu(base, props) {
        return {
            ...base,
            position: 'relative',

        };
    },

};
const SelectInput = () => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [familyContacts, setFamilyContacts] = useState<String[]>([]);
    const handleEmailChange = (selectedOptions: any) => {
        // const emails = selectedOptions.map((option: any) => option.value);
        setFamilyContacts(selectedOptions);
        console.log(selectedOptions)
    };
    const handleInputChange = (inputValue: any) => {
        if (inputValue) {
            console.log(inputValue);
            setIsDropdownVisible(true);
        } else {
            setIsDropdownVisible(false);
        }
    };
    return (
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
                autoFocus
            />
        </div>

    )
}

export default SelectInput