import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import ButtonWithCalendar from "./components/button.js"
import ProgressLine from "./components/progress.js";
import addSkill from "./components/addSkill.js";

const SkillsSection = () => {
    const [skillsArray, setSkillsArray] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [nameInput, setNameInput] = useState('');
    const [detailsInput, setDetailsInput] = useState('');
    const [typeInput, setTypeInput] = useState('');
    const [nameError, setNameError] = useState(false);
    const [detailsError, setDetailsError] = useState(false);
    const [typeError, setTypeError] = useState(false);
    const [filterType, setFilterType] = useState('all');
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
            {
            name: "القيام",
            details: "ركعة الوتر",
            type: "الصلاة",
        },
            {
            name: "الضحى",
            details: "ركعتي الضحى قبل الذهاب للكلية",
            type: "الصلاة",
        },
            {
            name: "الحوقلة",
            details: "لا حول ولا قوة إلا بالله مئة مرة",
            type: "الذكر",
        },
            {
            name: "أذكار الصباح",
            details: "أذكار الصباح بعد الفجر",
            type: "الذكر",
        },
            {
            name: "أذكار المساء",
            details: "أذكار المساء بعد العصر",
            type: "الذكر",
        },
            {
            name: "حفظ القرآن",
            details: "حفظ نصف صفحة يوميا بعد الفجر",
            type: "القرآن",
        },
            {
            name: "ورد القرآن",
            details: "قراءة عشر صفحات من كتاب الله",
            type: "القرآن",
        },
        {
            name: "الكلية",
            details: "مذاكرة 5 ساعات للكلية",
            type: "التعلم",
        },
        {
            name: "القراءة",
            details: "قراءة عشر صفحات من كتاب لأنك الله",
            type: "التعلم",
        },
        {
            name: "الرياضة",
            details: "تمرين عشر دقائق في المنزل صباحًا",
            type: "غيره",
        },
        ]);
        // Initialize skills array with a new date property for each item
        setSkillsArray(prevSkillsArray => prevSkillsArray.map(skill => ({
            ...skill,
        state:'',
        })));

    }, []);

// Function to handle Excel download
    const handleExcelDownload = () => {
        const worksheet = XLSX.utils.json_to_sheet(skillsArray);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Skills");
        XLSX.writeFile(workbook, "skills.xlsx");
    };


    const handleSkillDeletion = (itemDetails) => {
        // Remove skill from the array
        setSkillsArray(prevSkills => prevSkills.filter(skill => skill.details !== itemDetails));

        // Decrement the counters for the deleted skill if its buttons were active
        setCounters(prevCounters => ({
            done: activeButtons[itemDetails] === 'done' ? prevCounters.done - 1 : prevCounters.done,
            notDone: activeButtons[itemDetails] === 'notDone' ? prevCounters.notDone - 1 : prevCounters.notDone,
            circle: activeButtons[itemDetails] === 'circle' ? prevCounters.circle - 1 : prevCounters.circle
        }));

        // Remove active state for the deleted skill
        setActiveButtons(prevState => {
            const updatedState = { ...prevState };
            delete updatedState[itemDetails];
            return updatedState;
        });

        // Show deletion alert
        setDeletionAlert(<div className="alert alert-deletion">{`تم حذف ورد`}<br />{itemDetails}</div>);
        setTimeout(() => {
            setDeletionAlert(null);
        }, 3000); // Remove the alert after 3 seconds
    }

    const handleAddSkill = () => {
        addSkill(nameInput, detailsInput, typeInput, setSkillsArray, setNameError, setDetailsError, setTypeError, setSuccessAlert);
    };

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
             <ProgressLine progress={((counters.done + counters.circle)/skillsArray.length)*100}/>
             {/* End Day Picker (calender) */}

             {/* Start Day Picker (calender) */}
                    <br/>
                   {/* <h1 className="bio__heading">اختر يوما 
                   </h1> */}
             <ButtonWithCalendar/>
             {/* End Day Picker (calender) */}

             {/* Start Skills */}
            <section id="skills" className="skills section ">
                <h2 className="h2__heading">
                    أورادك
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
                    <br/>
                    &nbsp;   
                    <img className="contact__social" src="./images/star-svgrepo-com.svg" alt="pray" width="25px" />
                    {skillsArray.length}
                    <img className="contact__social" src="./images/star-svgrepo-com.svg" alt="pray" width="25px" />
                    &nbsp;
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
                    <button className={`skills__button ${filterType === 'التعلم' ? 'skills__button--isActive' : ''}`} onClick={() => handleFilterButtonClick('التعلم')}>التعلم</button>
                    <button className={`skills__button ${filterType === 'غيره' ? 'skills__button--isActive' : ''}`} onClick={() => handleFilterButtonClick('غيره')}>غيره</button>
                </div>

                <ul className={`skills__list ${filterType}`}>
                    {skillItems}
                </ul>

            </section>
            {/* End Skills */}

            {/* Start Add Skill */}
            <section id="add_skill" className="add-skill skills section section--with-bg">
                <h2 className="h2__heading">
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
                                <option value="التعلم">التعلم</option>
                                <option value="غيره">غيره</option>
                            </select>
                            {typeError && <span className="card__errorMessage">رجاء كتابة نوع الورد</span>}
                        </div>
                    </form>
                    <div className="card__separator">
                        <button className="card__button" onClick={handleAddSkill}>إضافة</button>
                    </div>
                </div>
            </section>
            {/* End Add Skill */}

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