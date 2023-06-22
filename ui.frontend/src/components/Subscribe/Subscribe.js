import React, { Component } from 'react';
import { MapTo } from '@adobe/aem-react-editable-components';
require('./Subscribe.css');

const Subscribe = ({ title, label, authorization }) => {
    if (!title || !label || !authorization) {
        return null;
    }

    const handleFormSubmit = async (event) => {
    event.preventDefault();
        try {
            const form = event.target;
            const formData = new FormData(form);
            await submitForm(formData);
        } catch (error) {}
    };

    const submitForm = async (formData) => {
    console.log('>>>>>>>>>>Form submitted<<<<<<<<<');
        try {
            await fetch('/bin/newsletter/subscribe', {
                method: 'POST',
                body: formData,
        });
        } catch (error) {}
    };

    return (
        <div>
            <Title title={title} />
            <Form onSubmit={handleFormSubmit} label={label} authorization={authorization} />
        </div>
    );
};

const Title = ({ title }) => {
    return <h3 className="cmp-title">{title}</h3>;
};

const Form = ({ onSubmit, label, authorization, handleFormSubmit }) => {
    return (
        <div className="cmp-form">
            <form className="cmp-form__" onSubmit={onSubmit} action={handleFormSubmit}>
                <FormGroup label="First name *" id="form_name" name="name" placeholder="Please enter your firstname *" required />
                <FormGroup label="Last name *" id="form_lastname" name="surname" placeholder="Please enter your lastname *" required />
                <FormGroup label="Email *" id="form_email" name="email" placeholder="Please enter your email *" required type="email" />
                <FormGroupSelect
                    label="Please specify your month of birthday *"
                    id="form_anniversary_month"
                    name="anniversary_month"
                    required>
                    <option value="none" selected disabled>--Select--</option>
                    <option value="january">January</option>
                    <option value="february">February</option>
                    <option value="march">March</option>
                    <option value="april">April</option>
                    <option value="may">May</option>
                    <option value="june">June</option>
                    <option value="july">July</option>
                    <option value="August">August</option>
                    <option value="september">September</option>
                    <option value="october">October</option>
                    <option value="november">November</option>
                    <option value="december">December</option>
                </FormGroupSelect>
                <div className="cmp-checkbox">
                    <input type="checkbox" id="checkbox" name="authorize" required />
                    <p dangerouslySetInnerHTML={{ __html: authorization }} />
                </div>
                <div>
                    <input type="submit" value={label} className="btn" />
                </div>
            </form>
        </div>
    );
};

const FormGroup = ({ label, id, name, placeholder, required, type }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type || 'text'} name={name} className="form-control" placeholder={placeholder} required={required} />
    </div>
  );
};

const FormGroupSelect = ({ label, id, name, required, children }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <select id={id} name={name} className="form-control-select" required={required}>
        {children}
      </select>
    </div>
  );
};

export default Subscribe;

MapTo('aem-training-03/components/subscribe-form')(Subscribe, Form, FormGroup, FormGroupSelect);
