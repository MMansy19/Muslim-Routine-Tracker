import React, { useState, useEffect  } from 'react';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import ProgressLine from "./components/progress.js";
import AddSkill from "./components/addSkill.js";
import ShowComponent  from "./components/showComponentFunc.js";

const SkillsSection = ({ showAddSkill, showSkills, skillsFunction, addSkillFunction }) => {
    const [isVisibleSkills, setIsVisibleSkills] = useState(false); // State to manage visibility
    const [isVisibleAddSkill, setIsVisibleAddSkill] = useState(false); // State to manage visibility
    const [skillsArray, setSkillsArray] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [nameInput, setNameInput] = useState('');
    const [detailsInput, setDetailsInput] = useState('');
    const [typeInput, setTypeInput] = useState('');
    const [nameError, setNameError] = useState(false);
    const [detailsError, setDetailsError] = useState(false);
    const [typeError, setTypeError] = useState(false);
    const [filterType, setFilterType] = useState('all');
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState('');
    const [successAlert, setSuccessAlert] = useState(null);
    const [notDoneAlert, setNotDoneAlert] = useState(null);
    const [circleAlert, setCircleAlert] = useState(null);
    const [deletionAlert, setDeletionAlert] = useState(null);
    const [activeButtons, setActiveButtons] = useState({});
        const [counters, setCounters] = useState({
        done: 0,
        notDone: 0,
        circle: 0
    });



    // Calculate counters whenever activeButtons changes
    useEffect(() => {
    // Count occurrences of each status
    let doneCount = 0;
    let notDoneCount = 0;
    let circleCount = 0;

    Object.values(activeButtons).forEach(status => {
        if (status === 'done') {
        doneCount++;
        } else if (status === 'notDone') {
        notDoneCount++;
        } else if (status === 'circle') {
        circleCount++;
        }
    });
    // Update counters state
    setCounters({
        done: doneCount,
        notDone: notDoneCount,
        circle: circleCount
    });
    }, [activeButtons]);

    useEffect(() => {
        // Initialize skills array
        setSkillsArray ([
        {
            name: "الدعاء للمسلمين",
            details: "اللهم انصر إخواننا المستضعفين في غزة وفي كل مكان",
            type: "الدعاء",
        },
        {
            name: "صلاة الصبح",
            details: "صلاة الصبح جماعة في المسجد",
            type: "الصلاة",
        },
        {
            name: "صلاة الظهر",
            details: "صلاة الظهر جماعة في المسجد",
            type: "الصلاة",
        },
        {
            name: "صلاة العصر",
            details: "صلاة العصر جماعة في المسجد",
            type: "الصلاة",
        },
        {
            name: "صلاة المغرب",
            details: "صلاة المغرب جماعة في المسجد",
            type: "الصلاة",
        },
        {
            name: "صلاة العشاء",
            details: "صلاة العشاء جماعة في المسجد",
            type: "الصلاة",
        },
        ]);
        // Initialize skills array with a new date property for each item
        setSkillsArray(prevSkillsArray => prevSkillsArray.map(skill => ({
            ...skill,
        state:'',
        })));
    }, []);

    // Show the component after a delay
    ShowComponent(() => {setIsVisibleSkills( showSkills? true : false );});
    ShowComponent(() => {setIsVisibleAddSkill( showAddSkill? true : false );});
      
// Function to handle Excel download
    const handleExcelDownload = () => {
        const worksheet = XLSX.utils.json_to_sheet(skillsArray);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Skills");
        XLSX.writeFile(workbook, "skills.xlsx");
    };

    const handleSkillDeletion = (itemDetails) => {
        setItemToDelete(itemDetails);
        setConfirmDialogOpen(true);
    };

    const confirmDeletion = () => {
        // Remove skill from the array
        setSkillsArray(prevSkills => prevSkills.filter(skill => skill.details !== itemToDelete));

        // Decrement the counters for the deleted skill if its buttons were active
        setCounters(prevCounters => ({
            done: activeButtons[itemToDelete] === 'done' ? prevCounters.done - 1 : prevCounters.done,
            notDone: activeButtons[itemToDelete] === 'notDone' ? prevCounters.notDone - 1 : prevCounters.notDone,
            circle: activeButtons[itemToDelete] === 'circle' ? prevCounters.circle - 1 : prevCounters.circle
        }));

        // Remove active state for the deleted skill
        setActiveButtons(prevState => {
            const updatedState = { ...prevState };
            delete updatedState[itemToDelete];
            return updatedState;
        });

        // Show deletion alert
        setDeletionAlert(
            <div className="alert alert-deletion">
                <span>تم حذف {itemToDelete}</span>
            </div>
        );
        // Automatically dismiss the deletion alert after 3 seconds
        setTimeout(() => {
            setDeletionAlert(null);
        }, 3000);

        // Close the confirm dialog
        setConfirmDialogOpen(false);
    };

    const cancelDeletion = () => {
        // Close the confirm dialog
        setConfirmDialogOpen(false);
    };


    const handleAddSkill = () => {
        AddSkill(nameInput, detailsInput, typeInput, setSkillsArray, setNameError, setDetailsError, setTypeError, setSuccessAlert);
            setTimeout(() => {
                // Clear input fields after adding the skill
                setNameInput('');
                setDetailsInput('');
                setTypeInput('');
            }, 1000);

    };
    // Retrieve skillsArray from local storage on component mount
    useEffect(() => {
        const storedSkills = localStorage.getItem("skillsArray");
        if (storedSkills) {
            setSkillsArray(JSON.parse(storedSkills));
        }
    }, []);

    // Save skillsArray to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem("skillsArray", JSON.stringify(skillsArray));
    }, [skillsArray]);

    const handleSkillToggle = (skillName) => {
        // Toggle highlighting for the clicked skill
        setSkillsArray(prevSkills => prevSkills.map(skill => {
            if (skill.name === skillName) {
                return { ...skill, highlighted: !skill.highlighted };
            }
            return skill;
        }));
    };

    const handleSkillButtonClick = (skillName, action) => {
        skillsArray.forEach((skill) => {
            if (skill.details === skillName) {
                // Update the properties based on the action
                skill.state = action === 'done' ? '✅' : skill.state; 
                skill.state = action === 'notDone' ? '❌' : skill.state;
                skill.state = action === 'circle' ?  '🔘' : skill.state;
            }
        });

        setActiveButtons(prevState => {
            const updatedState = { ...prevState };
            if (updatedState[skillName] === action) {
                // If the button is already active, deactivate it
                delete updatedState[skillName];
            }
            else {
                if(updatedState[skillName]==='done') {
                    
                    setCounters(prevCounters => ({
                        ...prevCounters,
                        done: prevCounters.done - 1
                    }));
                }
                else if(updatedState[skillName]==='circle') {
                    setCounters(prevCounters => ({
                        ...prevCounters,
                        circle: prevCounters.circle - 1
                    }));
                }
                else if(updatedState[skillName]==='notDone') {
                    setCounters(prevCounters => ({
                        ...prevCounters,
                        notDone: prevCounters.notDone - 1
                    }));
                }
                // Otherwise, toggle it to the new action
                updatedState[skillName] = action;
            }

            // Update the counters based on the action
            if (action === 'done') {
                if(updatedState[skillName] === action){
                setSuccessAlert(<div className="alert alert-done">{`مبارك! لقد أنهيت`}<br />{skillName}</div>);
                setTimeout(() => {
                    setSuccessAlert(null);
                }, 3000); // Remove the alert after 3 seconds
                }
                setCounters(prevCounters => ({
                    ...prevCounters,
                    done: prevCounters.done + (updatedState[skillName] === action ? 1 : -1)
                }));
            }
            else if (action === 'notDone') {
                if(updatedState[skillName] === action){
                setNotDoneAlert(<div className="alert alert-deletion">{`لم يتم إنهاء`}<br />{skillName}</div>);
                setTimeout(() => {
                    setNotDoneAlert(null);
                }, 3000); // Remove the alert after 3 seconds
            }
                setCounters(prevCounters => ({
                    ...prevCounters,
                    notDone: prevCounters.notDone + (updatedState[skillName] === action ? 1 : -1)
                }));
            }
            else if (action === 'circle') {
                if(updatedState[skillName] === action){
                setCircleAlert(<div className="alert alert-circle">{ `مبارك! لقد قمت بقضاء`}<br />{skillName}</div>);
                setTimeout(() => {
                    setCircleAlert(null);
                }, 3000); // Remove the alert after 3 seconds
            }
                setCounters(prevCounters => ({
                    ...prevCounters,
                    circle: prevCounters.circle + (updatedState[skillName] === action ? 1 : -1)
                }));
            }
            return updatedState;
        });
    };

    const handleFilterButtonClick = (filterType) => {
        setFilterType(filterType);
    };

    const skillItems = skillsArray
        .filter(skill => filterType === 'all' || skill.type === filterType)
        .map(skill => (
            <li
                className={`skills__item ${skill.highlighted ? 'skill-active' : ''}`}
                key={skill.name}
                data-type={skill.type}
                data-name={skill.name}
                >
                <img className="delete-icon" src="./images/delete.png" width="25px" alt="Delete" onClick={() => handleSkillDeletion(skill.details)} />
                <h2 className="skills__title"
                onClick={() => handleSkillToggle(skill.name)}
                >{skill.name}</h2>
                <span className="skills__years">{skill.details}</span>
                <br />
                <div className="skills__state">

                <button
                    className={`skills__state-item  skills__state-done ${activeButtons[skill.details] === 'done' ? 'done-clicked' : ''}`}
                    onClick={() => handleSkillButtonClick(skill.details, 'done')}
                    >                    
                <img className="" src="./images/stateOfWird\done.svg" width="25px" alt="done" />
                </button>
                <button  
                className={`skills__state-item skills__state-circle ${activeButtons[skill.details] === 'circle' ? 'circle-clicked' : ''}`}
                onClick={() => handleSkillButtonClick(skill.details, 'circle')}
                >
                <img className="" src="./images/stateOfWird\circle.svg" width="25px" alt="circle" />
                </button>
                <button 
                className={`skills__state-item skills__state-notDone ${activeButtons[skill.details] === 'notDone' ? 'not-done-clicked' : ''}`}
                    onClick={() => handleSkillButtonClick(skill.details, 'notDone')}
                >
                <img className="" src="./images/stateOfWird\not-done.svg" width="25px" alt="not done" />
                </button>
                </div>
                

            </li>
    ));


    return (
        <>
 


             {/* Start Day Picker (calender) */}
             {(showSkills || showAddSkill) && <ProgressLine progress={((counters.done + counters.circle)/skillsArray.length)*100}/>}
             {/* End Day Picker (calender) */}

             {/* Start Day Picker (calender) */}
                    {showSkills && <br/>}
             {/* {showSkills && <ButtonWithCalendar/>} */}
             {/* End Day Picker (calender) */}

             {/* Start Skills */}
            {showSkills  && <section  id="skills" className={`skills section  ${isVisibleSkills ? 'visible' : ''}`}>
                <h2 className="h2__heading">
                    أورادك:
                    &nbsp;   
                    <img className="contact__social" src="./images/star-svgrepo-com.svg" alt="pray" width="25px" />
                    {skillsArray.length}
                    <img className="contact__social" src="./images/star-svgrepo-com.svg" alt="pray" width="25px" />
                    <br/>
                    

            {/* Button to toggle options */}
            <button className="bio__links h2__heading" onClick={() => setShowOptions(!showOptions)}>تنزيل الجدول <span className="bio__arrow">🔻</span></button>
            {/* Render options outside the page */}
            {showOptions && (
                <div className="skills__downloads">
                {/* CSV download option */}
                <CSVLink data={skillsArray} filename={"skills.csv"} className="bio__links" onClick={() => setShowOptions(false)}>
                <button className="bio__links">CSV</button>
                    </CSVLink>
                {/* Excel download option */}
                <span onClick={() => {handleExcelDownload(); setShowOptions(false);}}>
                    <button className="bio__links">Excel</button>
                    </span>
                </div>
            )}
                </h2>
            
            {/* Start Counters */}

            <div dir='ltr' className="skills__state"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                paddingBottom: "2rem",
                }}>
                    <div
                        className='skills__state-item done-clicked'
                        >                    
                    <img className="" src="./images/stateOfWird\done.svg" width="25px" alt="done" />
                    </div>
                    : {counters.done}
                    <div  
                    className='skills__state-item circle-clicked'
                    >
                    <img className="" src="./images/stateOfWird\circle.svg" width="25px" alt="circle" />
                    </div>: {counters.circle}
                    <div 
                    className='skills__state-item not-done-clicked'
                    >
                    <img className="" src="./images/stateOfWird\not-done.svg" width="25px" alt="not done" />
                    </div>: {counters.notDone}
            </div>
             {/* End Counters */}


                <div className="skills__filters">
                    <button className={`skills__button ${filterType === 'all' ? 'skills__button--isActive' : ''}`} onClick={() => handleFilterButtonClick('all')}>الكل</button>
                    <button className={`skills__button ${filterType === 'الصلاة' ? 'skills__button--isActive' : ''}`} onClick={() => handleFilterButtonClick('الصلاة')}>الصلاة</button>
                    <button className={`skills__button ${filterType === 'القرآن' ? 'skills__button--isActive' : ''}`} onClick={() => handleFilterButtonClick('القرآن')}>القرآن</button>
                    <button className={`skills__button ${filterType === 'الذكر' ? 'skills__button--isActive' : ''}`} onClick={() => handleFilterButtonClick('الذكر')}>الذكر</button>
                    <button className={`skills__button ${filterType === 'الدعاء' ? 'skills__button--isActive' : ''}`} onClick={() => handleFilterButtonClick('الدعاء')}>الدعاء</button>
                    <button className={`skills__button ${filterType === 'الصيام' ? 'skills__button--isActive' : ''}`} onClick={() => handleFilterButtonClick('الصيام')}>الصيام</button>
                    <button className={`skills__button ${filterType === 'غيره' ? 'skills__button--isActive' : ''}`} onClick={() => handleFilterButtonClick('غيره')}>غيره</button>
                </div>

                <ul className= {`skills__list ${filterType}`}>
                    {skillItems}
                </ul>
                        <div className="card__separator">
                            <button   className="card__button" onClick={() => { addSkillFunction();}}>
                                <a href="#add_skill">
                                أضف وردًا
                                </a>
                                </button>
                        </div>
            </section>}
            {/* End Skills */}

            {/* Start Add Skill */}
                {showAddSkill && <section  id="add_skill" className={`add-skill  ${isVisibleAddSkill ? 'visible' : ''}`}>
                    <h2 id="add__skill"className="h2__heading">
                        أضف وردًا
                        &nbsp;
                        <img className="contact__social" src="./images/pray.png" alt="pray" width="25px" />
                    </h2>
                    <div className="card">
                        <form id="age-form" className="card__form">
                            <div className="card__inputContainer">
                                <label htmlFor="day" className="card__label">الورد</label>
                                <input
                                    id="day"
                                    name="day"
                                    type="text"
                                    className={`card__input ${nameError ? 'card__input--error' : ''}`}
                                    placeholder="القرآن"
                                    value={nameInput}
                                    onChange={(e) => setNameInput(e.target.value)}
                                />
                                {nameError && <span className="card__errorMessage">رجاء اكتب اسم الورد</span>}
                            </div>
                            <div className="card__inputContainer">
                                <label htmlFor="month" className="card__label">تفاصيل الورد</label>
                                <input
                                    id="month"
                                    name="month"
                                    type="text"
                                    className={`card__input ${detailsError ? 'card__input--error' : ''}`}
                                    placeholder="قراءة حزب من كتاب الله"
                                    value={detailsInput}
                                    onChange={(e) => setDetailsInput(e.target.value)}
                                    />
                                {detailsError && <span className="card__errorMessage">رجاء كتابة تفاصيل الورد</span>}
                            </div>
                            <div className="card__inputContainer">
                                <label htmlFor="year" className="card__label">النوع</label>
                                <select
                                    id="year"
                                    name="year"
                                    className={`input__type card__input ${typeError ? 'card__input--error' : ''}`}
                                    value={typeInput}
                                    onChange={(e) => setTypeInput(e.target.value)}
                                    >
                                    <option value="">اختر نوع الورد</option>
                                    <option value="الصلاة">الصلاة</option>
                                    <option value="القرآن">القرآن</option>
                                    <option value="الذكر">الذكر</option>
                                    <option value="الدعاء">الدعاء</option>
                                    <option value="الصيام">الصيام</option>
                                    <option value="غيره">غيره</option>
                                </select>
                                {typeError && <span className="card__errorMessage">رجاء كتابة نوع الورد</span>}
                            </div>
                        </form>
                        <div className="card__separator">
                            <button className="card__button" onClick={handleAddSkill}>إضافة</button>
                        </div>
                            <button   className="bio__links h2__heading" onClick={() => { skillsFunction();}}>
                                <a href="#add_skill">
                                العودة للأوراد
                                </a>
                                </button>
                    </div>
                </section>}
            {/* End Add Skill */}

            {deletionAlert}
            {confirmDialogOpen &&
                <div className="confirm-dialog">
                    <p>هل أنت متأكد من حذف <br/> {itemToDelete}؟</p>
                    <button onClick={confirmDeletion}>نعم</button>
                    <button className="cancel" onClick={cancelDeletion}>إلغاء</button>
                </div>
            }
            {/* Success Alert */}
            {successAlert}
            {/* Deletion Alert */}
            {deletionAlert}
            {/* NotDone Alert */}
            {notDoneAlert}
            {/* Circle Alert */}
            {circleAlert}
        </>

    );
};

export default SkillsSection;
