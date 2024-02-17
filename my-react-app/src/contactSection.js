import React, { useState } from 'react';
const ContactSection = () => {
      const [successAlert, setSuccessAlert] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Set success alert
        setSuccessAlert(<div className="alert alert-success"><h1>شكرا!</h1><p>تم إرسال الاقتراح بنجاح.</p></div>);
        setTimeout(() => {
            setSuccessAlert(null);
        }, 3000); // Remove the alert after 3 seconds

        // Here you can submit the form data to your backend or perform any other necessary actions
        // For example, you can use Fetch API to send the form data to a server
        // fetch('/submit-form', {
        //     method: 'POST',
        //     body: new FormData(event.target)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log('Form submitted successfully', data);
        // })
        // .catch(error => {
        //     console.error('Error submitting form', error);
        // });
    };

    return (
        <section id="contact" className="contact section">
            <h3 className="h3__heading">أضف اقتراحًا!</h3>
            <form onSubmit={handleSubmit} name="contact-form">
                <div className="contact__inputs">
                    <input className="contact__input" type="text" name="fullName" placeholder="الاسم" required />
                    <input className="contact__input" type="tel" name="telephone" placeholder="رقم الهاتف" />
                </div>
                <input className="contact__input" type="email" name="email" placeholder="الإيميل" required />
                <textarea className="contact__input contact__textarea" name="description" id="description" rows="1" placeholder="اقتراحك هنا ..." required></textarea>
                <input className="contact__button" type="submit" value="إرسال" />
            </form>
            {successAlert}
        </section>
    );
};

export default ContactSection;