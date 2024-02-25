// skillFunctions.js

const AddSkill = (nameInput, detailsInput, typeInput, setSkillsArray, setNameError, setDetailsError, setTypeError, setSuccessAlert) => {
    // Validation
    if (!nameInput) {
        setNameError(true);
    } else {
        setNameError(false);
    }

    if (!detailsInput) {
        setDetailsError(true);
    } else {
        setDetailsError(false);
    }

    if (!typeInput) {
        setTypeError(true);
    } else {
        setTypeError(false);
    }
    // Add skill if all fields are filled
    if (nameInput && detailsInput && typeInput) {
        const newSkill = {
            name: nameInput,
            details: detailsInput,
            type: typeInput,
        };
        setSkillsArray(prevSkills => [...prevSkills, newSkill]);
        // Show success alert
        setSuccessAlert(<div className="alert alert-success">{`تم إضافة ورد`}<br />{detailsInput}</div>);
        setTimeout(() => {
            setSuccessAlert(null);
        }, 3000); // Remove the alert after 3 seconds
    }
    
};

export default AddSkill;
